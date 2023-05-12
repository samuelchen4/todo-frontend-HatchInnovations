import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  completeToIncomplete,
  incompleteToComplete,
  updateCompletedTaskName,
  updateIncompletedTaskName,
} from '../actions/taskActions';

const Task = ({ info }) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(info.completed);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [newName, setNewName] = useState(info.name);

  // switch between completed and incompleted trigger request to api
  const toggleChecked = () => {
    const newChecked = !isChecked;
    const updateObj = { ...info, completed: newChecked };
    if (newChecked === true) {
      dispatch(incompleteToComplete(updateObj));
    } else {
      dispatch(completeToIncomplete(updateObj));
    }
    setIsChecked(newChecked);
  };

  // update task name trigger request to api
  const updateTaskHandler = () => {
    const updatedTask = { ...info, name: newName, completed: isChecked };
    if (isChecked) {
      dispatch(updateCompletedTaskName(updatedTask));
    } else {
      dispatch(updateIncompletedTaskName(updatedTask));
    }
    setIsInputOpen(false);
  };

  return (
    <div
      className='flex items-center py-0.5'
      onDoubleClick={() => setIsInputOpen(true)}
    >
      <input
        name='completed'
        type='checkbox'
        checked={isChecked}
        onChange={toggleChecked}
        className='w-5 h-5 mr-6'
      />
      {isInputOpen ? (
        <input
          type='text'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={updateTaskHandler}
          className='box-border px-2 border-2 border-black rounded-md'
        />
      ) : (
        <h3>{info.name}</h3>
      )}
    </div>
  );
};

export default Task;
