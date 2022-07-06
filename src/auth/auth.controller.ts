import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GetUserId } from './decorator/get-user-id.decorator';
import { Public } from './decorator/public.decorator';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: AuthDto })
  async login(@Body() dto: AuthDto) {
    return await this.authService.login(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetUserId() userId: number) {
    return this.authService.logout(userId);
  }
}
/* 
"email": "ecommerce@mtech.com",
"password": "123456@Aa"

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZWNvbW1lcmNlQG10ZWNoLmNvbSIsImlhdCI6MTY1NzA4NjU4MCwiZXhwIjoxNjU3MDkwMTgwfQ.SsJiB7Q1GjO3S7wz6vooOZW-8iGLRxk_Jb1HdDsvc1Q
*/
