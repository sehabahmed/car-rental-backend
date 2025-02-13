import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (payload: TBooking) => {
  const result = await Booking.create(payload);

  return result;
};

const getAllBookingFromDB = async () => {
  const result = await Booking.find().populate('user').populate('car');

  return result;
};

const getSingleBookingFromDB = async (id: string) => {
  const result = await Booking.findById(id);

  return result;
};

const updateBookingIntoDB = async (id: string, payload: Partial<TBooking>) => {
  const result = await Booking.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

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
    deleteBookingFromDB
}