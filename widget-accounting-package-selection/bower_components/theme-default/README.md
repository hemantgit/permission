# Launchpad Default Theme
Launchpad comes with a default theme, called "theme-default", which is an extension of the base theme.

## Creating a Custom Theme
To make a custom theme, you can start by forking the theme-default repository. If you don't have
access to the git repository, you can usually find the theme-default in your project in
`statics/collection/bower_components/theme-default`.

Rename the folder from theme-default to the name of your theme, and update `bower.json`, `package.json`,
`model.xml`, and `info.json` with your theme name.

## Installing
The theme depends on bower and npm. If you don't have access to the git repositories (for bower)
then you will need to use the [`bb-bower-resolver`](https://www.npmjs.com/package/bb-bower-resolver)
to run the `bower install` successfully.

**Install Dependencies:**

```
bower install
npm install
```
## Building
```
npm run build
```
The theme is built with the [`bb-cli`](https://www.npmjs.com/package/bb-cli)
`bb theme-build` command.

So if you have the bb-cli installed you can also build using `bb theme-build`:

```
bb theme-build [--sourcemaps] [--base-path] [--edition] [--watch]
```
## Developing
Type `bb theme-build --help` to get an overview of the available commands in bb-cli.

You can use the `bb theme-build --watch` command to watch for changes in the css files
and automatically rebuild the theme.

You can turn sourcemaps on by building with the sourcemaps flag: `bb theme-build --sourcemaps`.

You can also use `bb import-item --watch`to automatically import your theme into your
portal while developing, or `bb theme-build --import` to run `bb import-item` after building.

## File Structure
The required folder structure of the theme is as follows:

```
  - bower.json
  - {path/to}/styles/{entry-files}
  - {path/to}/dist/styles/base.css
```
The rest is up to you.

The CLI tool will build the entry files specified in the `main` attribute of the
`bower.json` file into CSS equivalents in the `dist/styles/` folder. For example,
if the `main` attribute is an array containing `'styles/core.less'` and `'styles/base.less'`,
the generated files will be `core.css` and `base.css` in the `dist/styles/` folder.

The CLI tool can also produce minified versions of these files as well as the sourcemaps.
The minified versions will be renamed accordingly, i.e. `base.min.css`.

It is **important** to note that the Launchpad Page template has a hard-coded path to 
`{theme}/dist/styles/base.min.css`. That is the only file that will be included in the page.
Therefore check that any other generated `css` file is included in that `base.min.css` file,
and that `base.min.css` is built in that `dist/styles/` folder.

We have divided the styles in `core.min.css` and `base.min.css` to reduce the size of 
`base.min.css`, as it was causing problems in IE9. Then `base.min.css` imports `core.min.css`.
We currently include the core stylesheets from the base theme in `core.min.css`, which are
basically just the Twitter Bootstrap styles, and we include the rest in `base.min.css`.

## Adding to Portal
The theme can be imported to your portal as a CXP Shared Feature. The recommended way to add the
theme to your portal is to add it to the project in `statics/collection/themes/&amp;lt;theme-name&amp;gt;`, then
update the `statics/collection/bower.json`:

```json
    ...
    "dependencies": {
      ...
      "<theme-name>": "./themes/<theme-name>"
      ...
    }
```
## Important Notes
### Edition
The base theme exposes 2 editions: **retail** and **universal**. The retail edition is required
for the **retail** collection of Launchpad widgets.

To compile with the retail edition, your theme should specify the edition as "retail" in the
base.less.

You can also specify this at build time, with `--edition` flag, which will override the variable
from base.less.

### Base-Path
There is another variable which is required in your `base.less` for `base-path`.

You can also specify this at build time, with `--base-path` flag.

The `base-path` is:

> The relative path from the **CSS** file to the **base theme**.

The base theme will typically be installed into CXP in
`$(contextRoot)/static/features/[BBHOST]/theme` and your theme will be installed into
`$(contextRoot)/static/features/[BBHOST]/{theme-name}`. Therefore the relative path from
`{theme-name}/dist/styles/base.css` is `../../../theme`.

If your theme has a deeper folder structure, then you need to adjust the base-path variable
accordingly.

This is because the CSS will have links to assets that are stored in the base-theme, which need to
be resolved relative the location of the CSS file.

