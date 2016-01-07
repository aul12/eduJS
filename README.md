#eduJs
A simple WYSIWYG HTML editor with a JS backend for creating simple webapps using HTML5 and Javascript. Mainly for educational purpose.

##Dependencies
* [https://www.npmjs.com/package/electron-packager](https://www.npmjs.com/package/electron-packager)
* [http://electron.atom.io/](http://electron.atom.io/)

##Installation (for building yourself)
```
sudo apt-get install nodejs

sudo apt-get install npm

sudo npm install electron-prebuilt -g

sudo npm install electron-packager -g

```

##Run it (without compiling):
```
electron .
```

##Compiling
```
electron-packager . eduJS --platform=all --arch=all --version=0.34.1
```
