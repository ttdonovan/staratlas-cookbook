import { combineReducers } from '@reduxjs/toolkit';

import execute from './execute';

const output = combineReducers({
    execute,
});

export type State = ReturnType<typeof output>;

export default output;