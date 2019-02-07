import React from 'react'
import PropTypes from 'prop-types'
import { IndexRoute, Route } from 'react-router'
import { components } from 'autopanel'
const {
  AutoPanel,
  MainLayout,
  ProjectLayout,
  ProjectPicker,
  ProviderCallback,
  Dashboard,
  EntityTypes,
  EntityList,
  EntityEdit,
  Settings
} = components

const propTypesObject = {
  params: PropTypes.object,
  router: PropTypes.object,
  children: PropTypes.element
}

const ProviderCallbackWithProps = ({ params, children }) => (
  <ProviderCallback provider={params.provider}>
    {children}
  </ProviderCallback>
)
ProviderCallbackWithProps.propTypes = propTypesObject

const ProjectLayoutWithProps = ({ params, children }) => (
  <ProjectLayout projectId={params.projectId}>
    {children}
  </ProjectLayout>
)
ProjectLayoutWithProps.propTypes = propTypesObject

const EntityListWithProps = ({ params, children }) => (
  <EntityList entityType={params.entityType}>
    {children}
  </EntityList>
)
EntityListWithProps.propTypes = propTypesObject

const EntityEditWithProps = ({ params, children }) => (
  <EntityEdit
    entityType={params.entityType}
    entityId={params.entityId}>
    {children}
  </EntityEdit>
)
EntityEditWithProps.propTypes = propTypesObject

const AutoPanelRoutes = (settings = {}) => {
  const overrides = settings.overrides || {}

  const AutoPanelWithProps = ({ router, children }) => {
    const currSettings = { navigate: router.push, ...settings }
    return (
      <div id="bodyGlue-panel">
        <AutoPanel settings={currSettings} >
          {children}
        </AutoPanel>
      </div>
    )
  }
  AutoPanelWithProps.propTypes = propTypesObject

  const MainLayoutWithProps = ({ children }) =>
    <MainLayout login={overrides.login} children={children} />
  MainLayoutWithProps.propTypes = propTypesObject

  return (
    <Route component={AutoPanelWithProps} path="">
      <Route path="providers/:provider/*" component={ProviderCallbackWithProps} />
      <Route path="" component={MainLayoutWithProps}>
        <IndexRoute component={ProjectPicker} />
        <Route path="project/:projectId" component={ProjectLayoutWithProps}>
          <IndexRoute component={Dashboard} />
          <Route path="entities">
            <IndexRoute component={EntityTypes} />
            <Route path=":entityType">
              <IndexRoute component={EntityListWithProps} />
              <Route path="new" component={EntityEditWithProps} />
              <Route path=":entityId" component={EntityEditWithProps} />
            </Route>
          </Route>
          <Route path="settings" component={Settings} />
        </Route>
      </Route>
    </Route>
  )
}

export default AutoPanelRoutes
