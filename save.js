var fs = require('fs');

var fname = null;

$("#menuSave").click(function(){
    if(fname == null)
        $("#modalSave").modal('show');
    else{
        fs.writeFile("./save/" + fname + "/ui.save", editor.document.getBody().getHtml(), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
        fs.writeFile("./save/" + fname + "/js.save", codeMirror.getValue(), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
        fs.writeFile("./save/" + fname + "/index.html", composeHTML(), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    }
});

$("#btnOpen").click(function(){
    fname = $("#inputFNameOpen").val();

    fs.readFile("./save/" + fname + "/ui.save", function (err, data) {
        if (err)
            showSnackbar(err);
        editor.document.getBody().setHtml(String(data));
    });
    fs.readFile("./save/" + fname + "/js.save", function (err, data) {
        if (err)
            showSnackbar(err);
        codeMirror.setValue(String(data));
    });
    $('a[href="#design"]').tab('show');
});

$("#btnSave").click(function(){
    fname = $("#inputFNameSave").val();

    try {
        fs.mkdirSync("./save/" + fname);
    }
    catch (e) {
    }

    fs.writeFile("./save/" + fname + "/ui.save", editor.document.getBody().getHtml(), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    fs.writeFile("./save/" + fname + "/js.save", codeMirror.getValue(), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    fs.writeFile("./save/" + fname + "/index.html", composeHTML(), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });

});

$("#menuNew").click(function(){
    fname = null;
    editor.document.getBody().setHtml("");
    codeMirror.setValue("");
});

function openExample(name){
    fname = name;

    fs.readFile("./save/" + fname + "/ui.save", function (err, data) {
        if (err)
            showSnackbar(err);
        editor.document.getBody().setHtml(String(data));
    });
    fs.readFile("./save/" + fname + "/js.save", function (err, data) {
        if (err)
            showSnackbar(err);
        codeMirror.setValue(String(data));
    });
    $('a[href="#design"]').tab('show');
}