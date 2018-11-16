import React from 'react'
import { Route, IndexRoute } from 'react-router'
import MainLayout from 'src/gitcms/components/MainLayout'
import ProjectLayout from 'src/gitcms/components/ProjectLayout'
import ProjectPicker from 'src/gitcms/components/ProjectPicker'
import ProviderCallback from 'src/gitcms/components/ProviderCallback'
import Dashboard from 'src/gitcms/components/Dashboard'
import EntitySection from 'src/gitcms/components/EntitySection'
import EntityTypes from 'src/gitcms/components/EntityTypes'
import EntityList from 'src/gitcms/components/EntityList'
import EntityEdit from 'src/gitcms/components/EntityEdit'
import Settings from 'src/gitcms/components/Settings'

const createRoutes = () => (
  <React.Fragment>
    <Route path="/providers/:provider/*" component={ProviderCallback} />,
    <Route path="/" component={MainLayout}>
      <IndexRoute component={ProjectPicker} />
      <Route path="/project/:projectId" component={ProjectLayout}>
        <IndexRoute component={Dashboard} />
        <Route path="entities" component={EntitySection}>
          <IndexRoute component={EntityTypes} />
          <Route path=":entityType">
            <IndexRoute component={EntityList} />
            <Route path="new" component={EntityEdit} />
            <Route path=":entityId" component={EntityEdit} />
          </Route>
        </Route>
        <Route path="settings" component={Settings} />
      </Route>
    </Route>
  </React.Fragment>
)

export default createRoutes
