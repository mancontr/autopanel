const demoProject = {
  id: 'demo-project',
  name: 'Demo Project',
  fullname: 'Demo Project',
  description: 'A fully-configured project for demonstration purposes.'
}

const badProject = {
  id: 'bad-project',
  name: 'Unconfigured Project',
  fullname: 'Unconfigured Project',
  description: 'A project lacking an schema, thus not usable with gitcms.'
}

class Demo {

  getId = () => 'demo'

  getName = () => 'Anonymous'

  login = () => process.env.APP_URL + '/providers/demo/oauth'

  callback = () => Promise.resolve({
    token: 'fake-token',
    userinfo: {
      name: 'Anonymous',
      provider: this.getId()
    }
  })

  getProjects = () => [ demoProject, badProject ]

  getProject = (projectId) => {
    if (projectId === demoProject.id) return demoProject
    if (projectId === badProject.id) return badProject
    return Promise.reject(Error('404 Project not found'))
  }

  getSchema = (projectId) => {
    if (projectId === demoProject.id) {
      return Promise.resolve({
        entities: [
          { name: 'post', label: 'Post' },
          { name: 'page', label: 'Page' }
        ]
      })
    }
    return Promise.reject(Error('404 File not found'))
  }

}

export default Demo
