import { jwtDecode } from "jwt-decode";
import useAuthContext from "../../context/useAuthContext";

export const getUserData = () => {
  const { apiToken } = useAuthContext();

  try {
    const decodedToken = jwtDecode(apiToken);
    // console.log(decodedToken)
    return decodedToken;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
