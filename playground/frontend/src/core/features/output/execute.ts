import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { SimpleThunkAction } from '../../actions';

interface State {
    code: string,
}

const initialState: State = {
    code: '',
};

const slice = createSlice({
    name: 'output/execute',
    initialState,
    reducers: {
        commonExecute(state, action: PayloadAction<string>) {
            state.code = action.payload;
        }
    },
});

export const performCommonExecute = (code: string): SimpleThunkAction => (dispatch, _getState) => {
    // const state = getState();
    return dispatch(commonExecute(code));
}

export const { commonExecute } = slice.actions;

export default slice.reducer;