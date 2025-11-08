import type { User } from '../entity/user'

export default abstract class UserRepository {
  abstract findUser(): Promise<User>
  abstract saveUser(user: User): void
  abstract getLocalUser(): User | null
}
