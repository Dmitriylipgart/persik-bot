import { Command, Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Context } from './model/interfaces/context.interface';
import { SceneList } from './shared/consts';
import { COMMANDS } from './bot.buttons';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly botService: BotService,
  ) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.scene.enter(SceneList.Start);
  }
  @Command(COMMANDS.ANON)
  async onAnonStarted(@Ctx() ctx: Context) {
    await ctx.scene.enter(SceneList.Anon);
  }
}
