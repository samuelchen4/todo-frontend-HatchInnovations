import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Task from '../components/Task';
import Loader from '../components/Loader';
import {
  deleteAllTasks,
  getcompletedTasks,
  getIncompletedTasks,
  postTask,
} from '../actions/taskActions';

const MainScreen = () => {
  const dispatch = useDispatch();

  const completedTasksState = useSelector((state) => state.completedTasks);
  const { isLoading: isCompletedLoading, completedTasks: completedTasksDB } =
    completedTasksState;

  const incompletedTasksState = useSelector((state) => state.incompletedTasks);
  const {
    isLoading: isIncompletedLoading,
    incompletedTasks: incompletedTasksDB,
  } = incompletedTasksState;

  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompletedTasks, setIncompletedTasks] = useState([]);

  // on component load, get request for tasks
  useEffect(() => {
    dispatch(getIncompletedTasks());
    dispatch(getcompletedTasks());
  }, [dispatch]);

  // set local state for tasks
  useEffect(() => {
    setCompletedTasks(completedTasksDB);
    setIncompletedTasks(incompletedTasksDB);
  }, [
    completedTasksState,
    incompletedTasksState,
    completedTasksDB,
    incompletedTasksDB,
  ]);

  // trigger sorting function for every api call
  useEffect(() => {
    setCompletedTasks(sortList(completedTasksDB));
    setIncompletedTasks(sortList(incompletedTasksDB));
  }, [completedTasksDB, incompletedTasksDB]);

  // filter redux store when search local state changes
  useEffect(() => {
    handleSearch();
  }, [search]);

  // filters redux state based on search
  const handleSearch = () => {
    const newCompleted = completedTasksDB.filter((task) => {
      return task.name.toLowerCase().includes(search.toLowerCase());
    });

    const newIncompleted = incompletedTasksDB.filter((task) => {
      return task.name.toLowerCase().includes(search.toLowerCase());
    });
    setCompletedTasks(newCompleted);
    setIncompletedTasks(newIncompleted);
  };

  // deletes all tasks after prompt
  const deleteAllTasksHandler = () => {
    const input = window.prompt(`Enter Yes to delete all tasks!`) || '';
    if (input.toLowerCase() === 'yes') {
      dispatch(deleteAllTasks());
    }
  };

  // create a new task
  const postTaskHandler = () => {
    // make the taskobj
    const taskObj = { name, completed: false };
    dispatch(postTask(taskObj));
    setName('');
  };

  // sort lists alphabetically
  const sortList = (list) => {
    const sortedList = [...list].sort((a, b) => {
      const nameA = a.name.toUpperCase(); // Convert the name to uppercase for case-insensitive sorting
      const nameB = b.name.toUpperCase(); // Convert the name to uppercase for case-insensitive sorting
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    return sortedList;
  };

  return (
    <div className='h-screen w-screen flex flex-col box-border text-lg bg-[#f7f7f7]'>
      {(isIncompletedLoading || isCompletedLoading) && (
        <Loader
          isLoading={isIncompletedLoading || isCompletedLoading}
          color='#ffffff'
        />
      )}
      <header className='py-6 px-40 flex justify-between mb-40'>
        <h1 className='text-3xl font-bold'>Marvelous v2.0</h1>
        <p>
          <button
            className='text-sm underline font-color-[#0000EE]'
            onClick={deleteAllTasksHandler}
          >
            Delete all tasks
          </button>
        </p>
      </header>
      <section className='px-40 flex justify-between mb-20'>
        <div>
          <input
            type='text'
            className='py-1 px-3 border-2 border-black rounded-md mr-1'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className='py-1 px-4 border-2 border-black rounded-md font-bold bg-sky-100'
            onClick={postTaskHandler}
            disabled={name === '' ? true : false}
          >
            Add
          </button>
        </div>
        <input
          className='py-1 px-3 border-2 border-black rounded-md'
          type='text'
          placeholder='Search..'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </section>
      <main className='px-40 flex justify-between flex-1'>
        <div className='min-w-[30%]'>
          <h2 className='text-2xl font-semibold border-b-2 border-black pb-2'>
            To Do
          </h2>
          <ul className='max-h-[50vh] overflow-y-auto '>
            {incompletedTasks.map((task) => {
              return (
                <li key={task._id}>
                  <Task info={task} />
                </li>
              );
            })}
          </ul>
        </div>
        <div className='min-w-[30%]'>
          <h2 className='text-2xl font-semibold border-b-2 border-black pb-2'>
            Done
          </h2>
          <ul>
            {completedTasks.map((task) => {
              return (
                <li key={task._id}>
                  <Task info={task} />
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default MainScreen;
