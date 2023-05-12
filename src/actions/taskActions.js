import axios from 'axios';
import {
  GET_ALLINCOMPLETED_SUCCESS,
  GET_ALLINCOMPLETED_REQUEST,
  GET_ALLCOMPLETED_FAIL,
  GET_ALLCOMPLETED_REQUEST,
  GET_ALLCOMPLETED_SUCCESS,
  GET_ALLINCOMPLETED_FAIL,
  ADD_COMPLETE,
  REMOVE_INCOMPLETE,
  ADD_INCOMPLETE,
  REMOVE_COMPLETE,
  DELETEALL_SUCCESS,
  POST_INCOMPLETED_REQUEST,
  POST_INCOMPLETED_FAIL,
  UPDATE_COMPLETE_FAIL,
  UPDATE_COMPLETE_SUCCESS,
  UPDATE_COMPLETE_REQUEST,
  UPDATE_INCOMPLETE_REQUEST,
  UPDATE_INCOMPLETE_FAIL,
  UPDATE_INCOMPLETE_SUCCESS,
  POST_INCOMPLETED_SUCCESS,
} from '../constants/taskConstants';

//get incomplete tasks
export const getIncompletedTasks = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALLINCOMPLETED_REQUEST });

    const { data } = await axios.get('/api/tasks/incompleted');
    dispatch({ type: GET_ALLINCOMPLETED_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: GET_ALLINCOMPLETED_FAIL,
      payload: err.response.data.message,
    });
  }
};

// get completed tasks
export const getcompletedTasks = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALLCOMPLETED_REQUEST });

    const { data } = await axios.get('/api/tasks/completed');
    dispatch({ type: GET_ALLCOMPLETED_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: GET_ALLCOMPLETED_FAIL,
      payload: err.response.data.message,
    });
  }
};

// patch a task to be completed
// export const updateCompleted = (taskObj) => async (dispatch, getState) => {
//   try {
//     const index = getState().incompletedTasks.incompletedTasks.findIndex(
//       (task) => task._id === taskObj._id
//     );

//     console.log(index);

//     // dispatch two actions
//     dispatch({ type: REMOVE_INCOMPLETE, index });

//     const { data } = await axios.put(`/api/tasks/update/${taskObj._id}`, {
//       ...taskObj,
//       completed: true,
//     });
//     dispatch({ type: ADD_COMPLETE, payload: data });
//   } catch (err) {
//     console.log(err);
//   }
// };

// patch a task to be incomplete
// export const updateIncomplete = (taskObj) => async (dispatch, getState) => {
//   try {
//     const index = getState().completedTasks.completedTasks.findIndex(
//       (task) => task._id === taskObj._id
//     );
//     // dispatch two actions
//     dispatch({ type: REMOVE_COMPLETE, index });

//     const { data } = await axios.put(`/api/tasks/update/${taskObj._id}`, {
//       ...taskObj,
//       completed: false,
//     });

//     dispatch({ type: ADD_INCOMPLETE, payload: data });
//   } catch (err) {
//     console.log(err);
//   }
// };

// removes from imcomplete state, call api to change to completed
// export const removeIncomplete = (taskObj) => async (dispatch, getState) => {
//   try {
//     const index = getState().incompletedTasks.incompletedTasks.findIndex(
//       (task) => task._id === taskObj._id
//     );
//     // dispatch two actions
//     dispatch({ type: REMOVE_COMPLETE, index });

//     const { data } = await axios.put(`/api/tasks/update/${taskObj._id}`, {
//       ...taskObj,
//       completed: false,
//     });

//     dispatch({ type: ADD_INCOMPLETE, payload: data });
//   } catch (err) {
//     console.log(err);
//   }
// };

// incomplete -> completed task
// put request to api
export const incompleteToComplete = (taskObj) => async (dispatch, getState) => {
  try {
    const index = getState().incompletedTasks.incompletedTasks.findIndex(
      (task) => task._id === taskObj._id
    );

    const { data } = await axios.put(
      `/api/tasks/update/${taskObj._id}`,
      taskObj
    );
    // dispatch two actions
    dispatch({ type: REMOVE_INCOMPLETE, index });
    dispatch({ type: ADD_COMPLETE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

// completed -> incompleted task
// put request to api
export const completeToIncomplete = (taskObj) => async (dispatch, getState) => {
  try {
    const index = getState().completedTasks.completedTasks.findIndex(
      (task) => task._id === taskObj._id
    );

    const { data } = await axios.put(
      `/api/tasks/update/${taskObj._id}`,
      taskObj
    );
    // dispatch two actions
    dispatch({ type: REMOVE_COMPLETE, index });
    dispatch({ type: ADD_INCOMPLETE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

// update the task name for completed list
export const updateCompletedTaskName =
  (taskObj) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_COMPLETE_REQUEST });
      const index = getState().completedTasks.completedTasks.findIndex(
        (task) => task._id === taskObj._id
      );
      const { data } = await axios.put(
        `/api/tasks/update/${taskObj._id}`,
        taskObj
      );
      dispatch({ type: UPDATE_COMPLETE_SUCCESS, payload: data, index });
    } catch (err) {
      console.log(err);
      dispatch({ type: UPDATE_COMPLETE_FAIL, payload: err.message });
    }
  };

// update the task name for incompleted list
export const updateIncompletedTaskName =
  (taskObj) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_INCOMPLETE_REQUEST });
      const index = getState().incompletedTasks.incompletedTasks.findIndex(
        (task) => task._id === taskObj._id
      );
      const { data } = await axios.put(
        `/api/tasks/update/${taskObj._id}`,
        taskObj
      );
      dispatch({ type: UPDATE_INCOMPLETE_SUCCESS, payload: data, index });
    } catch (err) {
      console.log(err);
      dispatch({ type: UPDATE_INCOMPLETE_FAIL, payload: err.message });
    }
  };

// update the task name, use the same API controller
// export const updateTaskName = (taskObj) => async (dispatch, getState) => {
//   try {
//     const completed = taskObj.completed; // boolean
//     let index;

//     if (completed) {
//       dispatch({ type: UPDATE_COMPLETE_REQUEST });
//       index = getState().completedTasks.completedTasks.findIndex(
//         (task) => task._id === taskObj._id
//       );
//     } else {
//       dispatch({ type: UPDATE_INCOMPLETE_REQUEST });
//       index = getState().incompletedTasks.incompletedTasks.findIndex(
//         (task) => task._id === taskObj._id
//       );
//     }

//     const { data } = await axios.put(
//       `/api/tasks/update/${taskObj._id}`,
//       taskObj
//     );

//     if (completed) {
//     } else {
//       dispatch({ type: UPDATE_INCOMPLETE_SUCCESS, payload: data, index });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// delete all tasks
export const deleteAllTasks = () => async (dispatch) => {
  try {
    await axios.delete('/api/tasks/delete');
    dispatch({ type: DELETEALL_SUCCESS });
  } catch (err) {
    console.log(err);
  }
};

// post new task
export const postTask = (taskObj) => async (dispatch) => {
  try {
    dispatch({ type: POST_INCOMPLETED_REQUEST });
    // taskObj has to be an object
    const { data } = await axios.post('/api/tasks/post', taskObj);
    // reuse previous action type
    dispatch({ type: POST_INCOMPLETED_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: POST_INCOMPLETED_FAIL, payload: err.message });
  }
};
