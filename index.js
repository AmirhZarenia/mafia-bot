const { Telegraf, Markup, session, Scenes: { Stage, BaseScene, WizardScene } } = require('telegraf');
const mongoose = require('mongoose');

// Import models
const User = require('./models/user.model');
const Mafia = require('./models/mafia.model');
const HQ = require('./models/hq.model');
const Area = require('./models/area.model');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mafiaGame', { useNewUrlParser: true, useUnifiedTopology: true });

const bot = new Telegraf(process.env.BOT_TOKEN);

// Set up session and stage for scenes (if needed)
bot.use(session());
// We'll define scenes later if necessary

// Start command
bot.start(async (ctx) => {
    const telegramId = ctx.from.id;
    let user = await User.findOne({ telegramId });
    if (!user) {
        // Register the user
        user = new User({
            telegramId,
            username: ctx.from.username,
            firstName: ctx.from.first_name,
            lastName: ctx.from.last_name,
        });
        await user.save();
        // Send welcome message and personal panel
        return ctx.reply('Welcome! You are now registered. Your ID: ' + user._id, personalPanelKeyboard());
    } else {
        // Show personal panel
        return ctx.reply('Welcome back!', personalPanelKeyboard());
    }
});

// Personal panel keyboard
function personalPanelKeyboard() {
    return Markup.keyboard([
        ['Ready', 'Transfer'],
        ['Donate to HQ', 'Accept Invitation']
    ]).resize();
}

// ... other handlers

bot.launch();