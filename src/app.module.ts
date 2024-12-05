import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/users.entity';
import { Bookmark } from './bookmarks/bookmarks.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, BookmarksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 's3cret', 
      database: 'postgres',
      entities: [User, Bookmark],
      synchronize: true,
    }),
    AuthModule
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
