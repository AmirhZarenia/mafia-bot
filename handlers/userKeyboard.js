const userKeyboard = {
    reply_markup: {
        keyboard: [
            ['📊 پنل شخصی', '🔄 انتقال منابع'],
            ['🎁 اهدا به انبار', '✅ تایید دعوت'],
            ['🎯 Ready for War', '📈 ارتقای لول']
        ],
        resize_keyboard: true
    }
};

const transferKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '💰 پول', callback_data: 'transfer_money' }],
            [{ text: '🔫 تفنگ', callback_data: 'transfer_guns' }],
            [{ text: '💊 مواد', callback_data: 'transfer_drugs' }]
        ]
    }
};

module.exports = {
    userKeyboard,
    transferKeyboard
};