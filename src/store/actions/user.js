export const login = (token, userinfo) => ({
  type: 'login/success',
  payload: { token, userinfo }
})

export const logout = () => ({ type: 'logout' })
