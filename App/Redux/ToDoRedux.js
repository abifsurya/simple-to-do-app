import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  saveTodoRequest: ['data'],
  saveTodoSuccess: ['payload'],
  saveTodoFailure: ['error'],

  editTodoRequest: ['data'],
  editTodoSuccess: ['payload'],
  editTodoFailure: ['error'],

  deleteTodoRequest: ['id'],

  completeTodoRequest: ['id'],

  clearApiStatus: [],
});

export const ToDoTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  todoList: [],
  categoryList: [
    {label: 'Personal', value: 'Personal'},
    {label: 'Work', value: 'Work'},
    {label: 'School', value: 'School'},
  ],
  fetching: false,
  error: false,
  apiStatus: {},
});

/* ------------- Selectors ------------- */

export const ToDoSelectors = {
  selectTodoList: (state) => state.todo.todoList,
  selectCategoryList: (state) => state.todo.categoryList,
  selectFetching: (state) => state.todo.fetching,
  selectApiStatus: (state) => state.todo.apiStatus,
};

/* ------------- Reducers ------------- */

export const saveTodoRequest = (state, {data}) =>
  state.merge({fetching: true, error: false});
export const saveTodoSuccess = (state, {payload}) => {
  const todoList = state.todoList;
  return state.merge({
    fetching: false,
    todoList: [...todoList, payload],
    apiStatus: {type: 'saveForm'},
  });
};
export const saveTodoFailure = (state, {error}) =>
  state.merge({fetching: false, apiStatus: {type: 'error'}});

export const editTodoRequest = (state, {data}) =>
  state.merge({fetching: true, error: false});
export const editTodoSuccess = (state, {payload}) => {
  const todoList = state.todoList;
  const newTodoList = todoList.filter((row) => row.id !== payload.old_id);
  console.tron.log('New', newTodoList);
  return state.merge({
    fetching: false,
    todoList: [...newTodoList, payload],
    apiStatus: {type: 'editForm'},
  });
};
export const editTodoFailure = (state, {error}) =>
  state.merge({fetching: false, apiStatus: {type: 'error'}});

export const deleteTodoRequest = (state, {id}) => {
  const todoList = state.todoList;
  const newTodoList = todoList.filter((row) => row.id !== id);
  return state.merge({
    fetching: false,
    todoList: newTodoList,
    apiStatus: {type: 'deleteList'},
  });
};

export const completeTodoRequest = (state, {id}) => {
  const todoList = state.todoList;
  const deleteDetail = todoList.filter((row) => row.id !== id);
  const todoDetail = todoList.filter((row) => row.id === id);

  return state.merge({
    fetching: false,
    todoList: [...deleteDetail, {...todoDetail[0], completed: true}],
    apiStatus: {type: 'deleteList'},
  });
};

export const clearApiStatus = (state) => state.merge({apiStatus: {}});
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_TODO_REQUEST]: saveTodoRequest,
  [Types.SAVE_TODO_SUCCESS]: saveTodoSuccess,
  [Types.SAVE_TODO_FAILURE]: saveTodoFailure,

  [Types.EDIT_TODO_REQUEST]: editTodoRequest,
  [Types.EDIT_TODO_SUCCESS]: editTodoSuccess,
  [Types.EDIT_TODO_FAILURE]: editTodoFailure,

  [Types.DELETE_TODO_REQUEST]: deleteTodoRequest,

  [Types.COMPLETE_TODO_REQUEST]: completeTodoRequest,

  [Types.CLEAR_API_STATUS]: clearApiStatus,
});
