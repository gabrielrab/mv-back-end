import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const UserSchema = mongoose.Schema(
  {
    user: {
      type: String,
      require: true,
      unique: true
    },
    password: {
      type: String,
      require: true
    },
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true,
      unique: true
    },
    cnpj: {
      type: String,
      require: true,
      unique: true
    },
    phone: {
      type: String,
      require: true
    },
    address: {
      type: String,
      require: true
    },
    city: {
      type: String,
      require: true
    },
    uf: {
      type: String,
      require: true
    },
    type: {
      type: Number,
      require: true,
      default: "1"
    },
    is_active: {
      type: Boolean,
      require: true
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods = {
  compareHash(hash) {
    return bcrypt.compare(hash, this.password);
  },

  genereteToken() {
    return jwt.sign({ id: this.id }, "secret", {
      expiresIn: 604800
    });
  }
};

mongoose.model("UserSchema", UserSchema);
