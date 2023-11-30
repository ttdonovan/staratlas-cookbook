import { ThunkAction as ReduxThunkAction, AnyAction } from '@reduxjs/toolkit';

import { performCommonExecute } from './features/output/execute';
import { State } from './reducers';
import { PrimaryActionCore } from './types';

export type ThunkAction<T = void> = ReduxThunkAction<T, State, any, Action>; // FIXME
export type SimpleThunkAction<T = void> = ReduxThunkAction<T, State, any, AnyAction>; // FIXME

const createAction = <T extends string, P extends {}>(type: T, props?: P) => (
    Object.assign({ type }, props)
  );

const performExecuteOnly = (): ThunkAction => {
    console.log('performExecuteOnly');
    return performCommonExecute(''); // FIXME
};

const PRIMARY_ACTIONS: { [index in PrimaryActionCore]: () => ThunkAction } = {
    [PrimaryActionCore.Execute]: performExecuteOnly
};

export enum ActionType {
    InitializeApplication = 'INITIALIZE_APPLICATION',
}

export const initializeApplication = () => createAction(ActionType.InitializeApplication);

export const performPrimaryAction = (): ThunkAction => (dispatch, _getState) => {
    // const state = getState();
    // console.log(state);

    const primaryAction = PRIMARY_ACTIONS[PrimaryActionCore.Execute];

    return dispatch(primaryAction());
}

export type Action =
 | ReturnType<typeof initializeApplication>;