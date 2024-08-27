import { SceneList, UserRole } from '../shared/consts';
import {
  Action,
  Command,
  Ctx,
  InjectBot,
  Message,
  On,
  Scene,
  SceneEnter,
} from 'nestjs-telegraf';
import { BotService } from '../bot.service';
import { Context } from '../model/interfaces/context.interface';
import { Markup, Telegraf } from 'telegraf';
import { getAnonMenu } from '../shared/utils';
import { COMMANDS } from '../bot.buttons';

@Scene(SceneList.Anon)
export class AnonScene {
  constructor(
    private readonly botService: BotService,
    @InjectBot()
    private readonly bot: Telegraf<Context>,
  ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    const user = await this.botService.getUserAndSaveIfNotExist(ctx.from);
    console.log(user.telegramId);
    const isOwner = user.role === UserRole.Owner;
    const isAdmin = user.role === UserRole.Admin;
    const [anonStarted, deAnonStarted] = await this.botService.getAnonStatus();
    if (isOwner || isAdmin) {
      await ctx.replyWithHTML(
        'Что будем делать?',
        Markup.inlineKeyboard(getAnonMenu(anonStarted, isOwner), {
          columns: 1,
        }),
      );
      return;
    }

    if (anonStarted || deAnonStarted) {
      await ctx.replyWithHTML(
        [`👋 Привет ${ctx.from.first_name}!`, '', `Напиши мне сообщение`].join(
          '\n',
        ),
      );
    } else {
      await ctx.replyWithHTML(
        [`👋 Привет ${ctx.from.first_name}!`, ` 😔 Пока нет активностей`].join(
          '\n',
        ),
      );
    }
  }
  @Command(COMMANDS.ANON)
  async onAnonStarted(@Ctx() ctx: Context) {
    console.log('anon command anon');
    await ctx.scene.enter(SceneList.Anon);
  }
  @Action(COMMANDS.START_ANON)
  async onAnonStartedAction(@Ctx() ctx: Context) {
    const isOwnerOrAdmin = await this.botService.isOwnerOrAdmin(ctx.from);
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    if (isOwnerOrAdmin) {
      await this.botService.startAnon();
      await ctx.replyWithHTML(
        'Аноним начался',
        Markup.inlineKeyboard(getAnonMenu(true, true), {
          columns: 1,
        }),
      );
    }
  }

  @Action(COMMANDS.STOP_ANON)
  async onAnonStopAction(@Ctx() ctx: Context) {
    const [isOwner, isAdmin] = await this.botService.isOwnerOrAdmin(ctx.from);
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    if (isOwner || isAdmin) {
      await this.botService.stopAnon();
      await ctx.replyWithHTML(
        'Аноним начался',
        Markup.inlineKeyboard(getAnonMenu(false, isOwner), {
          columns: 1,
        }),
      );
    }
  }

  @On('text')
  async onText(@Message('text') msg: string, @Ctx() ctx: Context) {
    console.log(msg);
    if ('text' in ctx.message && msg !== '/start') {
      const [anonStarted, deAnonStarted] =
        await this.botService.getAnonStatus();
      const owner = await this.botService.getOwner();
      if (anonStarted) {
        const message = [`Сообщение из Аноним чата`, msg];
        deAnonStarted &&
          message.push(
            `Сообщение от ${ctx.from.first_name} ${ctx.from.username}`,
          );
        await this.botService.sendMessage(owner.telegramId, message.join('\n'));
      }
    }
  }
}
