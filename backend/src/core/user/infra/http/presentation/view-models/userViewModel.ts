import User from "@/core/users/domain/entity/user";

export default class UserViewModel {
  static toHttp(data: User) {
    const { name, email } = data.toJSON();
    return {
      name,
      email
    }
  }
}