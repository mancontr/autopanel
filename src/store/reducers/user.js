const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'login/success':
    case 'loadData':
      return { ...state, ...action.payload }
    case 'logout':
      return initialState

    case 'getProjects/success':
      return { ...state, projects: action.payload }

    case 'getSchema/request':
      return { ...state, schema: null }
    case 'getSchema/success':
    case 'getSchema/error':
      return { ...state, schema: action.payload }

    case 'getEntityList/request':
      return { ...state, entityList: null }
    case 'getEntityList/success':
    case 'getEntityList/error':
      return { ...state, entityList: action.payload }

    default:
      return state
  }
}
