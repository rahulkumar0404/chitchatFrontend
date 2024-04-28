import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from '../../constants/config.js';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1` }),
  tagTypes: ['Chat', 'User'],

  endpoints: (builder) => ({
    getMyChats: builder.query({
      query: () => ({
        url: '/chat/my',
        credentials: 'include',
      }),
      providesTags: ['Chat'],
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `/user/search?firstName=${name}`,
        credentials: 'include',
      }),
      providesTags: ['User'],
    }),
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: '/user/sendrequest',
        method: 'POST',
        credentials: 'include',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    getNotification: builder.query({
      query: () => ({
        url: `/user/notifications`,
        credentials: 'include',
      }),
      keepUnusedDataFor: 0,
    }),
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: '/user/acceptrequest',
        method: 'POST',
        credentials: 'include',
        body: data,
      }),
      invalidatesTags: ['Chat'],
    }),
  }),
});

export const useMyChatsQuery = api.endpoints.getMyChats.useQuery;
export const useLazySearchQuery = api.endpoints.searchUser.useLazyQuery;
export const useSendFriendRequestMutation =
  api.endpoints.sendFriendRequest.useMutation;
export const useGetNotificationQuery = api.endpoints.getNotification.useQuery;
export const useAcceptFriendRequest =
  api.endpoints.acceptFriendRequest.useMutation;
