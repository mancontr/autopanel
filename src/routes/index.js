import React from 'react'
import { Route, IndexRoute } from 'react-router'
import MainLayout from 'src/gitcms/components/MainLayout'
import ProjectLayout from 'src/gitcms/components/ProjectLayout'
import ProjectPicker from 'src/gitcms/components/ProjectPicker'
import ProviderCallback from 'src/gitcms/components/ProviderCallback'
import Dashboard from 'src/gitcms/components/Dashboard'
import Entities from 'src/gitcms/components/Entities'
import Settings from 'src/gitcms/components/Settings'

const createRoutes = () => (
  <React.Fragment>
    <Route path="/providers/:provider/*" component={ProviderCallback} />,
    <Route path="/" component={MainLayout}>
      <IndexRoute component={ProjectPicker} />
      <Route path="/project/:projectId" component={ProjectLayout}>
        <IndexRoute component={Dashboard} />
        <Route path="entities" component={Entities} />
        <Route path="settings" component={Settings} />
      </Route>
    </Route>
  </React.Fragment>
)

export default createRoutes
