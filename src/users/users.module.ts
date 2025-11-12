import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // pour InjectRepository(User)
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // (optionnel) utile si d'autres modules utilisent UsersService
})
export class UsersModule {}
