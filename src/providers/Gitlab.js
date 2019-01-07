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

  callback = async (gitcms, { location }) => {
    const q = QueryString.parse(location.hash.substring(1))
    if (q.access_token) {
      const url = prefix + '/user'
      const res = await fetch(url, {
        headers: { Authorization: 'Bearer ' + q.access_token }
      })
      const userinfo = await res.json()
      gitcms.login(q.access_token, {
        name: userinfo.name,
        avatar: userinfo.avatar_url,
        provider: this.getId()
      })
    }
  }

  getProjects = async (gitcms) => {
    const token = gitcms.getToken()
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

  getProject = async (gitcms, projectId) => {
    const token = gitcms.getToken()
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

  getSchema = async (gitcms, projectId) =>
    this.getFile(gitcms, projectId, '.gitcms')

  getFile = async (gitcms, projectId, path) => {
    const token = gitcms.getToken()
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

  putFiles = async (gitcms, projectId, actions) => {
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
        commit_message: 'Edited from GitCMS',
        actions: actions
      })
    })
    const ret = await res.json()
    console.log('>>', ret)
  }

}

export default Gitlab
