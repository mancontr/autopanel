const providers = require.context('./providers', true, /^(.*\.(js$))[^.]*$/im)
const types = require.context('./types', true, /^(.*\.(js$))[^.]*$/im)

const config = { providers: {}, types: [] }

// Provider handling functions
config.registerProvider = (provider) => {
  config.providers[provider.getId()] = provider
}
config.getProvider = (id) => config.providers[id]
config.getProviders = () => Object.keys(config.providers)

// Type handling functions
config.registerType = (type) =>
  config.types.push(type)

// Auto-register all internal providers and types
providers.keys().forEach(k => {
  const Provider = providers(k).default
  config.registerProvider(new Provider())
})
types.keys().forEach(k => config.registerType(types(k).default))

export default config
