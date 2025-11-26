const mongoose = require('mongoose');

const userSchema = {
    telegramId: { type: Number, required: true, unique: true },
    username: String,
    firstName: String,
    lastName: String,
    level: { type: Number, default: 1 },
    guns: { type: Number, default: 0 },
    drugs: { type: Number, default: 0 },
    money: { type: Number, default: 100 },
    mafiaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mafia' },
    isDon: { type: Boolean, default: false },
    isAdvisor: { type: Boolean, default: false },
    isSpy: { type: Boolean, default: false },
    spyFor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mafia' },
    joinedAt: { type: Date, default: Date.now }
}

module.exports = mongoose.model('User', userSchema);