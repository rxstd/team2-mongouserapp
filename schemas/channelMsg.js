const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { Schema } = mongoose;

const channelMsgSchema = new Schema({
  channel_id: {
    type: Number,
    required: true,
  },
  member_id: {
    type: Number,
    required: true,
  },
  nick_name: {
    type: String,
    required: false,
    maxlength: 100,
  },
  msg_type_code: {
    type: Number,
    required: true,
  },
  connection_id: {
    type: String,
    required: false,
    maxlength: 100,
  },
  message: {
    type: String,
    required: false,
    maxlength: 1000,
  },
  ip_address: {
    type: String,
    required: false,
    maxlength: 20,
  },
  top_channel_msg_id: {
    type: Number,
    required: false,
  },
  msg_state_code: {
    type: Number,
    required: true,
  },
  msg_date: {
    type: Date,
    default: Date.now,
  },
  edit_date: {
    type: Date,
    default: Date.now,
  },
  del_date: {
    type: Date,
    required: false,
  },
});

channelMsgSchema.plugin(AutoIncrement, { inc_field: "channel_msg_id" });

module.exports = mongoose.model("ChannelMsg", channelMsgSchema);
