import { useEffect, useReducer } from "react";
import axios from "axios";

const defaultState = {
  isLoading: false,
  data: null,
  error: null,
};

const reducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case "LOADING":
      return {
        ...defaultState,
        data: state.data,
        isLoading: true,
      };
    case "SUCCESS":
      return {
        ...defaultState,
        data: payload,
      };
    case "FAILURE":
      return {
        ...defaultState,
        error: payload,
      };
    default:
      throw new Error(`Unknown action ${type}`);
  }
};

const useApi = (defaultAxiosOpts = {}) => {
  const executeImmediately = !!(
    defaultAxiosOpts.url &&
    (!defaultAxiosOpts.method ||
      defaultAxiosOpts.method.toUpperCase() === "GET")
  );

  const [state, dispatch] = useReducer(reducer, {
    ...defaultState,
    isLoading: executeImmediately,
  });

  const callApi = async (axiosOpts) => {
    const opts = { ...defaultAxiosOpts, ...axiosOpts };

    try {
      if (!state.isLoading) dispatch({ type: "LOADING" });
      const response = await axios({
        method: "get",
        crossDomain: true,
        ...opts,
        url: `${process.env.REACT_APP_API_URL}${opts.url.replace(/^\//, "")}`,
      });
      dispatch({ type: "SUCCESS", payload: response.data });
      return response.data;
    } catch (apiError) {
      dispatch({ type: "FAILURE", payload: apiError.message });
      throw apiError;
    }
  };

  useEffect(() => {
    if (executeImmediately) callApi().catch(console.error);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { ...state, callApi };
};

export default useApi;
