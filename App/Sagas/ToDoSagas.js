import {call, put} from 'redux-saga/effects';
import ToDoActions from '../Redux/ToDoRedux';
import moment from 'moment';

export function* sagaSaveTodo(api, {data}) {
  const getCurrentTime = yield call(api.getCurrentTime, data);

  if (getCurrentTime.ok) {
    const result = {
      ...data,
      date: moment(getCurrentTime.data.datetime).format('DD-MMM-YYYY'),
      time: moment(getCurrentTime.data.datetime).format('HH:mm'),
      id: Math.random(),
    };
    yield put(ToDoActions.saveTodoSuccess(result));
  } else {
    yield put(ToDoActions.saveTodoFailure());
  }
}

export function* sagaEditTodo(api, {data}) {
  const getCurrentTime = yield call(api.getCurrentTime, data);

  if (getCurrentTime.ok) {
    const result = {
      ...data,
      date: moment(getCurrentTime.data.datetime).format('DD-MMM-YYYY'),
      time: moment(getCurrentTime.data.datetime).format('HH:mm'),
      old_id: data.id,
      id: Math.random(),
    };
    console.tron.log('Reuslt', result);
    yield put(ToDoActions.editTodoSuccess(result));
  } else {
    yield put(ToDoActions.editTodoFailure());
  }
}
