import { describe, it, expect, vi } from 'vitest'
import type { User } from '../../entity/user'
import type UserRepository from '../../repository/userRepository'
import findUserUseCase from '../findUserUseCase'

const mockUser: User = {
  name: 'John Doe',
  email: 'john.doe@example.com',
}

const mockUserRepository: UserRepository = {
  findUser: vi.fn().mockResolvedValue(mockUser),
  saveUser: vi.fn(),
  getLocalUser: vi.fn().mockReturnValue(mockUser),
}

describe('findUserUseCase', () => {
  it('should find a user, save it locally and return it', async () => {
    const useCase = new findUserUseCase(mockUserRepository)
    const user = await useCase.execute()

    expect(user).toEqual(mockUser)
    expect(mockUserRepository.findUser).toHaveBeenCalled()
    expect(mockUserRepository.saveUser).toHaveBeenCalledWith(mockUser)
  })
})
