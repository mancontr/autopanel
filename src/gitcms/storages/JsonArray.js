export default {

  getId: () => 'single_file',

  getEntityList: async (provider, project, entitySchema) => {
    const path = entitySchema.storage.file
    const data = await provider.getFile(project.id, path)
    return data
  }

}
