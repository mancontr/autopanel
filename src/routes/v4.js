import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
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
  match: PropTypes.object,
  history: PropTypes.object
}

const ProviderCallbackAdapter = ({ match }) =>
  <ProviderCallback provider={match.params.provider} />
ProviderCallbackAdapter.propTypes = propTypesObject

const ProjectLayoutAdapter = ({ match }) =>
  <ProjectLayout projectId={match.params.projectId}>
    <Route exact path={match.path} component={Dashboard} />
    <Route path={match.path + '/entities'} component={EntitiesAdapter} />
    <Route path={match.path + '/settings'} component={Settings} />
  </ProjectLayout>
ProjectLayoutAdapter.propTypes = propTypesObject

const EntitiesAdapter = ({ match }) =>
  <React.Fragment>
    <Route exact path={match.path} component={EntityTypes} />
    <Route path={match.path + '/:entityType'} component={EntityTypeAdapter} />
  </React.Fragment>
EntitiesAdapter.propTypes = propTypesObject

const EntityTypeAdapter = ({ match }) =>
  <React.Fragment>
    <Route exact path={match.path} component={EntityListAdapter} />
    <Switch>
      <Route path={match.path + '/new'} component={EntityEditAdapter} />
      <Route path={match.path + '/:entityId'} component={EntityEditAdapter} />
    </Switch>
  </React.Fragment>
EntityTypeAdapter.propTypes = propTypesObject

const EntityListAdapter = ({ match }) =>
  <EntityList entityType={match.params.entityType} />
EntityListAdapter.propTypes = propTypesObject

const EntityEditAdapter = ({ match }) =>
  <EntityEdit
    entityType={match.params.entityType}
    entityId={match.params.entityId}
  />
EntityEditAdapter.propTypes = propTypesObject

const AutoPanelRoutes = (settings = {}) => {
  const overrides = settings.overrides || {}

  const AutoPanelAdapter = ({ match, history }) => {
    const currSettings = {
      navigate: history.push,
      prefix: match.path,
      ...settings
    }
    return (
      <AutoPanel settings={currSettings}>
        <Route path={match.path + '/providers/:provider/*'}
          component={ProviderCallbackAdapter} />
        <Route path={match.path} component={MainLayoutAdapter} />
      </AutoPanel>
    )
  }
  AutoPanelAdapter.propTypes = propTypesObject

  const MainLayoutAdapter = ({ match }) =>
    <MainLayout login={overrides.login}>
      <Route exact path={match.path} component={ProjectPicker} />
      <Route path={match.path + '/project/:projectId'}
        component={ProjectLayoutAdapter} />
    </MainLayout>
  MainLayoutAdapter.propTypes = propTypesObject

  return AutoPanelAdapter
}
export default AutoPanelRoutes
