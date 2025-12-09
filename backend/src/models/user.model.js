import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: '' },
    refreshToken: { type: String, default: null }, // latest refresh token
  },
  { timestamps: true }
);

// Hash password automatically
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model('User', userSchema);
