import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import apiService from "../../../shared/services/api-service";
import { Client, Hotelier } from "../models/UsersModel";

interface JwtPayload {
  id: string;
}

const fetchClientData = async (id: string): Promise<Client> => {
  try {
    const response = await apiService.get(`/client/read/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching client data:", error);
    throw error;
  }
};

const fetchHotelierData = async (id: string): Promise<Hotelier> => {
  try {
    const response = await apiService.get(`/hotelier/read/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching hotelier data:", error);
    throw error;
  }
};

export const useClientData = (): UseQueryResult<Client, unknown> => {
  const token = localStorage.getItem("accessToken");
  const userType = localStorage.getItem("userType");

  if (!token || userType !== "client") {
    throw new Error("User is not authenticated as a client");
  }

  const { id } = jwtDecode<JwtPayload>(token);

  return useQuery({
    queryKey: ["clientData", id],
    queryFn: () => fetchClientData(id),
    enabled: !!id,
  });
};

export const useHotelierData = (): UseQueryResult<Hotelier, unknown> => {
  const token = localStorage.getItem("accessToken");
  const userType = localStorage.getItem("userType");

  if (!token || userType !== "hotelier") {
    throw new Error("User is not authenticated as a hotelier");
  }

  const { id } = jwtDecode<JwtPayload>(token);

  return useQuery({
    queryKey: ["hotelierData", id],
    queryFn: () => fetchHotelierData(id),
    enabled: !!id,
  });
};