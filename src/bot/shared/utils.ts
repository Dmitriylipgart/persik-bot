import { BotCommand } from './types';
import { BUTTONS, COMMANDS } from '../bot.buttons';
import { Telegraf } from 'telegraf';
import { Context } from '../model/interfaces/context.interface';

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
  if (isOwner && !isAnonStarted) {
    commands.push({
      command: COMMANDS.DEANON,
      description: 'Начать - Неаноним',
    });
  }
  return commands;
};

export const getMainCommands = () => {
  return [
    {
      command: COMMANDS.ANON,
      description: 'Аноним',
    },
  ];
};

export const setCommands = async (
  bot: Telegraf<Context>,
  anonStarted: boolean,
  isOwner: boolean,
) => {
  const commands = getCommands(anonStarted, isOwner);
  console.log(commands);
  await bot.telegram.setMyCommands(commands);
};

export const getAnonMenu = (isAnonStarted: boolean, isOwner: boolean) => {
  const buttons = [];
  if (isAnonStarted) {
    buttons.push(BUTTONS.STOP_ANON);
  } else {
    buttons.push(BUTTONS.START_ANON);
  }
  if (isOwner && !isAnonStarted) {
    buttons.push(BUTTONS.DEANON);
  }
  return buttons;
};
