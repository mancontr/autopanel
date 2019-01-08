Providers
=========

Providers are the tool used for interacting with a backend service, such as
logging in, listing projects, or retrieving files.

We provide the following built-in providers:

 - Demo: a in-memory provider, which keeps track of changes until page reload
 - Gitlab: backed by the Gitlab API, using repositories as a database

You might also be interested in checking the storage types, as they provide
the other half of the functionality, dealing with how entities are accessed.

Enabling providers
------------------

To enable a built-in provider or add your own, do something like:
```js
import { config, providers } from 'autopanel'

config.registerProvider(new providers.Demo({
  appUrl: 'http://localhost:3000'
}))

config.registerProvider(new providers.Gitlab({
  appUrl: 'http://localhost:3000',
  appId: 'your-app-id'
}))
```

API
---

_In lieu_ of a formal spec, please take a look at the source of the Demo
provider. It contains all the required methods, heavily commented.
