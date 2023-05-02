const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
  uid: { type: Number, required: true },
  name: { type: String, required: true },
  tagline: { type: String, required: true },
  schedule: { type: Date, required: true },
  description: { type: String, required: true },
  files: { 
    type: String 
  },
  moderator: { type: String, required: true },
  category: { type: String, required: true },
  sub_category: { type: String, required: true },
  rigor_rank: { type: Number, required: true },
  attendees: [{ type: String, required: true }]
});

const event = mongoose.model('event', eventSchema);

module.exports = event;
