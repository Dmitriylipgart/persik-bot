import { Markup } from 'telegraf';

export const COMMANDS = {
  START_ANON: 'startanon',
  STOP_ANON: 'stopanon',
  DEANON: 'deanon',
  ANON: 'anon',
  GO_TO_ANON: 'gotoanon',
};

export const BUTTONS = {
  GO_TO_ANON: Markup.button.callback('Аноним', COMMANDS.GO_TO_ANON),
  START_ANON: Markup.button.callback('Начать Аноним', COMMANDS.START_ANON),
  STOP_ANON: Markup.button.callback('Закончить Аноним', COMMANDS.STOP_ANON),
  DEANON: Markup.button.callback('Начать Анононим-Неаноним', COMMANDS.DEANON),
};
