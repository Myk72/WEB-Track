import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://akil-backend.onrender.com/opportunities",
  }),

  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => "/search",
    }),

    getAllProductById: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetAllProductQuery, useGetAllProductByIdQuery } = productsApi;
