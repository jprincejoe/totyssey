import API from "@/config/apiClient";
import { Event } from "../types/eventType";
import { EventSearchResponse, SearchParams } from "../types/searchParams";

const API_BASE_URL = "/api/v1";

export const eventApi = {
  createEvent: async (data: FormData): Promise<Event> =>
    await API.post<Event>(`${API_BASE_URL}/my-events`, data),

  searchEvents: async (data: SearchParams): Promise<EventSearchResponse> => {
    // build query params for search
    const queryParams = new URLSearchParams();

    queryParams.append("location", data.location || "");
    queryParams.append("freeToAttend", data.freeToAttend.toString());
    queryParams.append("startDate", data.startDate || "");
    queryParams.append("endDate", data.endDate || "");
    queryParams.append("page", data.page || "");

    console.log("Query Params", queryParams);

    const events = await API.get<EventSearchResponse>(
      `${API_BASE_URL}/events/search/?${queryParams}`
    );

    return events;
  },
};
