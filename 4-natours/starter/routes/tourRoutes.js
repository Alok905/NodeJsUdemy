const tourRouter = require('express').Router();
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkBody,
} = require('../controllers/tourController');

// we didn't use a normal middleware to check the id, then we had to mention it in all the routes methods where the perticular validation is needed or error would have occured for the routes which don't need any id
// It runs only for the routes that has mentioned any params the same as the parameter passed inside params (like here we have mentioned 'id', it means it'll run only for those routes that contains the params named as id)
// tourRouter.param('id', checkID);

tourRouter.route('/').get(getAllTours).post(checkBody, createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = tourRouter;
