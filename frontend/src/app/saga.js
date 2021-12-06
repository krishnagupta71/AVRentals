import { all, spawn } from "redux-saga/effects";
import { loginSaga, logoutSaga, registerSaga } from "../features/auth/AuthSaga";
import {
  addUserCarSaga,
  deleteUserCarSaga,
  fetchOwnerCarsSaga,
  findRidesSaga,
} from "../features/home/HomeSaga";
import {
  bookRidesSaga,
  getAllUserBookingsSaga,
  tripStartSaga,
  tripTrackingSaga,
} from "../features/bookings/BookingSaga";

export default function* rootSaga() {
  yield all([
    spawn(loginSaga),
    spawn(logoutSaga),
    spawn(registerSaga),
    spawn(findRidesSaga),
    spawn(bookRidesSaga),
    spawn(tripTrackingSaga),
    spawn(tripStartSaga),
    spawn(fetchOwnerCarsSaga),
    spawn(addUserCarSaga),
    spawn(deleteUserCarSaga),
    spawn(getAllUserBookingsSaga),
  ]);
}
