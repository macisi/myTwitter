/**
 * Custom Hooks for reuse.
 */
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/rootReducer';
import { Selector } from 'reselect';
import { PayloadAC } from 'typesafe-actions';

type UseFetchResult<Result> = {
  pending: boolean;
} & Result;

export const useFetch = <Result = object, RequestPayload = object>(
  selector: Selector<RootState, UseFetchResult<Result>>,
  request: PayloadAC<string, RequestPayload>
) => {
  const dispatch = useDispatch();
  const { pending, ...result } = useSelector(selector);
  const fetch = (query: RequestPayload) => dispatch(request(query));

  return {
    result,
    pending,
    fetch,
  };
};
