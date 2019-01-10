AutoPanel
=========

AutoPanel is an extensible generic CMS, which uses a schema to learn about your
domain entities, and can use any kind of backend to store the data.

How it works
------------

You start by picking a provider among the enabled ones. It will take you to
whatever authentication it needs, and start performing requests to make
operations against the backend on your behalf.
Didn't find your favourite provider?
It's easy to add new ones with our plugin system.

Each project has a schema with a description of every entity type, including
their fields and labels, and where to store the data.
Field types are plugins too, so you can create your own, but we included the
usual ones you expect on any CMS, like WYSIWYG or date.

Usage
-----

To try AutoPanel, we provide a demo project. Just clone
[autopanel-app](https://github.com/mancontr/autopanel-app) and use `yarn` and
`yarn start`. You can use NPM insead, too.
Either way, the project will start on [localhost:3000](http://localhost:3000).

Developing
----------

To try your changes in AutoPanel, clone this repo and use `yarn link`, then
link it in the demo project with `yarn link autopanel`. We also provide a
"watch mode" to rebuild the bundle on change, which you can start with
`yarn watch`.

Work in progress
----------------

This is alpha software. Try it, but don't use it in production yet.
