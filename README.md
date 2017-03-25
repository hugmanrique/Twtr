# Twtr ![Logo](icons/Icon.png)
This app is based in the [Mobile Twitter](https://mobile.twitter.com/) site, but modifies a lot of things and makes it more usable on desktop.

I created this app to learn more about [Electron](https://electron.atom.io/) and how it works.

![App image](http://i.imgur.com/iOaLeGu.png)

## Background behavior
When closing the window, the app will continue running in the background, in the dock on macOS and the tray on Windows/Linux. Right-click the dock/tray icon and choose ``Quit`` to completely close the app.

## Install
*macOS 10.9+, Windows 7+ & Linux are supported*

The app isn't available as a compiled package yet, so you will need to do it by yourself (it's quite easy).

First of all, you need to clone this repo:
```bash
$ git clone git@github.com:hugmanrique/Twtr.git
```

Then, install all the dependencies with `$ npm install`

### macOS
Run `$ npm run build:macos` and move `dist/Twtr.app` to the `/Applications` directory.

### Windows
![Windows look](http://i.imgur.com/yTF31bu.png)

Run `$ npm run build:win`. Your compiled exe file will be in the `dist` directory.

### Linux
You will need to run `$ npm run build:linux`.

To add a shortcut to the app, create a file in `~/.local/share/applications` called `twtr.desktop` with the following contents:

```
[Desktop Entry]
Name=Twtr
Exec=/full/path/to/folder/Twtr
Terminal=false
Type=Application
Icon=/full/path/to/folder/Twtr/resources/app/icons/Icon.png
```

## Contributing
Pull requests and issues are more than welcome, but remember this was an Electron starter project.

## License
Twtr is licensed under the MIT License - see the `LICENSE` file for details.