import { apiSlice } from "./apiSlice";
import { EMPLOYEE_URL } from "../constants";

export const staffApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    staffLogin: builder.mutation({
      query: (data) => ({
        url: `${EMPLOYEE_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    getStaff: builder.query({
      query: () => ({
        url: EMPLOYEE_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Employee"],
    }),
    createStaff: builder.mutation({
      query: (data) => ({
        url: `${EMPLOYEE_URL}`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Employee"],
    }),
    updateStaff: builder.mutation({
      query: (data) => ({
        url: `${EMPLOYEE_URL}/${data.staffId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Employee"],
    }),
    getStaffByID: builder.query({
      query: (id) => ({
        url: `${EMPLOYEE_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    deleteStaff: builder.mutation({
      query: (staffId) => ({
        url: `${EMPLOYEE_URL}/${staffId}`,
        method: "DELETE",
      }),
      providesTags: ["Employee"],
    }),
    staffprofile: builder.mutation({
      query: (data) => ({
        url: `${EMPLOYEE_URL}/${data.staffId}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useStaffLoginMutation,
  useGetStaffQuery,
  useCreateStaffMutation,
  useDeleteStaffMutation,
  useGetStaffByIDQuery,
  useUpdateStaffMutation,
  useStaffprofileMutation,
} = staffApiSlice;
