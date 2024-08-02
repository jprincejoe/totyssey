import API from "@/config/apiClient";
import { TEvent } from "../types/eventType";

const baseUrl = "/api/v1/my-events";

export const eventApi = {
  createEvent: async (data: FormData): Promise<TEvent> =>
    await API.post<TEvent>(`${baseUrl}`, data),
};
