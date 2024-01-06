import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtDtoSchema } from './jwt.dto';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    if (!authorization) {
      return false;
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return false;
    }

    const payload = this.jwtService.verify(token);

    if (!payload) {
      return false;
    }

    const data = jwtDtoSchema.safeParse(payload);

    if (data.success === false) {
      return false;
    }

    request.user = data.data;

    return true;
  }
}
