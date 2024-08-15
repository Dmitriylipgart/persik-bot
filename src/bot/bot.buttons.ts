import { Markup } from 'telegraf';

export const COMMANDS = {
  START_ANON: 'startanon',
  STOP_ANON: 'stopanon',
  DEANON: 'deanon',
};

export const BUTTONS = {
  START_ANON: Markup.button.callback('Начать Аноним', COMMANDS.START_ANON),
  STOP_ANON: Markup.button.callback('Закончить Аноним', COMMANDS.STOP_ANON),
  DEANON: Markup.button.callback('Начать Анононим-Неаноним', COMMANDS.DEANON),
};
