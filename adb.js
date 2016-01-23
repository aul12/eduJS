var Promise = require('bluebird');
var adb = require('adbkit');

function launchADB(){
    //adb shell am start -a android.intent.action.VIEW -n org.mozilla.firefox/.App -d 'file:///sdcard/eduJS/exampleInput/index.html'

    var client = adb.createClient();

    client.listDevices()
        .then(function(devices) {
            return Promise.map(devices, function(device) {
                return client.shell(device.id, "am start -a android.intent.action.VIEW -n org.mozilla.firefox/.App -d 'file:///sdcard/eduJS/"+fname+"/index.html'")
                    // Use the readAll() utility to read all the content without
                    // having to deal with the events. `output` will be a Buffer
                    // containing all the output.
                    .then(adb.util.readAll)
                    .then(function(output) {
                        console.log('[%s] %s', device.id, output.toString().trim())
                    })
            })
        })
        .then(function() {
            showSnackbar('Erfolgreich gestartet!')
        })
        .catch(function(err) {
            showSnackbar('Fehler beim starten:', err.stack)
        });
}

function installADB(){
    var client = adb.createClient();

    var timeout = setTimeout(function(){
        $.snackbar({content: 'Fehler beim installieren!'});
    }, 1000);

    client.listDevices()
        .then(function(devices) {
            return Promise.map(devices, function(device) {
                return client.push(device.id, "./save/" + fname + "/index.html", '/sdcard/eduJS/'+fname+'/index.html')
                    .then(function(transfer) {
                        return new Promise(function(resolve, reject) {
                            transfer.on('progress', function(stats) {
                                console.log('[%s] Pushed %d bytes so far',
                                    device.id,
                                    stats.bytesTransferred)
                            });
                            transfer.on('end', function() {
                                console.log('[%s] Push complete', device.id);
                                resolve();
                                clearTimeout(timeout);
                                showSnackbar('Erfolgreich installiert!');
                                launchADB();

                            });
                            transfer.on('error', reject);
                        })
                    })
            })
        })
        .then(function() {
            //$.snackbar({content: 'Erfolgreich installiert!'});
        })
        .catch(function(err) {
            $.snackbar({content: 'Fehler beim Installieren: '+err});
            console.log(err);
        });
}

