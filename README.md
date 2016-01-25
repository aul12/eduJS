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
Install node.js and npm using the [Installer](http://www.nodejs.org)
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
to minify the program before compiling add 
```
--asar
``` 

##Framework
The editor uses it's own framework to simplify development. It provides an API for all core UI-Elements and all sensors with a firefox API.

###Button
```javascript
button.setText("ABC")
```
Set the caption of the button as "ABC".

```javascript
button.onClick(function(){
    doSomething();
});
```
Event listener, the function is called everytime the button is clicked.

###Image
```javascript
image.setSRC("folder/to/image.jpg")
```
Set the source of the image, can  be a local path or an url.

```javascript
image.rotate(90)
```
Rotate an image by a certain angle from the current position.

###Input
```javascript
input.setText("ABC");
```
Set the text of the input as ABC.
```javascript
var text = input.getText();
```
Get the content of an input.

###Label
```javascript
label.setText("ABC");
```
Set the text of the label as ABC.

###Snackbar
```javascript
showSnackbar("ABC");
```
Show a small notification at the bottom of the screen with the Text ABC.

###Textarea
```javascript
textArea.addLine("ABC")
```
Add a line with the text ABC to the bottom of the textarea.

```javascript
textArea.setText("ABC");
```
Set the text of the textarea to ABC (linebreaks can be written as \n).

```javascript
var text = textArea.getText();
```
Get the complete content of the textarea.

```javascript
textArea.setEditable(true);
```
Select wheter the textarea should be editable or not (default is editable).

```javascript
textArea.clear();
```
Clear the content of the textarea.


###Acceleration
The acceleration sensor measures the acceleration in all three axis (relative to the device). The value is available with and without gravity compensation.
```javascript
acceleration.start(function(accelerationWithoutGravity, accelerationWithGravity){
    doSomething(accelerationWithoutGravity.x);
});
```
Start the acceleration sensor, the function is called everytime there is a new value. The acceleration object contain a x,z and z axis.

###Light
The light sensor measures the brightness at the light sensor, larger values means brighter.
```javascript
light.start(function(brightness){
    doSomething(brightness);
});
```
Start the light sensor, the function is called everytime the brightness changes.

###Location
The location module calculates the position by using the mobile-network, wifi and gps.
```javascript
gps.start(function(lat, lon){
    doSomething(lat);
});
```
Start the gps, the function is called everytime the position changes.

###Orientation
The orientation sensor measures the absolute position of the device in three axis.
```javascript
orientation.start(function(x,y,z){
    doSomething(x);
});
```
Start the orientation sensor, the function is called everytime the orientation changes.

###Proximity
The proximity sensor measures if it is covered or not (the value is boolean)
```javascript
proximity.start(function(distance){
    doSomething(distance);
});
```
Start the proximity sensor, the function is called everytime the proximity changes.


