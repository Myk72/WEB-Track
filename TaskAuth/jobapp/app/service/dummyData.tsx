import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://akil-backend.onrender.com",
  }),

  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => "/opportunities/search",
    }),

    getAllProductById: builder.query({
      query: (id) => `/opportunities/${id}`,
    }),

    register: builder.mutation({
      query: (newProfile) => ({
          url: `/signup`,
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: newProfile
      })
      }),
      

    EmailVerification: builder.mutation({
        query: (verify) => ({
            url: `/verify-email`,
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: verify
        })
    })

    
  }),
});

export const { useGetAllProductQuery, useGetAllProductByIdQuery,useEmailVerificationMutation,useRegisterMutation } = productsApi;
