import TelegramBot from "node-telegram-bot-api";
import GoogleCalendarService from "./google-calendar";
import NlpTrainUtil from "../utils/nlp-util";
import check_actual_word from "../utils/string-distance";
import { FAREWELLS, GREETINGS, SMALL_TALK } from "../constants";

export default class TelegramBotService {
  private _bot: TelegramBot;
  private _calendarService: GoogleCalendarService;
  private _nlp: NlpTrainUtil;

  constructor(token: string, calendarService: GoogleCalendarService, nlp: NlpTrainUtil) {
    this._bot = new TelegramBot(token, { polling: true });
    this._calendarService = calendarService;
    this._nlp = nlp;

    this.registerOnSchedule();
    this.registerOnMessage();

  }

  public registerOnSchedule() {
    this._bot.onText(/\/schedule (.+)/, (msg, match) => {
      // 'msg' is the received Message from Telegram
      // 'match' is the result of executing the regexp above on the text content
      // of the message

      const chatId = msg.chat.id;
      if (!match)
        return this._bot.sendMessage(
          chatId,
          "Please provide some details on the meeting you want to schedule!"
        );
      const resp = match[1]; // the captured "whatever"

      // send back the matched "whatever" to the chat
      this._bot.sendMessage(chatId, resp);
    });
  }

  public registerOnMessage() {
    this._bot.on("message", (msg) => {
      const chatId = msg.chat.id;
      const firstLetter = msg.text?.charAt(0);
      
      if(firstLetter === '/') {
        return;
      }

      if(!msg.text) return;
      
      const classification = this._nlp.classifier.getClassifications(msg.text)
      console.log('CLASSIFICATION RESULT', classification);
      console.log(this._nlp.classifier.classify(msg.text))
      if(classification[0].value <= 0.7) {
        if(classification[0].label === 'greeting' && check_actual_word(classification[0].label, msg.text)) {
            return this._bot.sendMessage(chatId, GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
        }
        else if(classification[0].label === 'goodbye' && check_actual_word(classification[0].label, msg.text)) {
            return this._bot.sendMessage(chatId, FAREWELLS[Math.floor(Math.random() * FAREWELLS.length)]);
        }
        else if(classification[0].label === 'smalltalk' && check_actual_word(classification[0].label, msg.text)) {
            return this._bot.sendMessage(chatId, SMALL_TALK[Math.floor(Math.random() * SMALL_TALK.length)]);
        }
      }

      // send a message to the chat acknowledging receipt of their message
      this._bot.sendMessage(chatId, "Sorry, did not understand that!");
    });
  }
}
