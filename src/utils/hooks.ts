/**
 * Custom Hooks for reuse.
 */
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/rootReducer';
import { Selector, ParametricSelector } from 'reselect';
import { PayloadAC, PayloadAction } from 'typesafe-actions';

export type UseFetchResult<Result> = {
  pending: boolean;
} & Result;

type fetchResult<Result, RequestPayload> = {
  result: Result;
  pending: boolean;
  fetch: (query: RequestPayload) => PayloadAction<string, RequestPayload>;
};

export function useFetch<Result, RequestPayload = object>(
  selector: Selector<RootState, UseFetchResult<Result>>,
  request: PayloadAC<string, RequestPayload>
): fetchResult<Result, RequestPayload>;
export function useFetch<Result, Props, RequestPayload = object>(
  selector: ParametricSelector<RootState, Props, UseFetchResult<Result>>,
  props: Props,
  request: PayloadAC<string, RequestPayload>
): fetchResult<Result, RequestPayload>;
export function useFetch<Result, Props, RequestPayload = object>(
  selector:
    | Selector<RootState, UseFetchResult<Result>>
    | ParametricSelector<RootState, Props, UseFetchResult<Result>>,
  props: unknown,
  request?: unknown
) {
  if (typeof props === 'function') {
    request = props;
    props = null;
  }
  const dispatch = useDispatch();
  const { pending, ...result } = useSelector<RootState, UseFetchResult<Result>>(
    state => selector(state, props as Props)
  );
  const fetch = (query: RequestPayload) =>
    dispatch((request as PayloadAC<string, RequestPayload>)(query));

  return {
    result,
    pending,
    fetch,
  };
}
