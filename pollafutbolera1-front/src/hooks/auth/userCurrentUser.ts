import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { LoginResponse } from "@/src/interfaces/loginResponse.interface";

export const useCurrentUser = () => {
  const [user, setUser] = useState<LoginResponse>();

  useEffect(() => {
    const userCookie = Cookies.get("currentUser");

    if (userCookie) {
      try {
        const parsedUser = JSON.parse(userCookie);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user cookie:", error);
        // Optionally remove invalid cookie
        // Cookies.remove("currentUser");
      }
    }
  }, []);

  return { user };
};
