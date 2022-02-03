function buildAuthorizationBearer(token) {
  return { Authorization: `Bearer ${token}` };
}
function buildContentTypeAppJson() {
  return { "Content-Type": "application/json" };
}

function throwError(data) {
  let error = data;
  if (data && data.hasOwnProperty("detail")) {
    error = data.detail;
  } else if (data && data.hasOwnProperty("message")) {
    error = data.message;
  }
  throw new Error(error);
}

export async function getMe(requestData) {
  const { token } = requestData;
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
    method: "GET",
    headers: {
      ...buildAuthorizationBearer(token),
      ...buildContentTypeAppJson(),
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throwError(data);
  }
}

export async function updatePassword(requestData) {
  const { userId, token, oldPassword, newPassword } = requestData;
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/${userId}/password`,
    {
      method: "POST",
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
      headers: {
        ...buildAuthorizationBearer(token),
        ...buildContentTypeAppJson(),
      },
    }
  );
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throwError(data);
  }
}

export async function login(requestData) {
  const { email, password } = requestData;
  const response = await fetch(`${process.env.REACT_APP_API_URL}/token`, {
    method: "POST",
    body: `username=${email}&password=${password}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throwError(data);
  }
}
