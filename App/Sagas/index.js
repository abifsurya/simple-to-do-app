import {takeLatest, all} from 'redux-saga/effects';
import API from '../Services/Api';
import FixtureAPI from '../Services/FixtureApi';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import {ToDoTypes} from '../Redux/ToDoRedux';

/* ------------- Sagas ------------- */
import {sagaSaveTodo, sagaEditTodo} from './ToDoSagas';

/* ------------- API ------------- */
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    takeLatest(ToDoTypes.SAVE_TODO_REQUEST, sagaSaveTodo, api),
    takeLatest(ToDoTypes.EDIT_TODO_REQUEST, sagaEditTodo, api),
  ]);
}
