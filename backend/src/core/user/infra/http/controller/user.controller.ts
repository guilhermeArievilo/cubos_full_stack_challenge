import CreateUserUseCase from "@/core/users/domain/application/use-cases/createUserUseCase";
import FindUserByEmailUseCase from "@/core/users/domain/application/use-cases/findUserByEmailUseCase";
import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Req, UseGuards } from "@nestjs/common";
import UserViewModel from "../presentation/view-models/userViewModel";
import ResourceNotFoundError from "@/shared/exceptions/resourceNotFoundError";
import RequiredFieldError from "@/shared/exceptions/requiredFieldError";
import CreateUserBodyDTO from "../presentation/dto/CreateUserBodyDTO";
import { ResourceAlreadyExistError } from "@/shared/exceptions/resourceAlreadyExistError";
import { JwtAuthGuard } from "@/shared/infra/jwt/jwt-auth.guard";
import { JwtPayload } from "@/core/auth/domain/entities/payload";
import { type AuthenticatedRequest } from "@/shared/infra/jwt/jwt.strategy";

@Controller('user')
export class UserController {
  constructor(
    private findUserByEmailUseCase: FindUserByEmailUseCase,
    private createUserUseCase: CreateUserUseCase
  ) {}

  @Post('/register')
  async createUser(@Body() userData: CreateUserBodyDTO) {
    const { name, email, password } = userData;
    
    const user = await this.createUserUseCase.execute({
      name,
      email,
      password
    });

    return UserViewModel.toHttp(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getUserByEmail(@Req() req: AuthenticatedRequest) {
    const { email } = req.user as JwtPayload;
    const user = await this.findUserByEmailUseCase.execute(email);
    return UserViewModel.toHttp(user);
  }
}