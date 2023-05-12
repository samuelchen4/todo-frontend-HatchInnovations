import { createReducer } from '@reduxjs/toolkit';
import {
  GET_ALLCOMPLETED_REQUEST,
  GET_ALLCOMPLETED_SUCCESS,
  GET_ALLCOMPLETED_FAIL,
  ADD_COMPLETE,
  REMOVE_COMPLETE,
  DELETEALL_SUCCESS,
  UPDATE_COMPLETE_REQUEST,
  UPDATE_COMPLETE_SUCCESS,
  UPDATE_COMPLETE_FAIL,
} from '../constants/taskConstants';

export const completedTasksReducer = createReducer(
  { completedTasks: [] },
  (builder) => {
    builder
      .addCase(GET_ALLCOMPLETED_REQUEST, (state) => {
        state.isLoading = true;
      })
      .addCase(GET_ALLCOMPLETED_SUCCESS, (state, action) => {
        state.isLoading = false;
        state.completedTasks = action.payload;
      })
      .addCase(GET_ALLCOMPLETED_FAIL, (state, action) => {
        state.isLoading = false;
        state.err = action.payload;
      })
      .addCase(UPDATE_COMPLETE_REQUEST, (state) => {
        state.isLoading = true;
      })
      .addCase(UPDATE_COMPLETE_SUCCESS, (state, action) => {
        state.isLoading = false;
        state.completedTasks[action.index] = action.payload;
      })
      .addCase(UPDATE_COMPLETE_FAIL, (state, action) => {
        state.isLoading = false;
        state.err = action.payload;
      })
      .addCase(ADD_COMPLETE, (state, action) => {
        state.completedTasks.unshift(action.payload);
        // add edge case of plus 10
        if (state.completedTasks.length >= 10) state.completedTasks.pop();
      })
      .addCase(REMOVE_COMPLETE, (state, action) => {
        // action.payload is the index of the element being removed
        state.completedTasks.splice(action.index, 1);
      })
      .addCase(DELETEALL_SUCCESS, (state) => {
        state.completedTasks = [];
      });
  }
);
