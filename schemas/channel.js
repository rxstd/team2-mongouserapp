const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { Schema } = mongoose;

const channelSchema = new Schema({
  community_id: {
    type: Number,
    required: true,
  },
  category_code: {
    type: Number,
    required: true,
  },
  channel_name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  user_limit: {
    type: Number,
    required: false,
  },
  channel_img_path: {
    type: String,
    required: false,
    maxlength: 200,
  },
  channel_desc: {
    type: String,
    required: false,
    maxlength: 1000,
  },
  channel_state_code: {
    type: Number,
    required: true,
  },
  reg_date: {
    type: Date,
    default: Date.now,
  },
  reg_member_id: {
    type: Number,
    required: false,
  },
  edit_date: {
    type: Date,
    default: Date.now,
  },
  edit_member_id: {
    type: Number,
    required: false,
  },
});

channelSchema.plugin(AutoIncrement, { inc_field: "channel_id" });

module.exports = mongoose.model("Channel", channelSchema);
