const providers = require.context('./providers', true, /^(.*\.(js$))[^.]*$/im)
const storages = require.context('./storages', true, /^(.*\.(js$))[^.]*$/im)
// const types = require.context('./types', true, /^(.*\.(js$))[^.]*$/im)

const config = {
  providers: {},
  storages: {},
  types: {}
}

const ret = {}
// Provider handling functions
ret.registerProvider = (provider) => {
  config.providers[provider.getId()] = provider
}
ret.getProvider = (id) => config.providers[id]
ret.getProviders = () => Object.keys(config.providers)

// Storage handling functions
ret.registerStorage = (storage) => {
  config.storages[storage.getId()] = storage
}
ret.getStorage = (id) => config.storages[id]

// Type handling functions
ret.registerType = (type) => {
  config.types[type.getId()] = type
}
ret.getType = (id) => config.types[id]

// Auto-register all internal providers and types
providers.keys().forEach(k => {
  const Provider = providers(k).default
  ret.registerProvider(new Provider())
})
storages.keys().forEach(k => ret.registerStorage(storages(k).default))
// types.keys().forEach(k => ret.registerType(types(k).default))

export default ret
