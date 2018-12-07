GitCMS
======

GitCMS is an extensible CMS, using Git as the backend. Designed for static site
edition, but can be used anywhere.

How it works
------------

To access your projects, you login with a login provider. The client uses your
credentials to read and update your projects on your behalf, but they don't
ever leave your computer.
Didn't find your favourite provider?
It's easy to add new ones with our plugin system.

Each project has a schema with a description of every entity type, including
their fields and labels, and where to store the data.
Field types are plugins too, so you can create your own, but we included the
usual ones you expect on any CMS, like WYSIWYG or date.

Developing
----------

To run the project locally, just clone it and use `yarn` and `yarn start`.
You can use NPM insead, too. Either way, the project will start on [localhost:3000](http://localhost:3000).
