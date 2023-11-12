import GoogleCalendarService from "./services/google-calendar";
import TelegramBotService from "./services/telegram-bot";
import NlpTrainUtil from "./utils/nlp-util";
import dotenv from 'dotenv'; 

dotenv.config();

const TOKEN = process.env.TOKEN ?? '';

const nlpUtil = new NlpTrainUtil();
nlpUtil.trainForIntents(true);

const calendarService = new GoogleCalendarService();
const telegramBot = new TelegramBotService(TOKEN, calendarService, nlpUtil);