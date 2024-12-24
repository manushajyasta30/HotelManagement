import { apiSlice } from "./apiSlice";
import { RESERVATION_URL, PAYPAL_URL } from "../constants";

export const reservationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReservation: builder.mutation({
      query: (reservation) => ({
        url: RESERVATION_URL,
        method: "POST",
        body: reservation,
      }),
    }),
    createCounterReservation: builder.mutation({
      query: (reservation) => ({
        url: `${RESERVATION_URL}/counter`,
        method: "POST",
        body: reservation,
      }),
    }),
    getReservationById: builder.query({
      query: (id) => ({
        url: `${RESERVATION_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payReservation: builder.mutation({
      query: ({ reservationId, details }) => ({
        url: `${RESERVATION_URL}/${reservationId}/pay`,
        method: "PUT",
        body: details,
      }),
    }),
    extraCharge: builder.mutation({
      query: ({ reservationId, details }) => ({
        url: `${RESERVATION_URL}/${reservationId}/extra`,
        method: "PUT",
        body: details,
      }),
    }),
    cancelReservation: builder.mutation({
      query: (reservationId) => ({
        url: `${RESERVATION_URL}/${reservationId}/cancel`,
        method: "PUT",
      }),
    }),
    updateStatus: builder.mutation({
      query: (reservationId) => ({
        url: `${RESERVATION_URL}/${reservationId}`,
        method: "PUT",
      }),
    }),
    getClientID: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyReservations: builder.query({
      query: (userId) => ({
        url: `${RESERVATION_URL}/myreservations/${userId}`,
      }),

      keepUnusedDataFor: 5,
    }),
    getReservations: builder.query({
      query: () => ({
        url: RESERVATION_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Reservation"],
    }),
  }),
});

export const {
  useCreateReservationMutation,
  useCreateCounterReservationMutation,
  useGetClientIDQuery,
  useGetMyReservationsQuery,
  useGetReservationByIdQuery,
  useCancelReservationMutation,
  usePayReservationMutation,
  useGetReservationsQuery,
  useUpdateStatusMutation,
  useExtraChargeMutation,
} = reservationApiSlice;
