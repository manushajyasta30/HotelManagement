import { TYPE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const typesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTypes: builder.query({
      query: () => ({
        url: TYPE_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetTypesQuery } = typesApiSlice;
