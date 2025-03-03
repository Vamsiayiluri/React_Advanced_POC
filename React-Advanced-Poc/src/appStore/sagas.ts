import { call, put, takeEvery } from "redux-saga/effects";
import { PostActionTypes, Post } from "../types";
import { fetchSuccess, fetchError } from "./actions";

const fetchPostFromAPI = async (): Promise<Post> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  if (!response.ok) throw new Error("Failed to fetch post");
  return response.json();
};

function* fetchPostSaga() {
  try {
    const data: Post = yield call(fetchPostFromAPI);
    yield put(fetchSuccess(data)); 
  } catch (error: any) {
    yield put(fetchError(error.message)); 
  }
}

export function* watchPostSaga() {
  yield takeEvery(PostActionTypes.FETCH_REQUEST, fetchPostSaga);
}

export default function* rootSaga() {
  yield watchPostSaga();
}
