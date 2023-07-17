const mongoose = require('mongoose');
const testHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  testDate: { type: Date, default: Date.now },
  score: { type: Number, required: true },
  plagiarism: [{ type: String, required: true }],
});

const History = mongoose.model('History', testHistorySchema);
module.exports = {History}
