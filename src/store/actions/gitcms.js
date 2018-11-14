import Config from 'src/gitcms/Config'
import { wrapAction } from 'src/util/autoReducer'

export const login = (token, userinfo) => ({
  type: 'login/success',
  payload: { token, userinfo }
})

export const logout = () => ({ type: 'logout' })

export const callback = (providerId, props) => {
  const provider = Config.getProvider(providerId)
  return wrapAction('login', provider.callback(props))
}

export const getProjects = () => (dispatch, getState) => {
  const state = getState()
  const provider = Config.getProvider(state.user.userinfo.provider)
  return dispatch(wrapAction('getProjects', provider.getProjects()))
}

export const getProject = (projectId) => (dispatch, getState) => {
  const state = getState()
  const provider = Config.getProvider(state.user.userinfo.provider)
  return dispatch(wrapAction('getProject', provider.getProject(projectId)))
}

export const getSchema = (projectId) => (dispatch, getState) => {
  const state = getState()
  const provider = Config.getProvider(state.user.userinfo.provider)
  return dispatch(wrapAction('getSchema', provider.getSchema(projectId)))
}

export const abortSchema = () => ({ type: 'getSchema/error' })

export const getEntityList = (entityType) => (dispatch, getState) => {
  const state = getState()
  const provider = Config.getProvider(state.user.userinfo.provider)
  const project = state.projects.current.value
  const schema = state.projects.currentSchema.value
  const entitySchema = schema.entities.find((e) => e.name === entityType)
  const storage = Config.getStorage(entitySchema.storage.type)
  return dispatch(wrapAction('getEntityList',
    storage.getEntityList(provider, project, entitySchema)))
}

export const getEntity = (entityType, id) => (dispatch, getState) => {
  const state = getState()
  const provider = Config.getProvider(state.user.userinfo.provider)
  const project = state.projects.current.value
  const schema = state.projects.currentSchema.value
  const entitySchema = schema.entities.find((e) => e.name === entityType)
  const storage = Config.getStorage(entitySchema.storage.type)
  return dispatch(wrapAction('getEntity',
    storage.getEntity(provider, project, entitySchema, id)))
}
