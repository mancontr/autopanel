/**
 * Demo provider.
 * This provider is just an in-memory example with a hardcoded schema.
 * It is heavily documented to serve as an example to build new providers.
 */
class Demo {

  constructor ({ appUrl }) {
    this.appUrl = appUrl
  }

  /**
   * Returns an unique identifier for this provider.
   * It will be used on the callback URL, and as the internal key for everything
   * which needs to point to a specific provider.
   */
  getId = () => 'demo'

  /**
   * Returns an human-readable name for the provider.
   * It will be used whenever a provider is shown to the user.
   */
  getName = () => 'Anonymous'

  /**
   * Returns the URL for the login process.
   * It can be external (eg: oauth provider) or internal (eg: callback pages).
   */
  login = () => this.appUrl + '/providers/demo/oauth'

  /**
   * Called for requests to `/provider/[providerId]`.
   * Designed to make Oauth callbacks, but you can serve anything here,
   * including pages (for internal login flows) and REST endpoints.
   *
   * Params:
   *   - autopanel: An Autopanel API instance.
   *   - props: The props received by the callback component, which include
   *            the router-provided info (location, router, ...)
   */
  callback = async (autopanel) => {
    autopanel.login('fake-token', {
      name: 'Anonymous',
      provider: this.getId()
    })
    autopanel.go('/')
  }

  /**
   * List all the projects the current user can access.
   * Returns an array of project objects, which can have the following fields:
   *   - id: (Req.) Unique identifier for the project. Will be used on URLs.
   *   - name: (Req.) Display name for the project.
   *   - fullname: Longer name including extra info (eg: group, namespace)
   *   - description: Human-readable description for the project.
   *   - avatar: Image representing this project.
   * Params:
   *   - autopanel: An Autopanel API instance.
   */
  getProjects = async () => [ demoProject, badProject ]

  /**
   * Gets the project object associated to a project ID.
   * Returns a single object with the fields described on getProjects.
   * Params:
   *   - autopanel: An Autopanel API instance.
   *   - projectId: The target project id
   */
  getProject = async (autopanel, projectId) => {
    if (projectId === demoProject.id) return demoProject
    if (projectId === badProject.id) return badProject
    return Promise.reject(Error('404 Project not found'))
  }

  /**
   * Returns the schema associated to a project ID.
   * For more info about schema definitions, read the docs.
   * Params:
   *   - autopanel: An Autopanel API instance.
   *   - projectId: The target project id
   */
  getSchema = async (autopanel, projectId) => {
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
              }, {
                'type': 'location',
                'name': 'place',
                'label': 'Place'
              }, {
                'type': 'relationship',
                'name': 'author',
                'label': 'Post author',
                'targetEntity': 'author'
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
              }, {
                'type': 'file',
                'name': 'photos',
                'label': 'Photos',
                'multiple': true
              }, {
                'type': 'relationship',
                'name': 'parent',
                'label': 'Parent',
                'targetEntity': 'author'
              }, {
                'type': 'relationship',
                'name': 'posts',
                'label': 'Posts',
                'targetEntity': 'post',
                'multiple': true
              }, {
                'type': 'group',
                'name': 'address',
                'label': 'Address',
                'collapsed': true,
                'contents': [
                  {
                    'type': 'text',
                    'name': 'street',
                    'label': 'Street',
                    'placeholder': 'Street...'
                  }, {
                    'type': 'text',
                    'name': 'zip',
                    'label': 'ZIP code',
                    'placeholder': '12345'
                  }, {
                    'type': 'select',
                    'name': 'country',
                    'label': 'Country',
                    'options': [
                      { value: 'de', label: 'Germany' },
                      { value: 'ru', label: 'Russia' },
                      { value: 'es', label: 'Spain' },
                      { value: 'uk', label: 'United Kingdom' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      })
    }
    return Promise.reject(Error('404 File not found'))
  }

  /**
   * Retrieves a file from the provider.
   * Used by storage types (and maybe from field types?) to access info.
   * Tip: You don't need to work with actual files; your paths can be REST urls,
   *      database IDs, or anything else. The path is just a string ID.
   * Params:
   *   - autopanel: An Autopanel API instance.
   *   - projectId: The target project id
   *   - path: The file path
   */
  getFile = async (autopanel, projectId, path) => {
    if (files[path]) return Promise.resolve(files[path])
    return Promise.reject(Error('404 File not found'))
  }

  /**
   * Updates (or removes) one or more files at the provider.
   * Can batch multiple updates and removes (even mixed) on a single call,
   * for those providers with a concept of "commit".
   * Params:
   *   - autopanel: An Autopanel API instance.
   *   - projectId: The target project id
   *   - actions: An array of file actions, which contain:
   *       - action: The action to perform (eg: create, delete, update)
   *       - file_path: The path affected by this action
   *       - content: The contents to write to the file
   */
  putFiles = async (autopanel, projectId, actions) => {
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

/* Example project objects */
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
  description: 'A project lacking an schema, thus not usable with autopanel.'
}

/* Example schema and json-array storage file. */
const files = {
  '/posts.json': [
    {
      title: 'Demo Post',
      content:
        '<p>This is some <strong>text</strong>.</p>' +
        '<figure><img src="https://i.imgur.com/Mvwise9b.jpg">' +
        '<figcaption>Images are also allowed.</figcaption></figure>' +
        '<p>Have fun!</p>',
      date: 1541449329000,
      author: '2',
      place: [42.225507, -8.768352]
    }, {
      title: 'Another post',
      content: '<p>Moar <strong>text</strong>.</p>',
      date: 1521999029000
    }, {
      title: 'Last post',
      content: '<p>Yay!</p>',
      date: 1532473568000
    }
  ],
  '/authors.json': [
    {
      name: 'William',
      bio: 'Love all, trust a few, do wrong to none.',
      avatar: { name: 'demo.jpg', size: 110000, type: 'image/jpeg', url: 'https://i.imgur.com/Mvwise9b.jpg' },
      photos: [
        { name: 'DSC_1234.jpg', size: 3250000, type: 'image/jpeg', url: 'https://i.imgur.com/ODFhxpeb.jpg' },
        { name: 'Screenshot (245).png', size: 1500000, type: 'image/png', url: 'https://i.imgur.com/Z5o70Jfb.jpg' }
      ],
      parent: 1,
      posts: [3, 1],
      address: {
        street: 'C\\ Gran vía',
        zip: '15003',
        country: 'es'
      }
    }, {
      name: 'Edgar',
      bio: 'I became insane, with long intervals of horrible sanity.',
      address: {
        street: 'Gorbachov St.',
        zip: '19001',
        country: 'ru'
      }
    }
  ]
}

export default Demo
