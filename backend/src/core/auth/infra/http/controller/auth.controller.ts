import LoginUseCase from "@/core/auth/domain/application/use-cases/loginUseCase";
import LogoutUseCase from "@/core/auth/domain/application/use-cases/logoutUseCase";
import RefreshUseCase from "@/core/auth/domain/application/use-cases/refreshUseCase";
import { Body, Controller, HttpCode, Post, Req, Res } from "@nestjs/common";
import LoginHttpRequestDTO from "../presentation/dtos/loginHttpRequestDTO";
import type { Response, Request } from "express";

@Controller('auth')
export class AuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private refreshUseCase: RefreshUseCase,
    private logoutUseCase: LogoutUseCase
  ) {}

  @Post('/login')
  async login(@Body() loginData: LoginHttpRequestDTO, @Res() res: Response) {
    const { identifier, password } = loginData;

    const tokens = await this.loginUseCase.execute({
      identifier,
      password
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/auth'
    });

    return res.json({ accessToken: tokens.accessToken });
  }

  @HttpCode(200)
  @Post('/refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies.refreshToken;

    const tokens = await this.refreshUseCase.execute(refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/auth'
    });

    return res.json({ accessToken: tokens.accessToken });
  }

  @HttpCode(200)
  @Post('/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies.refreshToken;
    
    await this.logoutUseCase.execute(refreshToken);
    
    res.clearCookie('refreshToken', { path: '/auth' });

    return res.sendStatus(200);
  }
}