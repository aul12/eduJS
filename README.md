#eduJs
A simple WYSIWYG HTML editor with a JS backend for creating simple webapps using HTML5 and Javascript. Mainly for educational purpose.

##Dependencies
* [http://electron.atom.io/](http://electron.atom.io/)
* [https://www.npmjs.com/package/electron-packager](https://www.npmjs.com/package/electron-packager)

##Installation (for building yourself)
### Linux
```
sudo apt-get install nodejs

sudo apt-get install npm

sudo npm install electron-prebuilt -g

sudo npm install electron-packager -g

```

If you want to run the app on your android device you need the Android-Debugging-Bridge (adb) in your PATH:
```
sudo apt-get install android-tools-adb
```

### Windows
Install node.js and npm using the [Installer](nodejs.org)
```
npm install electron-prebuilt -g
npm install electron-packager -g
```

To install the Android-Debugging-Bridge (adb), see [this](http://forum.xda-developers.com/showthread.php?t=2588979) post on XDA.

##Run it (without compiling):
```
electron .
```

##Compiling
```
electron-packager . eduJS --platform=[linux/win32/darwin] --arch=[ia32/x64] --version=0.34.1
```
