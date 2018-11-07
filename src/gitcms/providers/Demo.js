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
      const fields = [
        {
          'type': 'text',
          'name': 'title',
          'label': 'Title',
          'placeholder': 'Title...'
        }, {
          'type': 'text',
          'name': 'content',
          'label': 'Content'
        }, {
          'type': 'date',
          'name': 'date',
          'label': 'Date'
        }
      ]
      return Promise.resolve({
        entities: [
          {
            name: 'post',
            label: 'Post',
            description: 'Each publication on the blog.',
            storage: { type: 'single_file', file: '/posts.json' },
            fields
          }, {
            name: 'page',
            label: 'Page',
            description: 'Static pages or sections.',
            storage: { type: 'single_file', file: '/pages.json' },
            fields
          }
        ]
      })
    }
    return Promise.reject(Error('404 File not found'))
  }

  getFile = (projectId, path) => {
    return Promise.resolve([
      {
        title: 'Demo Post',
        content: 'This is some <b>text</b>.',
        date: 1541449329000
      }, {
        title: 'Another post',
        content: 'Moar <b>text</b>.',
        date: 1521999029000
      }, {
        title: 'Last post',
        content: 'Yay!',
        date: 1532473568000
      }
    ])
  }

}

export default Demo
