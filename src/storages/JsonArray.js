export default {

  getId: () => 'single_file',

  getEntityList: async (gitcms, type, projectId) => {
    const provider = gitcms.getProvider()
    const typeSchema = gitcms.getEntityTypeSchema(type, projectId)
    const path = typeSchema.storage.file
    const data = await provider.getFile(gitcms, projectId, path)
    return data.map((entry, i) => ({ ...entry, id: i + 1 }))
  },

  getEntity: async (gitcms, id, type, projectId) => {
    const provider = gitcms.getProvider()
    const typeSchema = gitcms.getEntityTypeSchema(type, projectId)
    const path = typeSchema.storage.file
    const data = await provider.getFile(gitcms, projectId, path)
    return data[id - 1]
  },

  saveEntity: async (gitcms, entity, extraActions = [], id, type, projectId) => {
    const provider = gitcms.getProvider()
    const typeSchema = gitcms.getEntityTypeSchema(type, projectId)
    const path = typeSchema.storage.file
    const data = await provider.getFile(gitcms, projectId, path)
    data[id - 1] = entity
    const actions = [ ...extraActions, {
      action: 'update',
      file_path: path,
      content: JSON.stringify(data)
    } ]
    return provider.putFiles(gitcms, projectId, actions)
  },

  createEntity: async (gitcms, entity, extraActions = [], type, projectId) => {
    const provider = gitcms.getProvider()
    const typeSchema = gitcms.getEntityTypeSchema(type, projectId)
    const path = typeSchema.storage.file
    const data = await provider.getFile(gitcms, projectId, path)
    data.push(entity)
    const actions = [ ...extraActions, {
      action: 'update',
      file_path: path,
      content: JSON.stringify(data)
    } ]
    await provider.putFiles(gitcms, projectId, actions)
    return { ...entity, id: data.length }
  },

  removeEntity: async (gitcms, id, type, projectId) => {
    const provider = gitcms.getProvider()
    const typeSchema = gitcms.getEntityTypeSchema(type, projectId)
    const path = typeSchema.storage.file
    const data = await provider.getFile(gitcms, projectId, path)
    data.splice(id - 1, 1)
    const actions = [{
      action: 'update',
      file_path: path,
      content: JSON.stringify(data)
    }]
    return provider.putFiles(gitcms, projectId, actions)
  }

}
