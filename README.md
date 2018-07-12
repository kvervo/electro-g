# ElectroG calendar
An [Electron](https://github.com/atom/electron) wrapper around [Google Calendar](https://calendar.google.com)

I was tired of having a Browser window opened to check my calendar. Also, I do not like the default calendar app on MacOS. Hence, came the idea to wrap the Google Calendar website in an Electron application.

This app makes uses of [Electron Forge](https://github.com/electron-userland/electron-forge) to package and create distributives.

## How to Install

### Using the installer
List of all releases is available at the [Releases](https://github.com/kvervo/electro-g/releases/) page.

Latest releases:

* [MacOS](https://github.com/kvervo/electro-g/releases/download/0.1.0-alpha/Electro.G.Calendar-0.1.0-alpha.dmg)  
* [Windows](https://github.com/kvervo/electro-g/releases/download/0.1.0-alpha/Electro.G.Calendar-0.1.0-alpha.exe)
  

### Build it yourself

1. Clone repository
2. Install all npm dependencies by running:
```bash
npm install
```
3. To create a package / executable run:
```bash
npm run package
```
