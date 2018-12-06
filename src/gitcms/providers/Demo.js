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

const files = {
  '/posts.json': [
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
  ],
  '/authors.json': [
    {
      name: 'William',
      bio: 'Love all, trust a few, do wrong to none.'
    }, {
      name: 'Edgar',
      bio: 'I became insane, with long intervals of horrible sanity.'
    }
  ]
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
          {
            name: 'post',
            label: 'Post',
            description: 'Each publication on the blog.',
            storage: { type: 'single_file', file: '/posts.json' },
            fields: [
              {
                'type': 'text',
                'name': 'title',
                'label': 'Title',
                'placeholder': 'Title...'
              }, {
                'type': 'wysiwyg',
                'name': 'content',
                'label': 'Content'
              }, {
                'type': 'date',
                'name': 'date',
                'label': 'Date',
                'description': 'The publication date of this article.'
              }
            ]
          }, {
            name: 'author',
            label: 'Author',
            description: 'User info of each blog author.',
            storage: { type: 'single_file', file: '/authors.json' },
            fields: [
              {
                'type': 'text',
                'name': 'name',
                'label': 'Name',
                'placeholder': 'Name...'
              }, {
                'type': 'text',
                'name': 'bio',
                'label': 'Biography'
              }, {
                'type': 'file',
                'name': 'avatar',
                'label': 'Avatar'
              }
            ]
          }
        ]
      })
    }
    return Promise.reject(Error('404 File not found'))
  }

  getFile = (projectId, path) => {
    if (files[path]) return Promise.resolve(files[path])
    return Promise.reject(Error('404 File not found'))
  }

  putFiles = (projectId, actions) => {
    actions.forEach((action) => {
      if (action.action === 'delete') {
        files[action.file_path] = null
      } else {
        files[action.file_path] = JSON.parse(action.content)
      }
    })
    return Promise.resolve()
  }

}

export default Demo
