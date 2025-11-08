export type LoginDTO = {
  identifier: string
  password: string
}

export type RegisterDTO = {
  name: string
  email: string
  password: string
}

export type TokenDto = {
  accessToken: string
}
