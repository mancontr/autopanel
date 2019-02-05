const generateFetchOpts = (entity, attachments) => {
  const files = attachments && attachments.filter((a) => a.type === 'file')
  if (files && files.length) {
    const body = new FormData()
    body.append('entity', JSON.stringify(entity))
    files.forEach((file) => body.append(file.field, file.file))
    return {
      body,
      headers: {}
    }
  } else {
    return {
      body: JSON.stringify(entity),
      headers: { 'Content-Type': 'application/json' }
    }
  }
}

export default {

  getId: () => 'rest',

  getEntityList: async (autopanel, type, projectId) => {
    const typeSchema = autopanel.getEntityTypeSchema(type, projectId)
    const path = typeSchema.storage.path
    const headers = { 'Authorization': autopanel.getToken() }
    const res = await fetch(path, { headers })
    const ret = res.json()
    return ret
  },

  getEntity: async (autopanel, id, type, projectId) => {
    if (id) {
      const typeSchema = autopanel.getEntityTypeSchema(type, projectId)
      const path = typeSchema.storage.path
      const headers = { 'Authorization': autopanel.getToken() }
      const res = await fetch(path + '/' + id, { headers })
      const ret = res.json()
      return ret
    }
  },

  saveEntity: async (autopanel, entity, attachments, id, type, projectId) => {
    const typeSchema = autopanel.getEntityTypeSchema(type, projectId)
    const path = typeSchema.storage.path
    const opts = generateFetchOpts(entity, attachments)
    opts.method = 'PUT'
    opts.headers['Authorization'] = autopanel.getToken()
    const res = await fetch(path + '/' + id, opts)
    const ret = res.json()
    return ret
  },

  createEntity: async (autopanel, entity, attachments, type, projectId) => {
    const typeSchema = autopanel.getEntityTypeSchema(type, projectId)
    const path = typeSchema.storage.path
    const opts = generateFetchOpts(entity, attachments)
    opts.method = 'POST'
    opts.headers['Authorization'] = autopanel.getToken()
    const res = await fetch(path, opts)
    const ret = res.json()
    return ret
  },

  removeEntity: async (autopanel, id, type, projectId) => {
    const typeSchema = autopanel.getEntityTypeSchema(type, projectId)
    const path = typeSchema.storage.path

    return fetch(path + '/' + id, {
      headers: { 'Authorization': autopanel.getToken() },
      method: 'DELETE'
    })
  }

}
