import { call, takeEvery, put } from "@redux-saga/core/effects";
import { loginAction, logoutAction, registerAction } from "../../app/actions";
import { post } from "../../app/Api";
import { login, logout, register } from "./AuthSlice";

function* loginUser({ payload }) {
  const email = payload.email;
  const password = payload.password;
  const response = yield call(post, {
    endpoint: "login",
    body: {
      password: password,
      user_email: email,
    },
  });
  if (response.status) {
    yield put(login(response.data[0]));
  }
}

function* logoutUser() {
  yield put(logout());
}

function* registerUser({ payload }) {
  const reqBody = {
    password: payload.password,
    user_email: payload.email,
    firstname: payload.name.split(" ")[0],
    lastname:
      payload.name.split(" ").length > 1 ? payload.name.split(" ")[1] : "",
    address: payload.address,
    phone: payload.phone,
    role: payload.role,
  };
  const response = yield call(post, {
    endpoint: "register",
    body: reqBody,
  });
  console.log(response);
  if (response.status) {
    reqBody.userID = response.data.insertId;
    yield put(register(reqBody));
  }
}

export function* loginSaga() {
  yield takeEvery(loginAction.toString(), loginUser);
}

export function* registerSaga() {
  yield takeEvery(registerAction.toString(), registerUser);
}

export function* logoutSaga() {
  yield takeEvery(logoutAction.toString(), logoutUser);
}
