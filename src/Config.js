// import GitlabProvider from './providers/Gitlab'
// import DemoProvider from './providers/Demo'
import JsonArrayStorage from './storages/JsonArray'
import TextType from './types/Text'
import SelectType from './types/Select'
import WysiwygType from './types/Wysiwyg'
import DateType from './types/Date'

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
ret.removeProvider = (id) => delete config.providers[id]
ret.getProvider = (id) => config.providers[id]
ret.getProviders = () => Object.keys(config.providers)

// Storage handling functions
ret.registerStorage = (storage) => {
  config.storages[storage.getId()] = storage
}
ret.getStorage = (id) => config.storages[id]

// Type handling functions
ret.registerType = (type) => {
  config.types[type.name] = type
}
ret.getType = (id) => config.types[id]

// Auto-register all internal providers and types
// ret.registerProvider(new GitlabProvider())
// ret.registerProvider(new DemoProvider())
ret.registerStorage(JsonArrayStorage)
ret.registerType(TextType)
ret.registerType(SelectType)
ret.registerType(WysiwygType)
ret.registerType(DateType)

export default ret
