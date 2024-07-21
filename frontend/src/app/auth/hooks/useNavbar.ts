import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import apiService from "../../../shared/services/api-service";
import { isAxiosError } from "axios";

interface JwtPayload {
  id: string;
}

interface NavbarUserData {
  username: string;
  userType: "client" | "hotelier";
}

const fetchNavbarUserData = async (
  userType: string,
  id: string
): Promise<NavbarUserData | null> => {
  try {
    const response = await apiService.get(`/${userType}/read/${id}`);
    return {
      username: response.data.username,
      userType: userType as "client" | "hotelier",
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      // Token is invalid or expired, treat as logged out
      return null;
    }
    console.error(`Error fetching ${userType} data for navbar:`, error);
    throw error;
  }
};

export const useNavbarUserData = (): UseQueryResult<
  NavbarUserData | null,
  unknown
> => {
  const token = localStorage.getItem("accessToken");
  const userType = localStorage.getItem("userType");

  const enabled = !!token && !!userType;

  return useQuery({
    queryKey: ["navbarUserData", token],
    queryFn: async () => {
      if (!enabled) return null;
      try {
        const { id } = jwtDecode<JwtPayload>(token!);
        return await fetchNavbarUserData(userType!, id);
      } catch (error) {
        console.error("Error decoding token or fetching user data:", error);
        return null;
      }
    },
    enabled: enabled,
    retry: false,
    staleTime: 300000, // 5 minutes
  });
};
