const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const { Schema } = mongoose;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  board_type_code: {
    type: Number,
    required: true,
  },
  article_type_code: {
    type: Number,
    required: true,
  },
  contents: {
    type: String,
    required: false,
  },
  view_count: {
    type: Number,
    required: true,
  },
  is_display_code: {
    type: Number,
    required: true,
  },
  ip_address: {
    type: String,
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
  reg_member_id: {
    type: Number,
    required: false,
  },
  reg_date: {
    type: Date,
    default: Date.now,
  },
});

articleSchema.plugin(AutoIncrement, { inc_field: "article_id" }); //article_id는 1,2,3,4..

module.exports = mongoose.model("Article", articleSchema);
