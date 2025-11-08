import { describe, it, expect, vi } from 'vitest'
import type { User } from '../../entity/user'
import type UserRepository from '../../repository/userRepository'
import getLocalUserUseCase from '../getLocalUser'

describe('getLocalUserUseCase', () => {
  const mockUser: User = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  }

  const mockUserRepository: UserRepository = {
    findUser: vi.fn().mockResolvedValue(mockUser),
    saveUser: vi.fn(),
    getLocalUser: vi.fn().mockReturnValue(mockUser),
  }

  it('should return a local user', async () => {
    const useCase = new getLocalUserUseCase(mockUserRepository)
    const user = await useCase.execute()

    expect(user).toEqual(mockUser)
    expect(mockUserRepository.getLocalUser).toHaveBeenCalled()
  })

  it('should return null if there is no local user', async () => {
    vi.spyOn(mockUserRepository, 'getLocalUser').mockReturnValueOnce(null)
    const useCase = new getLocalUserUseCase(mockUserRepository)
    const user = await useCase.execute()

    expect(user).toBeNull()
    expect(mockUserRepository.getLocalUser).toHaveBeenCalled()
  })
})
