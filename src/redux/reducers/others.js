import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isNewGroup: false,
  isAddMember: false,
  isNotification: false,
  isMobileMenuFriend: false,
  isSearch: false,
  isFileMenu: false,
  uploadingLoader: false,
  isDeleteMenu: false,
  selectedDeleteChat: {
    chatId: '',
    groupChat: false,
  },
};

const othersSlice = createSlice({
  name: 'others',
  initialState,
  reducers: {
    setIsNewGroup: (state, action) => {
      state.isNewGroup = action.payload;
    },
    setIsAddMember: (state, action) => {
      state.isAddMember = action.payload;
    },
    setIsNotification: (state, action) => {
      state.isNotification = action.payload;
    },
    setIsMobileMenuFriend: (state, action) => {
      state.isMobileMenuFriend = action.payload;
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    setIsFileMenu: (state, action) => {
      state.isFileMenu = action.payload;
    },
    setUploadingLoader: (state, action) => {
      state.uploadingLoader = action.payload;
    },
    setIsDeleteMenu: (state, action) => {
      state.isDeleteMenu = action.payload;
    },
    setSelectedDeleteChat: (state, action) => {
      state.selectedDeleteChat = action.payload;
    },
  },
});

export default othersSlice;

export const {
  setIsAddMember,
  setIsDeleteMenu,
  setIsFileMenu,
  setIsMobileMenuFriend,
  setIsNotification,
  setIsSearch,
  setSelectedDeleteChat,
  setIsNewGroup,
  setUploadingLoader,
} = othersSlice.actions;
