var fs = require('fs');
var Promise = require('bluebird');
var adb = require('adbkit');

var codeMirror;
var editor;



var changed = false;

function showSnackbar(text){
    $.snackbar({content: text});
}

$(function(){
    $.material.init()

    var textArea = document.getElementById("editArea");
    var previewArea = document.getElementById("previewArea");

    editor = CKEDITOR.replace('previewArea', {
        on: {
            instanceReady: function(){

                var element = document.getElementById("home");
                var offset = element.getBoundingClientRect().top;
                element = document.getElementById("fabRun");
                var height = element.getBoundingClientRect().bottom + 10;
                editor.resize('100%', height-offset-64);
            },
            change: function(){
                if(changed){
                    changed = false;
                }
                else {
                    try {
                        var inputs = editor.document.getElementsByTag("input");
                        for (var counter = 0; counter < inputs.count(); counter++) {
                            var item = inputs.getItem(counter);
                            var name = $(item).attr("data-cke-saved-name");
                            $(item).attr("id", name);
                            switch ($(item).attr("type")) {
                                case "button":
                                case "submit":
                                case "reset":
                                    console.log("Name", name);
                                    $(item).attr("class", "btn btn-material-blue-500 btn-lg btn-block btn-raised");
                                    var text = codeMirror.getValue();
                                    if (text.indexOf(name + ".onClick(function(){\n\n});") == -1) {
                                        if (text.charAt(text.length - 1) != "\n" && text.length != 0)
                                            text += "\n";
                                        text += name + ".onClick(function(){\n\n});\n";
                                    }
                                    codeMirror.setValue(text);
                                    break;
                                case "email":
                                case "password":
                                case "text":
                                case "search":
                                case "tel":
                                case "url":
                                    item.setAttribute("class", "form-control");
                                    break;
                            }

                        }
                    }
                    catch (e) {
                        console.log("Error (wahrscheinlich kein Input):" + e);
                    }
                    try {
                        var textareas = editor.document.getElementsByTag("textarea");
                        for (counter = 0; counter < textareas.count(); counter++) {
                            item = textareas.getItem(counter);
                            name = item.getAttribute("data-cke-saved-name");
                            item.setAttribute("id", name);
                            item.setAttribute("class", "form-control input-lg");
                        }
                    }
                    catch (e) {
                        console.log("Error (wahrscheinlich keine Textarea):" + e);
                    }
                    changed = true;
                    codeMirror.refresh();
                }
            }
        }
    });

    codeMirror = CodeMirror.fromTextArea(textArea, {
        lineNumbers: true,
        lineWrapping: true,
        extraKeys: {"Ctrl-Space": "autocomplete",
            "F11": function(cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            } ,
            "Esc": function(cm) {
                if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
            }},
        mode: {name: "javascript", globalVars: true},
        autoCloseBrackets: true,
        styleActiveLine: true,
        fixedGutter: true,
        lint: true,
        coverGutterNextToScrollbar: false,
        gutters: ['CodeMirror-lint-markers'],
        theme : 'material',
        highlightSelectionMatches: {showToken: /\w/}

    });
    CodeMirror.commands.autocomplete = function (cm) {
        CodeMirror.showHint(cm, CodeMirror.hint.javascript);
    };

    //Fix for Autorefresh Plugin
    setInterval(function(){
        codeMirror.refresh();
    }, 200);
});

function composeHTML(){
    var txt = "<meta charset=\"UTF-8\">\n<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>App</title>\n<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css\">\n\n<link rel=\'stylesheet\' href=\'https://cdn.jsdelivr.net/bootstrap.material-design/0.3.0/css/material-fullpalette.min.css\'>\n<link rel=\"stylesheet\" href=\"https://cdn.rawgit.com/FezVrasta/snackbarjs/master/dist/snackbar.min.css\">\n<link rel=\"stylesheet\" href=\"https://cdn.rawgit.com/FezVrasta/snackbarjs/master/themes-css/material.css\">\n\n<script src=\"https://code.jquery.com/jquery-1.11.3.min.js\"></script>\n<script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js\"></script>\n\n<script src=\"https://cdn.rawgit.com/FezVrasta/snackbarjs/master/dist/snackbar.min.js\"></script>\n\n<script src=\"https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/ui/button.js\"></script>\n<script src=\"https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/ui/textArea.js\"></script>\n<script src=\"https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/ui/label.js\"></script>\n<script src=\"https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/ui/image.js\"></script>\n<script src=\"https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/ui/input.js\"></script>\n<script src=\"https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/ui/snackbar.js\"></script>\n<script src=\"https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/sensor/location.js\"></script>\n<script src=\"https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/sensor/orientation.js\"></script>\n<script src=\"https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/sensor/acceleration.js\"></script>\n<script src=\"https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/sensor/proximity.js\"></script>\n<script src=\"https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/sensor/light.js\"></script>\n<script src=\'https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/sensorObjects.js\'></script>";

    txt += "<script type=\'text/javascript\'>\n    document.onerror=function(error, url, line){\n        alert(\'Fehler: \"\'+error+\'\" in Zeile \'+line);\n    };";
    var inputs = editor.document.getElementsByTag("input");
    for (var counter = 0; counter < inputs.count(); counter++) {
        var item = inputs.getItem(counter);
        var id = item.getAttribute("id");
        if (item.getAttribute("type") == "button")
            txt += id + "= new Button('" + id + "');";
        else
            txt += id + "= new Input('" + id + "');";
    }
    var textareas = editor.document.getElementsByTag("textarea");
    for (counter = 0; counter < textareas.count(); counter++) {
        item = textareas.getItem(counter);
        id = item.getAttribute("id");
        txt += id + "= new TextArea('" + id + "');";
    }
    txt += "window.onload = function(){" + codeMirror.getValue() + "}";
    txt += "</script>";
    txt += "<div class='container'>" + editor.document.getBody().getHtml() + "</div>";
    return txt;
}

function update() {
    var ifrm = document.getElementById('runArea');
    ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;

    ifrm.src = "about:blank";

    ifrm.document.open();
    ifrm.document.write(composeHTML());
    ifrm.document.close();

    ifrm.onerror = function(error, url, line){
        $.snackbar({content: 'Fehler: "'+error+'" in Zeile '+line});
    };

    $('#modalPreview').modal();

}