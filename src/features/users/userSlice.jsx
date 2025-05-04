import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulate fetch users API with delay
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5 sec delay
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return await response.json();
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.no !== action.payload);
    },
    addUser: (state, action) => {
      const { no, name, email } = action.payload;
      const newUser = { no, name, email };
      state.users.push(newUser);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        // ✅ Map the API response to match the format used in your app
        state.users = action.payload.map(user => ({
          no: user.id,
          name: user.name,
          email: user.email
        }));
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { deleteUser, addUser } = usersSlice.actions;
export default usersSlice.reducer;