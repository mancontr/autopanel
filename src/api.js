import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Config from './Config'

const AutoPanelContext = React.createContext({})

// Keep the user info in the state and sync'ed to localStorage
const useUser = (parent) => {
  const [user, setUser] = useState(() => {
    if (!parent.user) {
      // At root AutoPanel, load initial data from localStorage
      return JSON.parse(localStorage.getItem('user')) || {}
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
const usePromiseCache = () => {
  const [cache] = useState(() => new Map())
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

export const WithAutoPanel = ({ project, type, id, settings, children }) => {
  const parent = useContext(AutoPanelContext)
  const [user, setUser] = useUser(parent)
  const [cache, cacheRequest] = usePromiseCache()

  // Shorthands
  const pdata = parent.data
  const papi = parent.api

  // Mix the data from props with parent data, if any
  const data = Object.assign({}, pdata,
    project && { project },
    type && { type },
    id && { id },
    settings && { settings }
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
    getSettings: () => data.settings,
    go: (url) => data.settings.navigate((data.settings.prefix || '') + url),
    getToken: () => user.token,
    getUser: () => user.userinfo,
    getProvider: () => Config.getProvider(user.userinfo.provider),
    getProjects: () => {
      if (papi) return papi.getProjects()
      const provider = api.getProvider()
      return cacheRequest('projects', () => provider.getProjects(api))
    },
    getProjectId: () => data.project,
    getProject: (projectId = data.project) => {
      if (papi && pdata.project) return papi.getProject(projectId)
      const provider = api.getProvider()
      return cacheRequest('project#' + projectId,
        () => provider.getProject(api, projectId))
    },
    getSchema: (projectId = data.project) => {
      if (papi && pdata.project) return papi.getSchema(projectId)
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
      if (papi && pdata.type) return papi.getEntities(type, projectId)
      const typeSchema = api.getEntityTypeSchema(type, projectId)
      const storage = Config.getStorage(typeSchema.storage.type)
      return cacheRequest('entities#' + projectId + '#' + type,
        () => storage.getEntityList(api, type, projectId))
    },
    getEntityId: () => data.id,
    getEntity: (id = data.id, type = data.type, projectId = data.project) => {
      if (papi && pdata.id) return papi.getEntity(id, type, projectId)
      const typeSchema = api.getEntityTypeSchema(type, projectId)
      const storage = Config.getStorage(typeSchema.storage.type)
      return cacheRequest('entities#' + projectId + '#' + type + '#' + id,
        () => storage.getEntity(api, id, type, projectId))
    },
    saveEntity: (entity, attachments, id = data.id, type = data.type, projectId = data.project) => {
      const typeSchema = api.getEntityTypeSchema(type, projectId)
      const storage = Config.getStorage(typeSchema.storage.type)
      return storage.saveEntity(api, entity, attachments, id, type, projectId)
    },
    createEntity: (entity, attachments, id = data.id, type = data.type, projectId = data.project) => {
      const typeSchema = api.getEntityTypeSchema(type, projectId)
      const storage = Config.getStorage(typeSchema.storage.type)
      return storage.createEntity(api, entity, attachments, type, projectId)
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
  settings: PropTypes.object,
  project: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.any
}

export const useAutoPanel = () => useContext(AutoPanelContext).api
