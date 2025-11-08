import axios, { AxiosError } from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { httpErrorHandler } from '../errorHandling/httpErrorHandling'
import { useAuthStore } from '@/core/features/auth/data/datasource/authStoreDatasource'
import AuthRemoteDatasource from '@/core/features/auth/data/datasource/authRemoteDatasource'
import AuthRepositoryImpl from '@/core/features/auth/data/repository/authRepositoryImpl'
import LogoutUseCase from '@/core/features/auth/domain/use-cases/logoutUseCase'
import useContainer from '@/core/di/container'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api`
    : '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

let isRefreshing = false
let failedQueue: {
  resolve: (value?: any) => void
  reject: (err: any) => void
}[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)))
  failedQueue = []
}

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (r) => r,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }
    if (
      error.config?.url !== '/auth/refresh' &&
      error.config?.url !== '/auth/login' &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((token) => {
          if (!originalRequest.headers) originalRequest.headers = {}
          originalRequest.headers['Authorization'] = `Bearer ${token}`
          return api(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true
      try {
        const response = await api.post('/auth/refresh')
        const newToken = response.data.accessToken
        useAuthStore.getState().setAccessToken(newToken)
        processQueue(null, newToken)
        return api(originalRequest)
      } catch (err) {
        processQueue(err, null)
        useContainer().authModule.logoutUseCase.execute()
        return Promise.reject(err);
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(httpErrorHandler(error))
  },
)

export default api
