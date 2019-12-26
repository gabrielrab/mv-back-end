import mongoose from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const OrderShema = mongoose.Schema({
  code: {
    type: Number,
    unique: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema",
    require: true
  },
  width: {
    type: Number,
    require: true
  },
  height: {
    type: Number,
    require: true
  },
  glass_type: {
    type: Number,
    require: true
  },
  glass_corner: {
    type: Number,
    require: true
  },
  glass_color: {
    type: Number,
    require: true
  },
  glass_format: {
    type: Number,
    require: true
  },
  note: {
    type: String,
    require: true
  },
  status: {
    type: Number,
    require: true
  },
  deliver: {
    type: Boolean,
    require: true
  }
});

OrderShema.plugin(AutoIncrement, { id: "code_seq", inc_field: "code" });
mongoose.model("OrderShema", OrderShema);
