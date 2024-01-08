const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const { Schema } = mongoose;

const memberSchema = new Schema({
  email: {
    type: String,
    required: true,
    maxlength: 100,
  },
  member_password: {
    type: String,
    required: true,
    maxlength: 500,
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  profile_img_path: {
    type: String,
    required: false,
    maxlength: 300,
  },
  telephone: {
    type: String,
    required: false,
    maxlength: 20,
  },
  entry_type_code: {
    type: Number,
    required: true,
  },
  use_state_code: {
    type: Number,
    required: true,
  },
  birth_date: {
    type: String,
    required: false,
    maxlength: 6,
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

memberSchema.plugin(AutoIncrement, { inc_field: "member_id" });

module.exports = mongoose.model("Member", memberSchema);
