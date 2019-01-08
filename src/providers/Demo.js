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
  callback = async (autopanel) => autopanel.login('fake-token', {
    name: 'Anonymous',
    provider: this.getId()
  })

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

export default Demo
