require('dotenv').config();

module.exports = {
    telegramToken: process.env.TELEGRAM_TOKEN || '1027881411:AAHsqhzx4UGJEY6qOSJydLopHQw66Sxw0xg',
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/mafia-game',
    adminIds: [123456789], // ایدی عددی ادمین‌ها
    port: process.env.PORT || 3000
};
