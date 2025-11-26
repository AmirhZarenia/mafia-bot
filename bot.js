const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const config = require('./config');

// اتصال به دیتابیس
mongoose.connect(config.mongoURI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.log('❌ MongoDB connection error:', err));

// ایجاد ربات با تنظیمات polling
const bot = new TelegramBot(config.telegramToken, {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
});

// اضافه کردن هندلر خطا برای مدیریت بهتر
bot.on('polling_error', (error) => {
    console.log('Polling error:', error.code);
    // خطاهای کوچک را نادیده بگیر
    if (error.code === 'EFATAL') {
        console.log('Fatal polling error, restarting...');
        // می‌توانید اینجا منطق restart اضافه کنید
    }
});

bot.on('webhook_error', (error) => {
    console.log('Webhook error:', error);
});

// بقیه کدهای شما...
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '🤖 ربات فعال است!');
});

// برای Cloudflare Workers
export default {
    async fetch(request, env) {
        const TelegramBot = require('node-telegram-bot-api');

        // ایجاد ربات
        const bot = new TelegramBot(env.TELEGRAM_TOKEN);

        // پردازش وب‌هوک
        if (request.method === 'POST') {
            const update = await request.json();
            bot.processUpdate(update);
        }

        return new Response('Bot is running!');
    }
}
