export default ({ dispatch, getState }) => {
  const monitored = [ 'login/success', 'logout' ]

  const payload = JSON.parse(localStorage.getItem('user'))
  window.setTimeout(() => dispatch({ type: 'loadData', payload }), 0)

  return (next) => (action) => {
    const ret = next(action)
    if (monitored.indexOf(action.type) !== -1) {
      localStorage.setItem('user', JSON.stringify(getState().user))
    }
    return ret
  }
}
