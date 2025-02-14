import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../index';

const userSchema = new Schema<TUser>(
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

//hashing password and save into DB
// userSchema.pre('save', async function (next) {

//   //eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this;
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   );
// console.log('hashed password:', user.password)
//   next();
// });

// // set empty string after saving password
// userSchema.post('save', function (doc, next) {
//   if (doc.password) {
//   }
//   next();
// });

// Password hashing middleware
// **Hash password before saving**
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }

//   try {
//     const saltRounds = Number(config.bcrypt_salt_rounds);
//     this.password = await bcrypt.hash(this.password, saltRounds);
//     console.log('hashed password', this.password)
//     next();
//   } catch (error: any) {
//     console.log('bcrypt error:', error)
//     next(error);
//   }
// });

// // **Compare Password Method**
// userSchema.methods.isPasswordMatched = async function (
//   givenPassword: string
// ): Promise<boolean> {
//   return await bcrypt.compare(givenPassword, this.password);
// };

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email });
};

export const User = model<TUser, UserModel>('User', userSchema);
