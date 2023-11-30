import { createSlice } from '@reduxjs/toolkit';

interface State {
    value: number,
}

const initialState: State = {
    value: 0,
};

const slice = createSlice({
    name: 'output/execute',
    initialState,
    reducers: {
        increment(state) {
            state.value += 1;
        },

        decrement(state) {
            state.value -= 1;
        },
    },
});

export const { increment, decrement } = slice.actions;

export default slice.reducer;