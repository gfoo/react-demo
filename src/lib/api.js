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

async function getJsonResult(response) {
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throwError(data);
  }
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
  return getJsonResult(response);
}

export async function getAllUsers(requestData) {
  const { token } = requestData;
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: "GET",
    headers: {
      ...buildAuthorizationBearer(token),
      ...buildContentTypeAppJson(),
    },
  });
  return getJsonResult(response);
}

export async function updatePassword(requestData) {
  const { userId, token, oldPassword, newPassword, reset } = requestData;
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/${userId}/${
      reset ? "reset_" : ""
    }password`,
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
  return getJsonResult(response);
}

export async function updateActivate(requestData) {
  const { userId, token, activate } = requestData;
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/${userId}/activate`,
    {
      method: "POST",
      body: JSON.stringify({
        activate,
      }),
      headers: {
        ...buildAuthorizationBearer(token),
        ...buildContentTypeAppJson(),
      },
    }
  );
  return getJsonResult(response);
}

export async function updateSuperuser(requestData) {
  const { userId, token, superuser } = requestData;
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/${userId}/superuser`,
    {
      method: "POST",
      body: JSON.stringify({
        superuser,
      }),
      headers: {
        ...buildAuthorizationBearer(token),
        ...buildContentTypeAppJson(),
      },
    }
  );
  return getJsonResult(response);
}

export async function deleteUser(requestData) {
  const { userId, token } = requestData;
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/${userId}`,
    {
      method: "DELETE",
      headers: {
        ...buildAuthorizationBearer(token),
        ...buildContentTypeAppJson(),
      },
    }
  );
  return getJsonResult(response);
}

export async function createUser(requestData) {
  const { email, fullname, password, active, superuser, token } = requestData;
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: "POST",
    body: JSON.stringify({
      email,
      fullname,
      is_active: active,
      is_superuser: superuser,
      password,
    }),
    headers: {
      ...buildAuthorizationBearer(token),
      ...buildContentTypeAppJson(),
    },
  });
  return getJsonResult(response);
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
  return getJsonResult(response);
}

export async function getProjects(requestData) {
  const { token } = requestData;
  const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
    method: "GET",
    headers: {
      ...buildAuthorizationBearer(token),
      ...buildContentTypeAppJson(),
    },
  });
  return getJsonResult(response);
}

export async function getProject(requestData) {
  const { projectId, token } = requestData;
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/projects/${projectId}`,
    {
      method: "GET",
      headers: {
        ...buildAuthorizationBearer(token),
        ...buildContentTypeAppJson(),
      },
    }
  );
  return getJsonResult(response);
}

export async function createProject(requestData) {
  const { name, description, private_, token } = requestData;
  const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
    method: "POST",
    body: JSON.stringify({
      name,
      description,
      private: private_,
    }),
    headers: {
      ...buildAuthorizationBearer(token),
      ...buildContentTypeAppJson(),
    },
  });
  return getJsonResult(response);
}

export async function deleteProject(requestData) {
  const { projectId, token } = requestData;
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/projects/${projectId}`,
    {
      method: "DELETE",
      headers: {
        ...buildAuthorizationBearer(token),
        ...buildContentTypeAppJson(),
      },
    }
  );
  return getJsonResult(response);
}

export async function updateProject(requestData) {
  const { projectId, name, description, private_, token } = requestData;
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/projects/${projectId}`,
    {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
        private: private_,
      }),
      headers: {
        ...buildAuthorizationBearer(token),
        ...buildContentTypeAppJson(),
      },
    }
  );
  return getJsonResult(response);
}
