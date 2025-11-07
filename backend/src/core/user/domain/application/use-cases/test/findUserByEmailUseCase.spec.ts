
import RequiredFieldError from "@/shared/exceptions/requiredFieldError";
import ResourceNotFoundError from "@/shared/exceptions/resourceNotFoundError";
import User from "../../../entity/user";
import UserRepository from "../../repository/userRepository";
import FindUserByEmailUseCase from "../findUserByEmailUseCase";

describe('FindUserByEmailUseCase', () => {
  let useCase: FindUserByEmailUseCase;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
    };

    useCase = new FindUserByEmailUseCase(userRepository);
  });

  it('should return a user when a valid email is provided', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    }, 'mocked-id');

    userRepository.findByEmail.mockResolvedValue(user);

    const result = await useCase.execute('john@example.com');

    expect(userRepository.findByEmail).toHaveBeenCalledWith('john@example.com');
    expect(result).toBe(user);
  });

  it('should throw RequiredFieldError if email is not provided', async () => {
    await expect(useCase.execute('')).rejects.toThrow(RequiredFieldError);
    expect(userRepository.findByEmail).not.toHaveBeenCalled();
  });

  it('should throw ResourceNotFoundError if user does not exist', async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    await expect(useCase.execute('non-existent-email@example.com')).rejects.toThrow(ResourceNotFoundError);
    expect(userRepository.findByEmail).toHaveBeenCalledWith('non-existent-email@example.com');
  });
});
