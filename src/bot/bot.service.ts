import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './model/entity/user.entity';
import { Repository } from 'typeorm';
import { Telegraf } from 'telegraf';
import { Context } from './model/interfaces/context.interface';
import { InjectBot } from 'nestjs-telegraf';
import { OwnerEntity } from './model/entity/owner.entity';
import { AdminEntity } from './model/entity/admin.entity';
import { StatusEntity } from './model/entity/status.entity';
import { User as TelegramUser } from '@telegraf/types';
import { UserRole } from './shared/consts';

@Injectable()
export class BotService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(OwnerEntity)
    private readonly ownerRepository: Repository<OwnerEntity>,

    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,

    @InjectRepository(StatusEntity)
    private readonly statusRepository: Repository<StatusEntity>,

    @InjectBot()
    private readonly bot: Telegraf<Context>,
  ) {}

  async getUser(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneBy({
      telegramId: id,
    });
  }

  async removeMarkup(chatId: number) {
    // await this.bot.telegram.editMessageReplyMarkup(chatId);
  }

  async getOwner(): Promise<UserEntity> {
    return await this.userRepository.findOneBy({
      role: UserRole.Owner,
    });
  }

  async getUserAndSaveIfNotExist(tgUser: TelegramUser): Promise<UserEntity> {
    const user = await this.getUser(tgUser.id);
    if (!user) {
      const userToSave = new UserEntity();
      userToSave.telegramId = tgUser.id;
      userToSave.name = tgUser.username;
      return await this.userRepository.save(userToSave);
    }
    return user;
  }

  async stopAnon() {
    const status = await this.statusRepository.find();
    status[0].anonStarted = false;
    status[0].deAnonStarted = false;
    await this.statusRepository.save(status);
  }

  async startAnon() {
    const status = await this.statusRepository.find();
    status[0].anonStarted = true;
    status[0].deAnonStarted = false;
    this.statusRepository.save(status);
  }

  async startDeAnon() {
    const status = await this.statusRepository.find();
    status[0].anonStarted = true;
    status[0].deAnonStarted = true;
    this.statusRepository.save(status);
  }

  async getAnonStatus(): Promise<[boolean, boolean]> {
    const status = await this.statusRepository.find();
    return [status[0].anonStarted, status[0].deAnonStarted];
  }

  sendMessage(userId: number, text: string) {
    this.bot.telegram.sendMessage(userId, text);
  }
}
