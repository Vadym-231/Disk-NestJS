import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class checkAuth implements NestMiddleware {
  constructor(private jwt : JwtService) {}
   async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    try {
      const isVerify = await this.jwt.verifyAsync(token);
      if(isVerify) next();
    }catch (e) {
      throw new UnauthorizedException('No auth!');
    }
  }
}

export function checkByRoles(roles: string[]) : NestMiddleware {

  @Injectable()
  class checkRoles implements NestMiddleware {
    constructor(private jwt : JwtService) {}
    async use(req: Request, res: Response, next: NextFunction) {
      const token = req.headers['authorization'];
      try {
        const isVerify = await this.jwt.verifyAsync(token)
        const { role } = isVerify;
        const isRights = roles.find(i => role === i);
        console.log(isVerify)
        if(isRights) next();
      }catch (e) {
        console.log(e)
        throw new UnauthorizedException('No auth!');
      }
    }
  }
  // @ts-ignore
  return checkRoles
}


