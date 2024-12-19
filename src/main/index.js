import { Telegraf } from "telegraf";
import { getWeather } from "./api.js";

const bot = new Telegraf("7541149030:AAHS3azcD1dn3kFxwqPSXtQJV1bMSOTHrx8");

bot.start((ctx) => ctx.reply("Отправьте город для получения прогноза погоды"));

bot.on("message", (ctx) => {
  const fetchData = async () => {
    try {
      const data = await getWeather(ctx.message.text);
      console.log(data);
      ctx.reply(
        `Прогноз погоды в городе ${
          data.name
        }: \n Температура: ${data.main.temp.toFixed()}℃ \n Ощущается как: ${data.main.feels_like.toFixed()}℃ \n Влажность: ${
          data.main.humidity
        }% \n Описание погоды: ${
          data.weather[0].description
        } \n Атмосферное давление: ${data.main.pressure} мм. рт. ст.`
      );
    } catch (e) {
      console.error(e.message);
      ctx.reply("Ошибка \nУкажите верное название города");
    }
  };
  fetchData();
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
