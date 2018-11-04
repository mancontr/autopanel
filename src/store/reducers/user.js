const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'login/success':
    case 'loadData':
      return { ...state, ...action.payload }
    case 'logout':
      return initialState
    default:
      return state
  }
}
