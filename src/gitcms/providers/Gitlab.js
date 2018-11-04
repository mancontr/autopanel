import QueryString from 'query-string'

const prefix = 'https://gitlab.com/api/v4'

class Gitlab {

  getId = () => 'gitlab'

  getName = () => 'Gitlab'

  login = () => (
    'https://gitlab.com/oauth/authorize?' +
    'client_id=' + process.env.GITLAB_APP_ID +
    '&redirect_uri=' + process.env.APP_URL + '/providers/gitlab/oauth' +
    '&response_type=token' +
    '&state=gitlab'
  )

  callback = async ({ location }) => {
    const q = QueryString.parse(location.hash.substring(1))
    if (q.access_token) {
      const url = prefix + '/user'
      const res = await fetch(url, {
        headers: { Authorization: 'Bearer ' + q.access_token }
      })
      const userinfo = await res.json()
      return {
        token: q.access_token,
        userinfo: {
          name: userinfo.name,
          avatar: userinfo.avatar_url,
          provider: this.getId()
        }
      }
    }
  }

  getProjects = async () => {
    const token = window.store.getState().user.token
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

  getProject = async (projectId) => {
    const token = window.store.getState().user.token
    const url = prefix + '/projects/' + projectId
    const res = await fetch(url, {
      headers: { Authorization: 'Bearer ' + token }
    })
    const project = await res.json()
    return {
      id: project.id,
      name: project.name,
      fullname: project.fullname,
      description: project.description,
      avatar: project.avatar_url
      // TODO: Add schema
    }
  }

}

export default Gitlab
