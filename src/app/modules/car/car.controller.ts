import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { CarServices } from './car.service';
import httpStatus from 'http-status';

const createCar = catchAsync(async (req, res) => {
  console.log('cookies', req.cookies);

  const result = await CarServices.createCarIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Created Successfully',
    data: result,
  });
});

const getAllCars = catchAsync(async (req, res) => {
  const result = await CarServices.getAllCarsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Cars retreive successfully',
    data: result,
  });
});

const getSingleCarFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CarServices.getSingleCarFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car retreive successfully',
    data: result,
  });
});

const updateCarFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateCar = req.body;
  const result = await CarServices.updateCarIntoDB(id, updateCar);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Updated successfully',
    data: result,
  });
});

const deletedCarFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CarServices.deleteCarFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Deleted successfully',
    data: result,
  });
});

export const CarControllers = {
  createCar,
  getAllCars,
  getSingleCarFromDB,
  updateCarFromDB,
  deletedCarFromDB,
};
