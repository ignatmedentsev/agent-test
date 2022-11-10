# Agent


### Scripts 
#### Render process
- ```render:start``` - start angular server
- ```render:build``` - build angular app
- ```render:watch``` - build with watch option (not working with main:dev)
- ```render:clear``` - delete ``dist/render`` folder
- ```render:lint``` - lint code angular (eslint)
- ```render:lint:fix``` - fix lint

<hr>

#### Main process

- ```main:clear``` - delete ``dist/main`` folder
- ```main:build``` - build main process
- ```main:start``` - start electron app (main process) with empty NODE_ENV and electron load window from file
- ```main:up``` - build and start electron app
- ```main:dev``` - start electron app on develop mode (window load from url) run after ``render:start``
- ```main:lint``` - lint main code
- ```main:lint:fix``` - fix lint

<hr>

#### Tools

- ```style:lint``` - lint style 
- ```style:lint:fix``` - fix lint
- ```rm:release``` - rm -rf *release*
- ```copy:logo``` copy logo to dist/main folder. It`s need for dev mode for show icon in bar
- ```lint:all``` - lint all (style, main, render)
- ```lint:all:fix``` - fix lint all
- ```asar:extract:linux``` - extract asar (linux) archive for debug
- ```asar:extract:win``` - extract asar (windows) archive for debug

<hr>

#### Build

- ```electron:builder``` - alias run electron-builder
- ```electron:build:src``` - build all src (render and main) before release
- ```electron:linux``` - build for linux
- ```electron:windows``` - build for windows


For start app run ```render:start``` after ```main:dev```
