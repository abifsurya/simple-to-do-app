import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {
  sortObjectByDateAscending,
  sortObjectByDateDescending,
  sortObjectByStringAscending,
  sortObjectByStringDescending,
} from '../Lib/utils';

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

  sortList: ['sortValue'],
  filterList: ['filterValue'],

  clearApiStatus: [],
});

export const ToDoTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  todoList: [],
  savedList: [],
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
  selectSavedList: (state) => state.todo.savedList,
  selectCategoryList: (state) => state.todo.categoryList,
  selectFetching: (state) => state.todo.fetching,
  selectApiStatus: (state) => state.todo.apiStatus,
};

/* ------------- Reducers ------------- */

export const saveTodoRequest = (state, {data}) =>
  state.merge({fetching: true, error: false});
export const saveTodoSuccess = (state, {payload}) => {
  const todoList = state.savedList;
  return state.merge({
    fetching: false,
    todoList: [...todoList, payload],
    savedList: [...todoList, payload],
    apiStatus: {type: 'saveForm'},
  });
};
export const saveTodoFailure = (state, {error}) =>
  state.merge({fetching: false, apiStatus: {type: 'error'}});

export const editTodoRequest = (state, {data}) =>
  state.merge({fetching: true, error: false});
export const editTodoSuccess = (state, {payload}) => {
  const todoList = state.savedList;
  const newTodoList = todoList.filter((row) => row.id !== payload.old_id);
  return state.merge({
    fetching: false,
    todoList: [...newTodoList, payload],
    savedList: [...newTodoList, payload],
    apiStatus: {type: 'editForm'},
  });
};
export const editTodoFailure = (state, {error}) =>
  state.merge({fetching: false, apiStatus: {type: 'error'}});

export const deleteTodoRequest = (state, {id}) => {
  const todoList = state.savedList;
  const newTodoList = todoList.filter((row) => row.id !== id);
  return state.merge({
    fetching: false,
    todoList: newTodoList,
    savedList: newTodoList,
    apiStatus: {type: 'deleteList'},
  });
};

export const completeTodoRequest = (state, {id}) => {
  const todoList = state.savedList;
  const deleteDetail = todoList.filter((row) => row.id !== id);
  const todoDetail = todoList.filter((row) => row.id === id);

  return state.merge({
    fetching: false,
    todoList: [...deleteDetail, {...todoDetail[0], completed: true}],
    savedList: [...deleteDetail, {...todoDetail[0], completed: true}],
    apiStatus: {type: 'deleteList'},
  });
};

export const reducerSortList = (state, {sortValue}) => {
  const savedList = Immutable.asMutable(state.savedList);

  let newTransactionlist = [];
  switch (sortValue) {
    case 0:
      newTransactionlist = savedList;
      break;
    case 1:
      newTransactionlist = sortObjectByStringAscending(savedList, 'title');
      break;
    case 2:
      newTransactionlist = sortObjectByStringDescending(savedList, 'title');
      break;
    case 3:
      newTransactionlist = sortObjectByDateAscending(savedList, 'date');
      break;
    case 4:
      newTransactionlist = sortObjectByDateDescending(savedList, 'date');
      break;
    default:
      newTransactionlist = savedList;
      break;
  }

  return state.merge({
    todoList: newTransactionlist,
  });
};

export const reducerFilterList = (state, {filterValue}) => {
  const savedList = Immutable.asMutable(state.savedList);

  const filteredList = savedList.filter(({category = ''}) =>
    category.toLowerCase().includes(filterValue.toLowerCase()),
  );

  return state.merge({
    todoList: filteredList,
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

  [Types.SORT_LIST]: reducerSortList,
  [Types.FILTER_LIST]: reducerFilterList,

  [Types.CLEAR_API_STATUS]: clearApiStatus,
});
