import { useCallback, useReducer } from "react";

const ACTION_SEND = "SEND";
const ACTION_SUCCESS = "SUCCESS";
const ACTION_ERROR = "ERROR";

export const STATUS_PENDING = "PENDING";
export const STATUS_COMPLETE = "COMPLETE";

function httpReducer(state, action) {
  if (action.type === ACTION_SEND) {
    return {
      data: null,
      error: null,
      status: STATUS_PENDING,
    };
  }

  if (action.type === ACTION_SUCCESS) {
    return {
      data: action.response,
      error: null,
      status: STATUS_COMPLETE,
    };
  }

  if (action.type === ACTION_ERROR) {
    return {
      data: null,
      error: action.error,
      status: STATUS_COMPLETE,
    };
  }

  return state;
}

function useHttp(requestFunction) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async function (requestData) {
      dispatch({ type: ACTION_SEND });
      try {
        const response = await requestFunction(requestData);
        dispatch({ type: ACTION_SUCCESS, response });
      } catch (error) {
        dispatch({
          type: ACTION_ERROR,
          error: error.message,
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
