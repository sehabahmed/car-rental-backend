import mongoose, { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const BookingSchema = new mongoose.Schema<TBooking>({
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  car: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Car',
  },
  startTime: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/,
  },
  endTime: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/,
  },
  totalCost: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const Booking = model<TBooking>('Booking', BookingSchema);
