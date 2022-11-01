This is a project to run [Actual](https://github.com/actualbudget/actual), as a desktop application. It includes [`actual-server`](https://github.com/actualbudget/actual-server) built in and can be used locally or to connect to a remote server.
This is great for people who might want a desktop application to connect to their remote Actual server or people who want to try out Actual locally without setting up a server to run it on.

## Running

It's very easy to get started. Clone this repo, install deps, and start it:

```
git clone https://github.com/nfaucher8/actual-desktop.git
cd actual-desktop
yarn install
yarn start
```

A new application should start and you'll see Actual.

## Building

`actual-desktop` can be built as an application for your operating system. This allows it to be used like any other application (instead of having to be run through yarn).

### `yarn build`
Attempts to build an application for your current operating system and architecture

### `yarn build:linux`
Attempts to build an application for Linux

- outputs:
  - AppImage

### `yarn build:mac`
Attempts to build an application for MacOS (can only be run on MacOS)

- outputs:
  - arm64 zipped `.app`
  - arm64 `.dmg` installer
  - x64 zipped `/app`
  - x64 `.dmg` installer
  - universal zipped `.app`
  - universal `.dmg` installer

### `yarn build:pi`
Attempts to build an `armv7l` application for Linux

- outputs:
  - AppImage

### `yarn build:windows`
Attempts to build an x64 application for Windows

This will output 3 different versions of the built application. A `.msi` installer and `.exe` installer that
can be used to install Actual on a device. A portable `.exe` will also be created, this file can run Actual without having to install it on a device.

- outputs:
  - MSI Installer
  - Portable exe
  - Installer exe
