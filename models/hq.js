const mongoose = require('mongoose');

const hqSchema = {
    level: { type: Number, default: 1 },
    storage: {
        money: { type: Number, default: 0 },
        guns: { type: Number, default: 0 },
        drugs: { type: Number, default: 0 }
    },
    storageLevel: { type: Number, default: 1 },
    upgradeFinishTime: Date,
    storageUpgradeFinishTime: Date
}

module.exports = mongoose.model('HQ', hqSchema);