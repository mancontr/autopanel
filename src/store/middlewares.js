const middlewares = []

if (__CLIENT__) {
  middlewares.push(require('./middlewares/localstorage').default)
}

export default middlewares
