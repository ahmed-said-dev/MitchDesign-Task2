import { useReducer, useCallback } from "react";

const BASE_URL = "https://woosonicpwa.com/MitchAPI/filter.php";

const httpReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_STARTED":
      return { ...state, loading: true, error: null };
    case "REQUEST_SUCCEEDED":
      return { ...state, loading: false, error: null };
    case "REQUEST_FAILED":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useHttp = () => {
  const [state, dispatch] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });

  const performRequest = useCallback(
    (options, onSuccess, onError) => {
      dispatch({ type: "REQUEST_STARTED" });

      const headers = {
        "Content-Type": "application/json",
        ...options.headers,
      };

      const requestOptions = {
        method: options.method || "POST",
        body: options.body ? JSON.stringify(options.body) : null,
        headers,
      };

      fetch(BASE_URL, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          onSuccess?.(data);
          dispatch({ type: "REQUEST_SUCCEEDED" });
        })
        .catch((err) => {
          onError?.(err);
          dispatch({ type: "REQUEST_FAILED", payload: err.message });
        });
    },
    []
  );

  return { ...state, performRequest };
};
