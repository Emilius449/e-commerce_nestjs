import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envConstants } from 'src/utils/constants';

type JwtPayload = {
  sub: string;
  email: string;
};
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envConstants.JWT_SECRET,
    });
  }
  async validate(payload: JwtPayload) {
    return payload;
  }
}
