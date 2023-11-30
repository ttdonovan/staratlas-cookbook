import { combineReducers } from '@reduxjs/toolkit';

import counter from './features/counter';
import output from './features/output';

const playground = combineReducers({
    counter,
    output,
});

export type State = ReturnType<typeof playground>;

export default playground;