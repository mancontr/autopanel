export const wrapAction = (actionType, promise) => (dispatch) => {
  dispatch({ type: actionType + '/loading' })
  return promise.then(
    (payload) => dispatch({ type: actionType + '/success', payload }),
    (error) => {
      dispatch({ type: actionType + '/error', payload: error.message })
      return Promise.reject(error)
    }
  )
}

export default (actionType) => (state, action) => {
  if (action.type === actionType + '/loading') {
    return { isLoading: true, oldValue: state && state.value }
  } else if (action.type === actionType + '/success') {
    return { isSuccess: true, value: action.payload }
  } else if (action.type === actionType + '/error') {
    return { isError: true, error: action.payload }
  } else {
    return state || null
  }
}
