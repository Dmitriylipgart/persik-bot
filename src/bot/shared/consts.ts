import { COMMANDS } from '../bot.buttons';

export const BOT_NAME = 'persik-bot';

export enum SceneList {
  Start = 'start',
}

export enum UserRole {
  User,
  Admin,
  Owner,
}

export const getCommands = (
  isAnonStarted: boolean,
  isOwner: boolean,
): BotCommand[] => {
  const commands: BotCommand[] = [];
  if (isAnonStarted) {
    commands.push({ command: COMMANDS.STOP_ANON, description: 'Стоп Аноним' });
  } else {
    commands.push({
      command: COMMANDS.START_ANON,
      description: 'Начать Аноним',
    });
  }
  if (isOwner) {
    commands.push({
      command: COMMANDS.DEANON,
      description: 'Начать - Неаноним',
    });
  }
  return commands;
};
