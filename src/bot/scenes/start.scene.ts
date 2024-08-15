import { getCommands, SceneList, UserRole } from '../shared/consts';
import {
  Action,
  Ctx,
  InjectBot,
  Message,
  On,
  Scene,
  SceneEnter,
} from 'nestjs-telegraf';
import { BotService } from '../bot.service';
import { Context } from '../model/interfaces/context.interface';
import { BUTTONS, COMMANDS } from '../bot.buttons';
import { Telegraf } from 'telegraf';

@Scene(SceneList.Start)
export class StartScene {
  constructor(
    private readonly botService: BotService,
    @InjectBot()
    private readonly bot: Telegraf<Context>,
  ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    const user = await this.botService.getUserAndSaveIfNotExist(ctx.from);
    const isOwner = user.role === UserRole.Owner;
    const isAdmin = user.role === UserRole.Admin;
    const [anonStarted] = await this.botService.getAnonStatus();
    const commands = getCommands(anonStarted, isOwner);

    if (isOwner || isAdmin) {
      await this.bot.telegram.setMyCommands(commands);
      return;
    }

    await ctx.replyWithHTML(
      [`👋 Привет ${ctx.from.first_name}!`, '', `Напиши мне сообщение`].join(
        '\n',
      ),
    );
  }

  @On('text')
  async onText(@Message('text') msg: string, @Ctx() ctx: Context) {
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
    if (msg === '/start') {
      ctx.scene.enter(SceneList.Start);
    }
  }

  @Action(COMMANDS.START_ANON)
  async onAnonStarted(@Ctx() ctx: Context) {
    await this.botService.startAnon();
    // await ctx.reply('Anon started', Markup.removeKeyboard())
    // @ts-ignore
    await ctx.editMessageReplyMarkup();
    await ctx.scene.leave();
  }

  @Action(COMMANDS.DEANON)
  async onDeAnonStarted(@Ctx() ctx: Context) {
    await this.botService.startDeAnon();
    // @ts-ignore
    ctx.editMessageReplyMarkup(undefined);
    await ctx.scene.leave();
  }
  @Action(COMMANDS.STOP_ANON)
  async onAnonStop(@Ctx() ctx: Context) {
    await this.botService.stopAnon();
    // await ctx.reply('Anon stopped', Markup.removeKeyboard())
    // @ts-ignore
    await ctx.editMessageReplyMarkup();
    ctx.scene.leave();
  }
}
