const providers = require.context('./providers', true, /^(.*\.(js$))[^.]*$/im)
const types = require.context('./types', true, /^(.*\.(js$))[^.]*$/im)

const config = { providers: {}, types: [] }

config.registerProvider = (provider) => {
  config.providers[provider.getId()] = provider
}
config.getProvider = (id) => config.providers[id]
config.getProviders = () => Object.keys(config.providers)

config.registerType = (type) =>
  config.types.push(type)

providers.keys().forEach(k => {
  const Provider = providers(k).default
  config.registerProvider(new Provider())
})
types.keys().forEach(k => config.registerType(types(k).default))

export default config
