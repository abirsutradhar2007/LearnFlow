const API_URL = import.meta.env.VITE_API_URL;
let refreshRequest;

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const refreshAccessToken = () => {
  if (!refreshRequest) {
    refreshRequest = fetch(`${API_URL}/users/refresh`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 401) {
          return false;
        }

        let result;
        try {
          result = await response.json();
        } catch {
          throw new ApiError(
            "The server returned an invalid response.",
            response.status
          );
        }

        if (!response.ok || !result?.success) {
          throw new ApiError(
            result?.message || "The session could not be refreshed.",
            response.status
          );
        }

        return true;
      })
      .finally(() => {
        refreshRequest = null;
      });
  }

  return refreshRequest;
};

export const apiRequest = async (path, options = {}) => {
  const {
    notifyUnauthorized = false,
    refreshOnUnauthorized = false,
    ...fetchOptions
  } = options;

  const sendRequest = () =>
    fetch(`${API_URL}${path}`, {
      ...fetchOptions,
      credentials: "include",
    });

  let response = await sendRequest();

  if (response.status === 401 && refreshOnUnauthorized) {
    const refreshed = await refreshAccessToken();

    if (refreshed) {
      response = await sendRequest();
    }
  }

  let result;
  try {
    result = await response.json();
  } catch {
    throw new ApiError("The server returned an invalid response.", response.status);
  }

  if (!response.ok || !result?.success) {
    const error = new ApiError(
      result?.message || "The request failed.",
      response.status
    );

    if (response.status === 401 && notifyUnauthorized) {
      window.dispatchEvent(new Event("auth:unauthorized"));
    }

    throw error;
  }

  return result;
};
