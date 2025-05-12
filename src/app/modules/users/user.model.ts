import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../index';

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: true,
      select: 0
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const saltRounds = Number(config.bcrypt_salt_rounds);
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();

  } catch (error: unknown) {
    if(error instanceof Error){

      next(error);
    } else {
      next(new Error('An unknown error occurred while hashing the password.'))
    }
  }
});

//check if user exist by email
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

// Compare Password Method
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string, hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
