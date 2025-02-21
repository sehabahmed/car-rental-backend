import AppError from '../../errors/AppError';
import { Car } from '../car/car.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import httpStatus from 'http-status';

const createBookingIntoDB = async (payload: TBooking) => {
  await Car.findByIdAndUpdate(payload.car, { status: 'unavailable' });

  const result = await Booking.create(payload);

  const populateUserAndCard = await Booking.findById(result._id)
    .populate('user')
    .populate('car');

  return populateUserAndCard;
};

const getAllBookingFromDB = async (userId: string) => {
  const result = await Booking.find({ user: userId })
    .populate('user')
    .populate('car');

  return result;
};

const getSingleBookingFromDB = async (id: string) => {
  const result = await Booking.findById(id);

  return result;
};

const updateBookingIntoDB = async (bookingId: string, endTime: string) => {
  //check if user data is exist
  const booking = await Booking.findById({ _id: bookingId })
    .populate('user')
    .populate('car');

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking Data not Found');
  }

  //update car status to available

  const car = await Car.findByIdAndUpdate(
    booking.car._id,
    { status: 'available' },
    { new: true },
  );

  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car Not Found');
  }

  //calculate total cost

  const startTime = booking.startTime;
  const pricePerHour = car.pricePerHour;

  const start = new Date(`1970-01-01T${startTime}`);
  const end = new Date(`1970-01-01T${endTime}`);

  const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  const totalCost = durationHours * pricePerHour;

  const result = await Booking.findByIdAndUpdate(
    bookingId,
    { endTime, totalCost },
    {
      new: true,
    },
  )
    .populate('user')
    .populate('car');

  return result;
};

const deleteBookingFromDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return result;
};

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getSingleBookingFromDB,
  updateBookingIntoDB,
  deleteBookingFromDB,
};
