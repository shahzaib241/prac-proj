import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Bookmark } from 'src/bookmarks/bookmarks.entity';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forFeature([User, Bookmark]),
    JwtModule.register({
      global: true,
      secret: "S3CRET",
      signOptions: { expiresIn: '1hr' },
  })],
  controllers: [AuthController],
  providers: [AuthService, UsersService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }]
})
export class AuthModule {}
