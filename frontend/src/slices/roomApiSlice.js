import { ROOMS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const roomsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: () => ({
        url: ROOMS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getRoomById: builder.query({
      query: (id) => ({
        url: `${ROOMS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createRoom: builder.mutation({
      query: (data) => ({
        url: `${ROOMS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Room"],
    }),
    updateRoom: builder.mutation({
      query: (data) => ({
        url: `${ROOMS_URL}/${data.roomId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Rooms"],
    }),
    uploadRoomImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: "POST",
        body: data,
      }),
    }),
    deleteRoom: builder.mutation({
      query: (roomId) => ({
        url: `${ROOMS_URL}/${roomId}`,
        method: "DELETE",
      }),
      providesTags: ["Rooms"],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetRoomByIdQuery,
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useUpdateRoomMutation,
  useUploadRoomImageMutation,
} = roomsApiSlice;
