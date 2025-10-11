export const register = ({ name, email }) => {
  return new Promise((resolve) => {
    resolve({
      data: {
        _id: "test-user-id",
        name,
        email,
      },
    });
  });
};

export const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    if (email === "test@test.com" && password === "test") {
      resolve({ token: "fake-jwt-token-123" });
    } else {
      reject(new Error("Invalid email or password"));
    }
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    if (token === "fake-jwt-token-123") {
      resolve({
        data: {
          _id: "test-user-id",
          name: "Test User",
          email: "test@test.com",
        },
      });
    } else {
      reject(new Error("Invalid token"));
    }
  });
};
