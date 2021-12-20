const baseURL = "http://localhost:8000";

export const listUsers = async () => {
  const response = await fetch(`${baseURL}/api/users/`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export const addUser = async (newUser) => {
  const response = await fetch(`${baseURL}/api/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(newUser),
  });
  const data = await response.json();
  return data;
};

export const updateUser = async (userId, updatedUser) => {
  const response = await fetch(`${baseURL}/api/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(updatedUser),
  });
  const data = await response.json();
  return data;
};

export const deleteUser = async (userId) => {
  const response = await fetch(`${baseURL}/api/users/${userId}`, {
    method: "DELETE",
  });
  return response.status;
};
