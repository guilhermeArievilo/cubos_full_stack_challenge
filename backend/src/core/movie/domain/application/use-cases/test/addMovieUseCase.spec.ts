import AddMovieUseCase from '../addMovieUseCase';
import { MovieProps } from '../../../entities/movie';
import { MovieStatus } from '../../../entities/movieStatus';
import ResourceNotFoundError from '@/shared/exceptions/resourceNotFoundError';
import RequiredFieldError from '@/shared/exceptions/requiredFieldError';
import { ResourceAlreadyExistError } from '@/shared/exceptions/resourceAlreadyExistError';

describe('AddMovieUseCase', () => {
  let useCase: AddMovieUseCase;
  let movieRepository: any;
  let userRepository: any;

  beforeEach(() => {
    movieRepository = {
      findMovieByTitle: jest.fn(),
      findMovieByOriginalTitle: jest.fn(),
      addMovie: jest.fn(),
    };

    userRepository = {
      findById: jest.fn(),
    };

    useCase = new AddMovieUseCase(movieRepository, userRepository);
  });

  it('should add a movie successfully when data is valid and user exists', async () => {
    const fakeUser = { id: 'user-123' } as any;

    const data: MovieProps = {
      title: 'My Movie',
      originalTitle: 'My Movie Original',
      tagline: 'A great film',
      synopsis: 'Synopsis',
      genres: [],
      backdropPath: '/back.jpg',
      posterPath: '/poster.jpg',
      rating: 8,
      voteCount: 100,
      voteAverage: 8.0,
      duration: 120,
      status: MovieStatus.RELEASED,
      budget: 1000,
      revenue: 2000,
      originalLanguage: 'en',
      trailerLink: 'http://trailer',
      releaseDate: new Date(),
    };

    userRepository.findById.mockResolvedValue(fakeUser);
    movieRepository.findMovieByTitle.mockResolvedValue(null);
    movieRepository.findMovieByOriginalTitle.mockResolvedValue(null);

    await expect(useCase.execute(data, 'user-123')).resolves.toBeUndefined();

    expect(userRepository.findById).toHaveBeenCalledWith('user-123');
    expect(movieRepository.findMovieByTitle).toHaveBeenCalledWith(data.title);
    expect(movieRepository.findMovieByOriginalTitle).toHaveBeenCalledWith(data.originalTitle);
    expect(movieRepository.addMovie).toHaveBeenCalledWith(data, fakeUser);
  });

  it('should throw ResourceNotFoundError when user does not exist', async () => {
    userRepository.findById.mockResolvedValue(null);

    const data = { title: 't' } as any;

    await expect(useCase.execute(data, 'missing-user')).rejects.toThrow(ResourceNotFoundError);
  });

  it('should throw RequiredFieldError when a required field is undefined', async () => {
    const fakeUser = { id: 'user-123' } as any;

    // include a key with undefined value to trigger the RequiredFieldError check
    const data: any = {
      title: undefined,
      originalTitle: 'orig',
      tagline: 't',
      synopsis: 's',
      genres: [],
      backdropPath: 'b',
      posterPath: 'p',
      rating: 0,
      voteCount: 0,
      voteAverage: 0,
      duration: 0,
      status: MovieStatus.RELEASED,
      budget: 0,
      revenue: 0,
      originalLanguage: 'en',
      trailerLink: '',
      releaseDate: new Date(),
    };

    userRepository.findById.mockResolvedValue(fakeUser);

    await expect(useCase.execute(data, 'user-123')).rejects.toThrow(RequiredFieldError);
  });

  it('should throw ResourceAlreadyExistError when a movie with the same title exists', async () => {
    const fakeUser = { id: 'user-123' } as any;

    const data: MovieProps = {
      title: 'Existing',
      originalTitle: 'Existing Original',
      tagline: 'tag',
      synopsis: 'syn',
      genres: [],
      backdropPath: 'b',
      posterPath: 'p',
      rating: 1,
      voteCount: 0,
      voteAverage: 0,
      duration: 10,
      status: MovieStatus.RELEASED,
      budget: 0,
      revenue: 0,
      originalLanguage: 'en',
      trailerLink: '',
      releaseDate: new Date(),
    };

    userRepository.findById.mockResolvedValue(fakeUser);
    movieRepository.findMovieByTitle.mockResolvedValue({ id: 'm1' });
    movieRepository.findMovieByOriginalTitle.mockResolvedValue(null);

    await expect(useCase.execute(data, 'user-123')).rejects.toThrow(ResourceAlreadyExistError);
  });
});
