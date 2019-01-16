export default {

  getId: () => 'single_file',

  getEntityList: async (autopanel, type, projectId) => {
    const provider = autopanel.getProvider()
    const typeSchema = autopanel.getEntityTypeSchema(type, projectId)
    const path = typeSchema.storage.file
    const data = await provider.getFile(autopanel, projectId, path)
    return data.map((entry, i) => ({ ...entry, id: i + 1 }))
  },

  getEntity: async (autopanel, id, type, projectId) => {
    const provider = autopanel.getProvider()
    const typeSchema = autopanel.getEntityTypeSchema(type, projectId)
    const path = typeSchema.storage.file
    const data = await provider.getFile(autopanel, projectId, path)
    return data[id - 1]
  },

  saveEntity: async (autopanel, entity, attachments, id, type, projectId) => {
    const provider = autopanel.getProvider()
    const typeSchema = autopanel.getEntityTypeSchema(type, projectId)
    const path = typeSchema.storage.file
    const data = await provider.getFile(autopanel, projectId, path)
    data[id - 1] = entity
    const actions = [{
      action: 'update',
      file_path: path,
      content: JSON.stringify(data)
    }]
    return provider.putFiles(autopanel, projectId, actions)
  },

  createEntity: async (autopanel, entity, attachments, type, projectId) => {
    const provider = autopanel.getProvider()
    const typeSchema = autopanel.getEntityTypeSchema(type, projectId)
    const path = typeSchema.storage.file
    const data = await provider.getFile(autopanel, projectId, path)
    data.push(entity)
    const actions = [{
      action: 'update',
      file_path: path,
      content: JSON.stringify(data)
    }]
    await provider.putFiles(autopanel, projectId, actions)
    return { ...entity, id: data.length }
  },

  removeEntity: async (autopanel, id, type, projectId) => {
    const provider = autopanel.getProvider()
    const typeSchema = autopanel.getEntityTypeSchema(type, projectId)
    const path = typeSchema.storage.file
    const data = await provider.getFile(autopanel, projectId, path)
    data.splice(id - 1, 1)
    const actions = [{
      action: 'update',
      file_path: path,
      content: JSON.stringify(data)
    }]
    return provider.putFiles(autopanel, projectId, actions)
  }

}
