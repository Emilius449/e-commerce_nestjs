import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { envConstants } from 'src/utils/constants';
import { AuthDto } from './dto/auth.dto';

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}
  async login(dto: AuthDto) {
    // find the user by email
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // if user doesnot exist throw exception
    if (!user) {
      throw new ForbiddenException('Access denied, invalid email or password');
    }
    // Verify password
    const passwordMatches = await argon.verify(user.password, dto.password);
    // if password doesnot match throw exception

    if (!passwordMatches) {
      throw new ForbiddenException('Access denied, invalid email or password');
    }
    // Get token
    const tokens = await this.getToken(user.id, user.email);
    // Save refresh token
    /*     this.saveRefreshToken(user.id, tokens.refresh_token); */
    const { password, ...newUser } = user;
    // delete newUser.hashedRefreshToken;
    return { ...newUser, ...tokens };
  }

  async logout(userId: number) {
    const user = await this.prismaService.user.updateMany({
      // where: {
      //   id: userId,
      //   hashedRefreshToken: {
      //     not: null,
      //   },
      // },
      // data: {
      //   hashedRefreshToken: null,
      // },
      where: {
        id: userId,
        password: {
          not: '',
        },
      },
      data: {
        password: '',
      },
    });
  }

  /* async refreshToken(userId: number, refreshToken) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    // if user doesnot exist throw exception
    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    // Verify hashedRefreshToken
    const hashedRefreshTokenMatches = await argon.verify(
      user.hashedRefreshToken,
      refreshToken,
    );

    // if hashedRefreshToken doesnot match throw exception
    if (!hashedRefreshTokenMatches) {
      throw new ForbiddenException('Access denied');
    }

    // Get token
    const tokens = await this.getToken(user.id, user.email);

    // Save refresh token
    this.saveRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  } */

  async getToken(userId: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: envConstants.JWT_SECRET,
          expiresIn: '60m',
        },
      ),

      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: envConstants.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: '7 days',
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    } as Tokens;
  }
  /**
   * Hash refreshToken
   * @param refreshToken
   * @returns
   */
  async hashRefreshToken(refreshToken: string) {
    return await argon.hash(refreshToken);
  }
  /**
   * Save it in the database
   * @param userId
   * @param refreshToken
   */
  /*  async saveRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashRefreshToken(refreshToken);
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken,
      },
    });
  } */
}
