import React, { Suspense } from 'react'
import { FormattedMessage } from 'react-intl'

import { useGitcms } from 'src/gitcms'
import './Dashboard.sass'

const Entities = () => {
  const gitcms = useGitcms()
  const schema = gitcms.optional(() => gitcms.getSchema())
  if (!schema) return <FormattedMessage id="project.configured.error" />

  return <FormattedMessage id="project.configured.ok"
    values={{ n: schema.entities.length }} />
}

const About = () => {
  const gitcms = useGitcms()
  const project = gitcms.optional(() => gitcms.getProject())
  if (!project) return <FormattedMessage id="project.error" />

  const style = {}
  let overlay = false
  if (project.avatar) {
    style.backgroundImage = 'url("' + project.avatar + '")'
  } else {
    overlay = project.name[0].toUpperCase()
  }
  return (
    <div className="project">
      <div className="avatar" style={style}>{overlay}</div>
      <div className="info">
        <div className="name">{project.fullname}</div>
        <div className="description">{project.description}</div>
      </div>
    </div>
  )
}

const Dashboard = () => {

  const fallback = <FormattedMessage id="loading" />

  return (
    <div id="dashboard">
      <h1><FormattedMessage id="dashboard" /></h1>
      <div className="box about">
        <Suspense fallback={fallback}>
          <About />
        </Suspense>
      </div>
      <div className="box entities">
        <Suspense fallback={fallback}>
          <Entities />
        </Suspense>
      </div>
    </div>
  )
}

export default Dashboard
