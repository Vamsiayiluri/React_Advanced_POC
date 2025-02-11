
export interface Post {
    id: number;
    title: string;
    body: string;
  }
  
  export interface PostState {
    loading: boolean;
    data: Post | null;
    error: string | null;
  }
  
  export enum PostActionTypes {
    FETCH_REQUEST = "FETCH_REQUEST",
    FETCH_SUCCESS = "FETCH_SUCCESS",
    FETCH_ERROR = "FETCH_ERROR",
  }
  
  interface FetchRequestAction {
    type: PostActionTypes.FETCH_REQUEST;
  }
  
  interface FetchSuccessAction {
    type: PostActionTypes.FETCH_SUCCESS;
    payload: Post;
  }
  
  interface FetchErrorAction {
    type: PostActionTypes.FETCH_ERROR;
    error: string;
  }
  
  export type PostActions =
    | FetchRequestAction
    | FetchSuccessAction
    | FetchErrorAction;


    
    
  