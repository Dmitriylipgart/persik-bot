import { SceneList, UserRole } from '../shared/consts';
import {
  Action,
  Command,
  Ctx,
  InjectBot,
  Scene,
  SceneEnter,
} from 'nestjs-telegraf';
import { BotService } from '../bot.service';
import { Context } from '../model/interfaces/context.interface';
import { Markup, Telegraf } from 'telegraf';
import { getMainCommands } from '../shared/utils';
import { BUTTONS, COMMANDS } from '../bot.buttons';

@Scene(SceneList.Start)
export class StartScene {
  constructor(
    private readonly botService: BotService,
    @InjectBot()
    private readonly bot: Telegraf<Context>,
  ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    await this.bot.telegram.setMyCommands(getMainCommands());
    await ctx.replyWithHTML(
      'Выбери:',
      Markup.inlineKeyboard([BUTTONS.GO_TO_ANON]),
    );
  }

  @Command(COMMANDS.ANON)
  async onAnonStarted(@Ctx() ctx: Context) {
    await ctx.scene.enter(SceneList.Anon);
  }
  @Action(COMMANDS.GO_TO_ANON)
  async onAnonStartedAction(@Ctx() ctx: Context) {
    await ctx.scene.enter(SceneList.Anon);
  }
}
