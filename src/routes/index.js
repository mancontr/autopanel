import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Wrapper from 'src/gitcms/components/Wrapper'
import MainLayout from 'src/gitcms/components/MainLayout'
import ProjectLayout from 'src/gitcms/components/ProjectLayout'
import ProjectPicker from 'src/gitcms/components/ProjectPicker'
import ProviderCallback from 'src/gitcms/components/ProviderCallback'
import Dashboard from 'src/gitcms/components/Dashboard'
import EntityTypes from 'src/gitcms/components/EntityTypes'
import EntityList from 'src/gitcms/components/EntityList'
import EntityEdit from 'src/gitcms/components/EntityEdit'
import Settings from 'src/gitcms/components/Settings'

const createRoutes = () => (
  <React.Fragment>
    <Route component={Wrapper}>
      <Route path="/providers/:provider/*" component={ProviderCallback} />,
      <Route path="/" component={MainLayout}>
        <IndexRoute component={ProjectPicker} />
        <Route path="/project/:projectId" component={ProjectLayout}>
          <IndexRoute component={Dashboard} />
          <Route path="entities">
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
    </Route>
  </React.Fragment>
)

const serverRoutes = () => <Route path="*" component={() => '...'} />

const _export = __CLIENT__ ? createRoutes : serverRoutes
export default _export // createRoutes
