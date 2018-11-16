import Config from 'src/gitcms/Config'
import { wrapAction } from 'src/util/autoReducer'

// Action creator wrapper which deals with:
//  - Passing the action creator all the required data
//  - Wrapping the returned action with wrapAction
const action = (name, ...params) => {
  const type = params.length > 1 ? params[0] : undefined
  const func = params[params.length - 1]
  return (dispatch, getState) => {
    const state = getState()
    const { current: project, currentSchema: schema } = state.projects
    const params = {
      provider: Config.getProvider(state.user.userinfo.provider),
      project: project && project.value,
      schema: schema && schema.value
    }
    if (type && params.schema) {
      params.entitySchema = params.schema.entities.find((e) => e.name === type)
      params.storage = Config.getStorage(params.entitySchema.storage.type)
    }
    return dispatch(wrapAction(name, func(params)))
  }
}

export const login = (token, userinfo) => ({
  type: 'login/success',
  payload: { token, userinfo }
})

export const logout = () => ({ type: 'logout' })

export const callback = (providerId, props) => {
  const provider = Config.getProvider(providerId)
  return wrapAction('login', provider.callback(props))
}

export const getProjects = () =>
  action('getProjects', ({ provider }) =>
    provider.getProjects())

export const getProject = (projectId) =>
  action('getProject', ({ provider }) =>
    provider.getProject(projectId))

export const getSchema = (projectId) =>
  action('getSchema', ({ provider }) =>
    provider.getSchema(projectId))

export const abortSchema = () => ({ type: 'getSchema/error' })

export const getEntityList = (entityType) =>
  action('getEntityList', entityType, ({ provider, project, storage, entitySchema }) =>
    storage.getEntityList(provider, project, entitySchema))

export const getEntity = (entityType, id) =>
  action('getEntity', entityType, ({ provider, project, storage, entitySchema }) =>
    storage.getEntity(provider, project, entitySchema, id))

export const saveEntity = (entityType, id, entity, extraFiles) =>
  action('saveEntity', entityType, ({ provider, project, storage, entitySchema }) =>
    storage.saveEntity(provider, project, entitySchema, id, entity, extraFiles))

export const createEntity = (entityType, id, entity, extraFiles) =>
  action('createEntity', entityType, ({ provider, project, storage, entitySchema }) =>
    storage.createEntity(provider, project, entitySchema, id, entity, extraFiles))

export const removeEntity = (entityType, id) =>
  action('removeEntity', entityType, ({ provider, project, storage, entitySchema }) =>
    storage.removeEntity(provider, project, entitySchema, id))
