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
  }

}
