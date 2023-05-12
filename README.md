# Todo Front-End HatchInnovations

Front-End interface for Todo application. Created with React, Redux, and Tailwind.

## Setup Instructions

1. Clone repo on local machine by typing: git clone https://github.com/samuelchen4/todo-frontend-HatchInnovations.git
2. Install all dependencies by typing: npm install
3. Run application by typing: npm start

## Features

### Global State Management

The completed and incompleted task lists are managed in a global store using Redux. This improves scalability and reduces the amount of request made to the server. This architecture also allows pagination to be setup in the future.

### Limit 10 Completed Tasks

If there are 10 completed tasks, adding an additional task will remove a task from the end of the queue, ensuring that the front-end only displays the most recent 10 completed tasks. If there are more than 10 completed tasks, the server will limit the query to the most recently edited 10 results.

### Update Task Names

Task names can be edited by **double-clicking** a task. To finalize changes to a task, click out of the text-box. List will automatically sort when name changes are made.

### Reuseable Components

Created reuseable components like Loader and Task to improve efficiency, consistency, and ease of maintenance. A loader animation is triggered whenever calls are made to API. This is done by using a global state variable when A HTTP request is made. The Task component is used for completed and incompleted tasks.

### Alphebetically Sorted

Created sorting method can alphebetically sorts each list whenever there are changes on either list.

### Clear All With Prompt

Clicking "Delete all tasks" will prompt the user to input "yes" to delete all completed and incompleted tasks. This can be done on the server as well by running the command: npm run data-destory in the api terminal.

### Searching

Typing a string in the search box will filter both lists without making calls to the server. This is done by ultilizing the global store and creating local state variables for each list.

### Adding New Task

Typing a task name and clicking the submit button will post a new task in the "To Do" list. The button is disabled when there is an empty string in the text box.
