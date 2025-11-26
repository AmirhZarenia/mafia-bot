const User = require('../models/user');
const Mafia = require('../models/mafia');
const { userKeyboard } = require('../handlers/userKeyboard');

module.exports = (bot) => {

    const registerUser = async (bot, msg) => {
        const chatId = msg.chat.id;
        const userData = msg.from;

        try {
            const newUser = new User({
                telegramId: userData.id,
                username: userData.username,
                firstName: userData.first_name,
                lastName: userData.last_name
            });

            await newUser.save();

            const welcomeMessage = `
🎭 به دنیای زیرزمینی مافیا خوش آمدید!

🆔 کد شناسایی شما: ${newUser._id}
💰 سرمایه اولیه: 100 دلار
🔫 تفنگ: 0
💊 مواد: 0
📊 لول: 1

برای شروع می‌توانید به یک مافیا ملحق شوید یا منتظر دعوت باشید.
      `;

            bot.sendMessage(chatId, welcomeMessage, userKeyboard);

        } catch (error) {
            bot.sendMessage(chatId, 'خطا در ثبت نام! لطفا دوباره تلاش کنید.');
        }
    };

    const showUserPanel = async (bot, chatId, user) => {
        const mafia = await Mafia.findById(user.mafiaId);

        const panelMessage = `
👤 پنل شخصی

🆔 کد شما: ${user._id}
📊 لول: ${user.level}
💰 پول: ${user.money} دلار
🔫 تفنگ: ${user.guns}
💊 مواد: ${user.drugs}

👥 مافیا: ${mafia ? mafia.name : 'بدون مافیا'}
👑 رئیس: ${mafia ? (await User.findById(mafia.donId)).firstName : '---'}
    `;

        bot.sendMessage(chatId, panelMessage, userKeyboard);
    };

    const transferResources = async (bot, msg, targetId, resourceType, amount) => {
        // کد انتقال منابع
    };

    const donateToHQ = async (bot, msg, resourceType, amount) => {
        // کد اهدا به انبار
    };

    return {
        registerUser,
        showUserPanel,
        transferResources,
        donateToHQ
    };
};