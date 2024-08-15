import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './model/entity/user.entity';
import {OwnerEntity} from "./model/entity/owner.entity";
import {AdminEntity} from "./model/entity/admin.entity";
import {StatusEntity} from "./model/entity/status.entity";
import {StartScene} from "./scenes/start.scene";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, OwnerEntity, AdminEntity, StatusEntity]),
  ],
  providers: [
    BotService,
    BotUpdate,
    StartScene,
  ],
})
export class BotModule {}
