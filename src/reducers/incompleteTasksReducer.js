import { createReducer } from '@reduxjs/toolkit';
import {
  GET_ALLINCOMPLETED_REQUEST,
  GET_ALLINCOMPLETED_SUCCESS,
  GET_ALLINCOMPLETED_FAIL,
  ADD_INCOMPLETE,
  REMOVE_INCOMPLETE,
  DELETEALL_SUCCESS,
  POST_INCOMPLETED_REQUEST,
  POST_INCOMPLETED_FAIL,
  UPDATE_INCOMPLETE_REQUEST,
  UPDATE_INCOMPLETE_SUCCESS,
  UPDATE_INCOMPLETE_FAIL,
  POST_INCOMPLETED_SUCCESS,
} from '../constants/taskConstants';

export const incompletedTasksReducer = createReducer(
  { incompletedTasks: [] },
  (builder) => {
    builder
      .addCase(GET_ALLINCOMPLETED_REQUEST, (state) => {
        state.isLoading = true;
      })
      .addCase(GET_ALLINCOMPLETED_SUCCESS, (state, action) => {
        state.isLoading = false;
        state.incompletedTasks = action.payload;
      })
      .addCase(GET_ALLINCOMPLETED_FAIL, (state, action) => {
        state.isLoading = false;
        state.err = action.payload;
      })
      .addCase(POST_INCOMPLETED_REQUEST, (state) => {
        state.isLoading = true;
      })
      .addCase(POST_INCOMPLETED_SUCCESS, (state, action) => {
        state.isLoading = false;
        state.incompletedTasks.push(action.payload);
      })
      .addCase(POST_INCOMPLETED_FAIL, (state, action) => {
        state.isLoading = false;
        state.err = action.payload;
      })
      .addCase(UPDATE_INCOMPLETE_REQUEST, (state) => {
        state.isLoading = true;
      })
      .addCase(UPDATE_INCOMPLETE_SUCCESS, (state, action) => {
        state.isLoading = false;
        state.incompletedTasks[action.index] = action.payload;
      })
      .addCase(UPDATE_INCOMPLETE_FAIL, (state, action) => {
        state.isLoading = false;
        state.err = action.payload;
      })
      .addCase(ADD_INCOMPLETE, (state, action) => {
        state.incompletedTasks.push(action.payload);
      })
      .addCase(REMOVE_INCOMPLETE, (state, action) => {
        // action.payload is the index of the element being removed
        state.incompletedTasks.splice(action.index, 1);
      })
      .addCase(DELETEALL_SUCCESS, (state) => {
        state.incompletedTasks = [];
      })
      .addDefaultCase((state) => state);
  }
);
