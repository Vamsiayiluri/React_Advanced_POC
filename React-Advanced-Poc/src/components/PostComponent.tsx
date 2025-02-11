import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../appStore/store";
import { fetchRequest } from "../appStore/actions";

const useAppDispatch = () => useDispatch<AppDispatch>();

const PostComponent = () => {
  const dispatch = useAppDispatch();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.post
  );

  return (
    <div>
      <button onClick={() => dispatch(fetchRequest())}>Fetch Post</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <h3>{data.title}</h3>
          <p>{data.body}</p>
        </div>
      )}
    </div>
  );
};

export default PostComponent;
