
import { ResourceAlreadyExistError } from "@/shared/exceptions/resourceAlreadyExistError";
import User from "../../../entity/user";
import UserRepository, { CreateUserDTO } from "../../repository/userRepository";
import CreateUserUseCase from "../createUserUseCase";
import * as bcrypt from "bcrypt";

jest.mock('bcrypt');

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepository: jest.Mocked<UserRepository>;
  let bcryptHash: jest.Mock;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
    };
    bcryptHash = bcrypt.hash as jest.Mock;
    useCase = new CreateUserUseCase(userRepository);
  });

  it('should create a user when valid data is provided', async () => {
    const userData: CreateUserDTO = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    };

    const hashedPassword = 'hashedPassword';
    const user = new User({ ...userData, password: hashedPassword }, 'mocked-id');

    userRepository.findByEmail.mockResolvedValue(null);
    bcryptHash.mockResolvedValue(hashedPassword);
    userRepository.create.mockResolvedValue(user);

    const result = await useCase.execute(userData);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(bcryptHash).toHaveBeenCalledWith(userData.password, 10);
    expect(userRepository.create).toHaveBeenCalledWith({ ...userData, password: hashedPassword });
    expect(result).toBe(user);
  });

  it('should throw an error if name is not provided', async () => {
    const userData: CreateUserDTO = {
      name: '',
      email: 'john@example.com',
      password: 'password',
    };

    await expect(useCase.execute(userData)).rejects.toThrow('Name is required');
  });

  it('should throw an error if email is not provided', async () => {
    const userData: CreateUserDTO = {
      name: 'John Doe',
      email: '',
      password: 'password',
    };

    await expect(useCase.execute(userData)).rejects.toThrow('Email is required');
  });

  it('should throw an error if password is not provided', async () => {
    const userData: CreateUserDTO = {
      name: 'John Doe',
      email: 'john@example.com',
      password: '',
    };

    await expect(useCase.execute(userData)).rejects.toThrow('Password is required');
  });

  it('should throw ResourceAlreadyExistError if email already exists', async () => {
    const userData: CreateUserDTO = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    };

    const existingUser = new User(userData, 'existing-id');
    userRepository.findByEmail.mockResolvedValue(existingUser);

    await expect(useCase.execute(userData)).rejects.toThrow(ResourceAlreadyExistError);
  });
});
