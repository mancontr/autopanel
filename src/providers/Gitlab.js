import QueryString from 'query-string'

const prefix = 'https://gitlab.com/api/v4'

class Gitlab {

  constructor ({ appId, appUrl }) {
    this.appId = appId
    this.appUrl = appUrl
  }

  getId = () => 'gitlab'

  getName = () => 'Gitlab'

  login = () => (
    'https://gitlab.com/oauth/authorize?' +
    'client_id=' + this.appId +
    '&redirect_uri=' + this.appUrl + '/providers/gitlab/oauth' +
    '&response_type=token' +
    '&state=gitlab'
  )

  callback = async (autopanel, { location }) => {
    const q = QueryString.parse(location.hash.substring(1))
    if (q.access_token) {
      const url = prefix + '/user'
      const res = await fetch(url, {
        headers: { Authorization: 'Bearer ' + q.access_token }
      })
      const userinfo = await res.json()
      autopanel.login(q.access_token, {
        name: userinfo.name,
        avatar: userinfo.avatar_url,
        provider: this.getId()
      })
    }
  }

  getProjects = async (autopanel) => {
    const token = autopanel.getToken()
    const url = prefix + '/projects?' + QueryString.stringify({
      membership: 'true',
      order_by: 'last_activity_at'
    })
    const res = await fetch(url, {
      headers: { Authorization: 'Bearer ' + token }
    })
    const projects = await res.json()
    return projects.map((p) => ({
      id: p.id,
      name: p.name,
      fullname: p.name_with_namespace,
      description: p.description,
      avatar: p.avatar_url
    }))
  }

  getProject = async (autopanel, projectId) => {
    const token = autopanel.getToken()
    const url = prefix + '/projects/' + projectId
    const res = await fetch(url, {
      headers: { Authorization: 'Bearer ' + token }
    })
    const project = await res.json()
    if (!res.ok) throw new Error(project.message || res.statusText)
    return {
      id: project.id,
      name: project.name,
      fullname: project.name_with_namespace,
      description: project.description,
      avatar: project.avatar_url
    }
  }

  getSchema = async (autopanel, projectId) =>
    this.getFile(autopanel, projectId, '.autopanel')

  getFile = async (autopanel, projectId, path) => {
    const token = autopanel.getToken()
    const encodedPath = encodeURIComponent(path)
    const url = prefix + '/projects/' + projectId +
      '/repository/files/' + encodedPath + '?ref=master'
    const res = await fetch(url, {
      headers: { Authorization: 'Bearer ' + token }
    })
    const file = await res.json()
    if (!res.ok) throw new Error(file.message || res.statusText)
    return JSON.parse(window.atob(file.content))
  }

  putFiles = async (autopanel, projectId, actions) => {
    const token = window.store.getState().user.token
    const url = prefix + '/projects/' + projectId + '/repository/commits'
    const res = await fetch(url, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        branch: 'master',
        commit_message: 'Edited from AutoPanel',
        actions: actions
      })
    })
    const ret = await res.json()
    console.log('>>', ret)
  }

}

export default Gitlab
