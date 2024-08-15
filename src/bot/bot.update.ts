import { Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Context } from './model/interfaces/context.interface';
import { SceneList } from './shared/consts';

@Update()
export class BotUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.scene.enter(SceneList.Start);
  }
}
