import mongoose, { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

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
    match: timeRegex,
  },
  endTime: {
    type: String,
    required: true,
    match: timeRegex,
    default: null,
  },
  totalCost: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const Booking = model<TBooking>('Booking', BookingSchema);
