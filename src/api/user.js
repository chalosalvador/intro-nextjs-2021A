import api from "./index";

const User = {
  register: (userData) => {
    return api.post("/register", {
      ...userData,
      role: "ROLE_USER",
    });
  },
};

export default User;
