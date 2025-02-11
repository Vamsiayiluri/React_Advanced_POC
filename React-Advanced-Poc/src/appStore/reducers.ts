import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE } from "./actionTypes";
import { PostActions } from "./actions";

export interface PostState {
  loading: boolean;
  data: any | null;
  error: string | null;
}

const initialState: PostState = {
  loading: false,
  data: null,
  error: null,
};

export const postReducer = (state = initialState, action: PostActions): PostState => {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
