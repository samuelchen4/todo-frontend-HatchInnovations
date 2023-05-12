import { configureStore } from '@reduxjs/toolkit';
import { completedTasksReducer } from './reducers/completeTasksReducer';
import { incompletedTasksReducer } from './reducers/incompleteTasksReducer';

const store = configureStore({
  reducer: {
    incompletedTasks: incompletedTasksReducer,
    completedTasks: completedTasksReducer,
  },
});

export default store;
