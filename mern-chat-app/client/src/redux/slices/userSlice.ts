import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

interface UserState {
  users: [];
}

const initialState: UserState = {
  users: [
  ],
};
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await api.get("/users");
  return response.data;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default userSlice.reducer;
