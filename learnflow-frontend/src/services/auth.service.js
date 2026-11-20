import { apiRequest } from "./api.service.js";

const jsonRequest = (method, body, notifyUnauthorized = false) => ({
  method,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
  notifyUnauthorized,
});

export const login = async (email, password) => {
  const result = await apiRequest(
    "/users/login",
    jsonRequest("POST", { email, password })
  );
  return result.data;
};

export const signup = async ({ username, email, password }) => {
  await apiRequest(
    "/users/register",
    jsonRequest("POST", { username, email, password })
  );

  return login(email, password);
};

export const logout = () =>
  apiRequest("/users/logout", jsonRequest("POST", {}, true));

export const submitQuizScore = (score) =>
  apiRequest("/users/submitQuiz", {
    ...jsonRequest("POST", { score }, true),
    refreshOnUnauthorized: true,
  });

export const getCurrentUser = async () => {
  const result = await apiRequest("/users/profile", {
    refreshOnUnauthorized: true,
  });
  return result.data;
};
