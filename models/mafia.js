const mongoose = require('mongoose');

const mafiaSchema = {
    name: { type: String, required: true, unique: true },
    type: {
        type: String,
        enum: ['russia', 'china', 'yakuza', 'mexico', 'street', 'colombia'],
        required: true
    },
    donId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    advisorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    respect: { type: Number, default: 0 },
    hqId: { type: mongoose.Schema.Types.ObjectId, ref: 'HQ' },
    controlledAreas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Area' }],
    antiSpyActive: { type: Boolean, default: false },
    antiSpyExpires: Date,
    createdAt: { type: Date, default: Date.now }
}

module.exports = mongoose.model('Mafia', mafiaSchema);