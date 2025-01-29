import jwtDecode from "jwt-decode";

const isAdmin = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.isAdmin;
  }
  return false;
};

export default isAdmin;
