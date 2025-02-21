import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { bookingServices } from './booking.service';
import httpStatus from 'http-status';

const createBooking = catchAsync(async (req, res) => {
  const user = req.user;

  const bookingData = {
    ...req.body,
    user: user._id,
  };

  const result = await bookingServices.createBookingIntoDB(bookingData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Data Created Successfully',
    data: result,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  console.log('query', req.query);
  
  const result = await bookingServices.getAllBookingFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Booking retreive successfully',
    data: result,
  });
});

const myBookings = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await bookingServices.myBookings(user._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Bookings retreive successfully',
    data: result,
  });
});

const getSingleBookingFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await bookingServices.getSingleBookingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking retreive successfully',
    data: result,
  });
});

const updateBookingFromDB = catchAsync(async (req, res) => {
  // const { id } = req.params;
  const { bookingId, endTime } = req.body;

  const result = await bookingServices.updateBookingIntoDB(bookingId, endTime);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Updated successfully',
    data: result,
  });
});

const deletedBookingFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await bookingServices.deleteBookingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Data Deleted successfully',
    data: result,
  });
});

export const BookingControlers = {
  createBooking,
  getAllBooking,
  myBookings,
  getSingleBookingFromDB,
  updateBookingFromDB,
  deletedBookingFromDB,
};
