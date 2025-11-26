const Mafia = require('../models/mafia');
const User = require('../models/user');
const HQ = require('../models/hq');

module.exports = (bot) => {

    const showDonPanel = async (bot, chatId, user) => {
        const mafia = await Mafia.findById(user.mafiaId).populate('members');
        const hq = await HQ.findById(mafia.hqId);

        const donMessage = `
👑 پنل رئیس مافیا ${mafia.name}

👥 اعضا: ${mafia.members.length}/${mafia.hqLevel === 1 ? 10 :
                mafia.hqLevel === 2 ? 12 :
                    mafia.hqLevel === 3 ? 14 : 15
            }
🎯 رسپکت: ${mafia.respect}
🏢 سطح مقر: ${mafia.hqLevel}

💼 انبار:
💰 پول: ${hq.storage.money}
🔫 تفنگ: ${hq.storage.guns}
💊 مواد: ${hq.storage.drugs}
    `;

        const donKeyboard = {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '📋 لیست اعضا', callback_data: 'members_list' }],
                    [{ text: '📨 دعوت عضو', callback_data: 'invite_member' }],
                    [{ text: '🏢 ارتقای مقر', callback_data: 'upgrade_hq' }],
                    [{ text: '📦 ارتقای انبار', callback_data: 'upgrade_storage' }],
                    [{ text: '🎯 مناطق تحت کنترل', callback_data: 'controlled_areas' }],
                    [{ text: '🕵️ جاسوسی', callback_data: 'spy_options' }]
                ]
            }
        };

        bot.sendMessage(chatId, donMessage, donKeyboard);
    };

    const inviteMember = async (bot, msg, targetUserId) => {
        // کد دعوت عضو جدید
    };

    const upgradeHQ = async (bot, msg) => {
        // کد ارتقای مقر
    };

    return {
        showDonPanel,
        inviteMember,
        upgradeHQ
    };
};