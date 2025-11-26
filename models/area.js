const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
    name: String,
    type: { type: String, enum: ['suburb', 'industrial', 'downtown', 'wallstreet', 'port', 'citycenter'] },
    controllingMafia: { type: mongoose.Schema.Types.ObjectId, ref: 'Mafia' },
    // ... other fields
});

module.exports = mongoose.model('Area', areaSchema);