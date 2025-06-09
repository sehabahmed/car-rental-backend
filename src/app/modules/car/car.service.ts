import logger from '../../../logger';
import AppError from '../../errors/AppError';
import { Booking } from '../booking/booking.model';
import { TCar } from './car.interface';
import { Car } from './car.model';
import httpStatus from 'http-status';

const createCarIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);

  return result;
};

const getAllCarsFromDB = async () => {
  const result = await Car.find();

  return result;
};

const getSingleCarFromDB = async (id: string) => {
  const result = await Car.findById(id);

  return result;
};

const updateCarIntoDB = async (id: string, payload: Partial<TCar>) => {
  const result = await Car.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteCarFromDB = async (id: string) => {
  const result = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return result;
};

export const searchAvailableCars = async (
  location: string,
  date: string,
  startTime: string,
  endTime?: string,
) => {
  try {
    // Validate input
    if (!location || !date || !startTime) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Location, date, and startTime are required',
      );
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid date format');
    }

    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!timeRegex.test(startTime)) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Invalid startTime format (HH:mm)',
      );
    }

    if (endTime && !timeRegex.test(endTime)) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Invalid endTime format (HH:mm)',
      );
    }

    // Convert times to Date objects for comparison
    const requestedStart = new Date(`1970-01-01T${startTime}:00Z`);
    const requestedEnd = endTime ? new Date(`1970-01-01T${endTime}:00Z`) : null;

    // Find cars that are available and in the desired location
    const cars = await Car.find({
      status: 'available',
      location,
      isDeleted: false,
    });

    const availableCars = [];

    for (const car of cars) {

      const bookings = await Booking.find({
        car: car._id,
        date: parsedDate,
      });

      const isConflict = bookings.some((booking) => {
        const bookedStart = new Date(`1970-01-01T${booking.startTime}:00Z`);
        const bookedEnd = booking.endTime
          ? new Date(`1970-01-01T${booking.endTime}:00Z`)
          : null;

        if (requestedEnd) {
          return (
            (!bookedEnd && requestedStart.getTime() >= bookedStart.getTime()) ||
            (bookedEnd &&
              ((requestedStart < bookedEnd && requestedEnd > bookedStart) ||
                requestedStart.getTime() === bookedStart.getTime()))
          );
        } else {
          return (
            !bookedEnd || requestedStart.getTime() === bookedStart.getTime()
          );
        }
      });

      if (!isConflict) {
        availableCars.push(car);
      }
    }

    if (availableCars.length === 0) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'No available cars found for the given time and location',
      );
    }

    return availableCars;
  } catch (error: any) {
    logger.error('Error in searchAvailableCars:', error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'An unexpected error occurred while searching for cars',
    );
  }
};

export const CarServices = {
  createCarIntoDB,
  getAllCarsFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteCarFromDB,
  searchAvailableCars,
};
