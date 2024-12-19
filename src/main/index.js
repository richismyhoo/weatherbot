import { Telegraf } from "telegraf";
import { getWeather } from "./api.js";
// ИМПОРТЫ ДЛЯ РАБОТЫ С БИБЛИОТЕКОЙ И АПИ ЗАПРОС

const bot = new Telegraf("7541149030:AAHS3azcD1dn3kFxwqPSXtQJV1bMSOTHrx8"); // СОЗДАНИЕ ОБЪЕКТА БОТА С ТОКЕНОМ

bot.start((ctx) => ctx.reply("Отправьте город для получения прогноза погоды")); // РЕАКЦИЯ НА СТАРТОВОЕ СООБЩЕНИЕ /start С ЗАПРОСОМ ЮЗЕРА НА ОТПРАВКУ ГОРОДА

bot.on("message", (ctx) => {
  // НАЧАЛО БЛОКА РЕАКЦИИ НА ОТПРАВКУ ГОРОДА
  const fetchData = async () => {
    // ФУНКЦИЯ ПОЛУЧЕНИЯ ДАННЫХ С АПИ OPENWEATHER
    try {
      const data = await getWeather(ctx.message.text); // ЗАПИСЬ ПОЛУЧЕННОГО ОТВЕТА В КОНСТАНТУ И ОСТАНОВКА ИНТЕРПРЕТАТОРА ДО МОМЕНТА ЗАПИСИ ОТВЕТА
      console.log(data); // ЛОГИРОВАНИЕ ОТВЕТА ДЛЯ ДЕБАГА
      ctx.reply(
        // ФУНКЦИЯ ОТВЕТА БОТА ЮЗЕРУ С ИСПОЛЬЗОВАНИЕМ ОТВЕТА СЕРВЕРА
        `Прогноз погоды в городе ${
          data.name
        }: \n Температура: ${data.main.temp.toFixed()}℃ \n Ощущается как: ${data.main.feels_like.toFixed()}℃ \n Влажность: ${
          // ИСПОЛЬЗОВАНИЕ .toFixed ДЛЯ ПОЛУЧЕНИЯ ЦЕЛОГО ЧИСЛА
          data.main.humidity
        }% \n Описание погоды: ${
          data.weather[0].description
        } \n Атмосферное давление: ${data.main.pressure} мм. рт. ст.`
      );
    } catch (e) {
      // БЛОК ОБРАБОТКИ ОШИБКИ, ТАКЖЕ УКАЗЫВАЕТ ЮЗЕРУ ЕСЛИ ОШИБКА СЛУЧИЛАСЬ ИЗ-ЗА НЕВЕРНО ВВЕДЕННОГО ГОРОДА
      console.error(e.message);
      ctx.reply("Ошибка \nУкажите верное название города");
    }
  };
  fetchData();
});

bot.launch(); // ЗАПУСК БОТА

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
