import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { envs } from 'src/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaModule } from 'src/database/prisma.module';
import { ShoppingCartsModule } from '../shopping-carts/shopping-carts.module';

@Module({
  imports: [
    PrismaModule,

    forwardRef(() => ShoppingCartsModule),

    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    JwtModule.register({
      secret: envs.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule, JwtStrategy],
})
export class AuthModule {}
