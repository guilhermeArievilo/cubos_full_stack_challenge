export default class UserPermissionError extends Error {
  constructor() {
    super('The user does not have permission to perform this action.');
  }
}