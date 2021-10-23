# vfs-create-widget

> CLI for creating react widgets and connect them to VFS Azure feed

Credits: based on the project from [Travis Fischer](https://github.com/transitive-bullshit) named [create-react-library](https://github.com/transitive-bullshit/create-react-library)

## Features

- Easy-to-use CLI
- Handles all modern JS features
- Bundles `commonjs` and `es` module formats
- [create-react-app](https://github.com/facebookincubator/create-react-app) for example usage and local dev
- [Rollup](https://rollupjs.org/) for bundling
- [Babel](https://babeljs.io/) for transpiling
- [Jest](https://facebook.github.io/jest/) for testing
- Supports complicated peer-dependencies
- Supports CSS modules
- Sourcemap creation

## Install globally

This package requires `node >= 10`.

```bash
npm install -g create-react-library
```

## Usage with npx

```bash
npx create-react-library
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

## Creating a New Module

```bash
vfs-create-widget
```

Answer some basic prompts about your module, and then the CLI will perform the following steps:

- copy over the template
- link packages together for local development

At this point, your new module should resemble this screenshot and is all setup for local development.

<p align="center">
  <img width="600" src="https://cdn.rawgit.com/transitive-bullshit/create-react-library/master/media/tree.svg">
</p>

## Development

Local development is broken into two parts (ideally using two tabs).

First, run rollup to watch your `src/` module and automatically recompile it into `dist/` whenever you make changes.

```bash
npm start # runs rollup with watch flag
```

The second part will be running the `example/` create-react-app that's linked to the local version of your module.

```bash
# (in another tab)
cd example
npm start # runs create-react-app dev server
```

Now, anytime you make a change to your library in `src/` or to the example app's `example/src`, `create-react-app` will live-reload your local dev server so you can iterate on your component in real-time.

## Publishing to Azure feed

```bash
npm version <new_version>
npm publish
```

This builds `commonjs` and `es` versions of your module to `dist/` and then publishes your module to `npm`.

Make sure that any npm modules you want as peer dependencies are properly marked as `peerDependencies` in `package.json`. The rollup config will automatically recognize them as peers and not try to bundle them in your module.


## Use with React Hooks

If you use [react-hooks](https://reactjs.org/docs/hooks-intro.html) in your project, when you debug your example you may run into an exception [Invalid Hook Call Warning](https://reactjs.org/warnings/invalid-hook-call-warning.html). This [issue](https://github.com/facebook/react/issues/14257) explains the reason, your lib and example use a different instance, one solution is rewrite the `react` path in your example's `package.json` to 'file:../node_modules/react' or 'link:../node_modules/react'.

## Examples

### Multiple Named Exports

Here is a [branch](https://github.com/transitive-bullshit/react-modern-library-boilerplate/tree/feature/multiple-exports) which demonstrates how to use multiple named exports. The module in this branch exports two components, `Foo` and `Bar`, and shows how to use them from the example app.

### Material-UI

Here is a [branch](https://github.com/transitive-bullshit/react-modern-library-boilerplate/tree/feature/material-ui) which demonstrates how to make use of a relatively complicated peer dependency, [material-ui](https://github.com/mui-org/material-ui). It shows the power of [rollup-plugin-peer-deps-external](https://www.npmjs.com/package/rollup-plugin-peer-deps-external) which makes it a breeze to create reusable modules that include complicated material-ui subcomponents without having them bundled as a part of your module.

### Boilerplate

The CLI is based on this [boilerplate](https://github.com/transitive-bullshit/react-modern-library-boilerplate), which you can optionally read about [here](https://hackernoon.com/publishing-baller-react-modules-2b039d84bce7).


