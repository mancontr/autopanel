export default {

  getId: () => 'single_file',

  getEntityList: async (provider, project, entitySchema) => {
    const path = entitySchema.storage.file
    const data = await provider.getFile(project.id, path)
    return data.map((entry, i) => ({ ...entry, id: i + 1 }))
  },

  getEntity: async (provider, project, entitySchema, id) => {
    const path = entitySchema.storage.file
    const data = await provider.getFile(project.id, path)
    return data[id - 1]
  },

  saveEntity: async (provider, project, entitySchema, id, entity, extraActions = []) => {
    const path = entitySchema.storage.file
    const data = await provider.getFile(project.id, path)
    data[id - 1] = entity
    const actions = [ ...extraActions, {
      action: 'update',
      file_path: path,
      content: JSON.stringify(data)
    } ]
    return provider.putFiles(project.id, actions)
  },

  createEntity: async (provider, project, entitySchema, entity, extraActions = []) => {
    const path = entitySchema.storage.file
    const data = await provider.getFile(project.id, path)
    data.push(entity)
    const actions = [ ...extraActions, {
      action: 'update',
      file_path: path,
      content: JSON.stringify(data)
    } ]
    await provider.putFiles(project.id, actions)
    return { ...entity, id: data.length }
  },

  removeEntity: async (provider, project, entitySchema, id) => {
    const path = entitySchema.storage.file
    const data = await provider.getFile(project.id, path)
    data.splice(id - 1, 1)
    const actions = [{
      action: 'update',
      file_path: path,
      content: JSON.stringify(data)
    }]
    return provider.putFiles(project.id, actions)
  }

}
