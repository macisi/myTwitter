import { RootAction } from '@src/rootAction';
import { RootState } from '@src/rootReducer';

export type RootAction = RootAction;
export type RootState = RootState;

declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction;
    RootState: RootState;
  }
}
