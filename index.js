require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });

const start = () => {

    bot.setMyCommands( [
        {
            command: '/info',
            description: 'Выведит информацию о боте'
        },
        {
            command: '/schedule',
            description: 'Покажет вам расписание'
        },
        {
            command: '/pin',
            description: 'Закрепить сообщение (Недоступны)'
        }
    ]);

    bot.on('message', async msg => {

        const text = msg.text;
        const chatId = msg.chat.id;
        const nameUs = msg.from.first_name;
        const mesId = msg.message_id;
        const mesIdRepley = msg.reply_to_message?.message_id;

        const schedule = 'http://dkrkm.org.ua/lesson-schedule#breadcrumbs';
        const version = '1.0';

        console.log(msg);

        if (text === '/info') {
            await bot.sendMessage(chatId, `Бот который будет помогать вам в закреплении сообщений и реакции ` +
                `на них. Юридическая информация - версия ${version}. Автор: Honcharenko Danil.`);
        }

        if (text === '/schedule') {
            await bot.sendMessage(chatId, `Вот ваше расписание ${nameUs} расположено по адресу ${schedule}.`);
        }

        if (text === '/pin') {
            await bot.pinChatMessage(chatId, mesIdRepley);
            await bot.sendMessage(chatId,'Сообщение было закреалено');
        }
    });
};

start();