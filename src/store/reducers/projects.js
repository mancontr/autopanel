import { combineReducers } from 'redux'
import autoReducer from 'src/util/autoReducer'

export default combineReducers({
  list: autoReducer('getProjects'),
  current: autoReducer('getProject'),
  currentSchema: autoReducer('getSchema'),
  currentEntities: autoReducer('getEntityList')
})
