import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Config from './Config'

const AutoPanelContext = React.createContext({})

// Keep the user info in the state and sync'ed to localStorage
const useUser = (parent) => {
  const [user, setUser] = useState(() => {
    if (!parent.user) {
      // At root AutoPanel, load initial data from localStorage
      return JSON.parse(localStorage.getItem('user'))
    } else {
      return parent.user
    }
  })
  const enhancedSetUser = (value) => {
    localStorage.setItem('user', JSON.stringify(value))
    setUser(value)
  }
  return [user, enhancedSetUser]
}

// Cache for Suspense promises
const usePromiseCache = (parent) => {
  const [cache] = useState(() => parent.cache || new Map())
  const cacheRequest = (key, action) => {
    if (!cache.has(key)) {
      const promise = action().then(
        value => cache.set(key, value),
        err => cache.set(key, err)
      )
      cache.set(key, promise)
    }
    const value = cache.get(key)
    if (value instanceof Promise) throw value
    if (value instanceof Error) throw value
    return value
  }
  return [cache, cacheRequest]
}

export const WithAutoPanel = ({ project, type, id, children }) => {
  const parent = useContext(AutoPanelContext)
  const [user, setUser] = useUser(parent)
  const [cache, cacheRequest] = usePromiseCache(parent)

  // Mix the data from props with parent data, if any
  const data = Object.assign({}, parent.data,
    project && { project },
    type && { type },
    id && { id }
  )

  // API methods
  const api = {
    optional: (f, fallback) => {
      try {
        return f()
      } catch (e) {
        if (e instanceof Promise) throw e
        return fallback
      }
    },
    callback: (providerId, props) => {
      const provider = Config.getProvider(providerId)
      return provider.callback(api, props)
    },
    login: (token, userinfo) => { setUser({ token, userinfo }) },
    logout: () => { setUser({}) },
    getToken: () => user.token,
    getUser: () => user.userinfo,
    getProvider: () => Config.getProvider(user.userinfo.provider),
    getProjects: () => {
      const provider = api.getProvider()
      return cacheRequest('projects', () => provider.getProjects(api))
    },
    getProjectId: () => data.project,
    getProject: (projectId = data.project) => {
      const provider = api.getProvider()
      return cacheRequest('project#' + projectId,
        () => provider.getProject(api, projectId))
    },
    getSchema: (projectId = data.project) => {
      const provider = api.getProvider()
      return cacheRequest('schema#' + projectId,
        () => provider.getSchema(api, projectId))
    },
    getEntityType: () => data.type,
    getEntityTypeSchema: (type = data.type, projectId = data.project) => {
      const schema = api.getSchema(projectId)
      const ret = schema.entities.find((t) => t.name === type)
      if (!ret) throw new Error('Type not found: ' + type)
      return ret
    },
    getEntities: (type = data.type, projectId = data.project) => {
      const typeSchema = api.getEntityTypeSchema(type, projectId)
      const storage = Config.getStorage(typeSchema.storage.type)
      return cacheRequest('entities#' + projectId + '#' + type,
        () => storage.getEntityList(api, type, projectId))
    },
    getEntityId: () => data.id,
    getEntity: (id = data.id, type = data.type, projectId = data.project) => {
      const typeSchema = api.getEntityTypeSchema(type, projectId)
      const storage = Config.getStorage(typeSchema.storage.type)
      return cacheRequest('entities#' + projectId + '#' + type + '#' + id,
        () => storage.getEntity(api, id, type, projectId))
    },
    saveEntity: (entity, extraFiles, id = data.id, type = data.type, projectId = data.project) => {
      const typeSchema = api.getEntityTypeSchema(type, projectId)
      const storage = Config.getStorage(typeSchema.storage.type)
      return storage.saveEntity(api, entity, extraFiles, id, type, projectId)
    },
    createEntity: (entity, extraFiles, id = data.id, type = data.type, projectId = data.project) => {
      const typeSchema = api.getEntityTypeSchema(type, projectId)
      const storage = Config.getStorage(typeSchema.storage.type)
      return storage.createEntity(api, entity, extraFiles, type, projectId)
    },
    removeEntity: (id = data.id, type = data.type, projectId = data.project) => {
      const typeSchema = api.getEntityTypeSchema(type, projectId)
      const storage = Config.getStorage(typeSchema.storage.type)
      return storage.removeEntity(api, id, type, projectId)
    }
  }

  // Render
  return (
    <AutoPanelContext.Provider value={{ user, cache, data, api }}>
      {children}
    </AutoPanelContext.Provider>
  )
}

WithAutoPanel.propTypes = {
  project: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.any
}

export const useAutoPanel = () => useContext(AutoPanelContext).api
