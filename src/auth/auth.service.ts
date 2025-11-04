import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SellerService } from 'src/seller/seller.service';
import * as bcrypt from 'bcrypt';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientSerivice: ClientService,
    private readonly sellerService: SellerService,
    private readonly jwtService: JwtService,
  ) {}

  async validateSession(sessionId: string): Promise<any> {
    const user = await this.clientSerivice.findBySessionId(sessionId);
    if (!user) {
      throw new UnauthorizedException('user is not registered');
    }

    if (!user.isAdmin) {
      throw new UnauthorizedException('user is not authorized');
    }

    return user;
  }

  async login(email: string, password: string) {
    const seller = await this.validateUser(email, password);

    const payload = {
      sub: seller._id.toString(),
      username: seller.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      seller: {
        id: seller._id,
        name: seller.fullName,
        email: seller.email,
      },
    };
  }

  async validateUser(email: string, password: string) {
    const seller = await this.sellerService.findByEmail(email);
    if (!seller) {
      throw new UnauthorizedException('Email not found');
    }

    const isPasswordValid = await bcrypt.compare(password, seller.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return seller;
  }

  async validateUserFromJwt(userId: string) {
    const seller = await this.sellerService.findById(userId);
    if (!seller) {
      throw new UnauthorizedException('User not authorized');
    }
    return seller;
  }
}
