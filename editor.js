var codeMirror;
var editor;

var fname = null;

var changed = false;

function init() {
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
                            var name = item.getAttribute("data-cke-saved-name");
                            item.setAttribute("id", name);
                            switch (item.getAttribute("type")) {
                                case "button":
                                case "submit":
                                case "reset":
                                    item.setAttribute("class", "btn btn-material-blue-500 btn-lg btn-block btn-raised");
                                    var text = codeMirror.getValue();
                                    if (text.indexOf(name + ".onClick(function(){\n\n});\n") == -1) {
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

                    console.log(codeMirror.getValue());
                }
            }
        }
    });

    codeMirror = CodeMirror.fromTextArea(textArea, {
        lineNumbers: true,
        lineWrapping: true,
        autoRefresh: true,
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

    var element = document.getElementById("home");
    var offset = element.getBoundingClientRect().top;
    element = document.getElementById("fabRun");
    var height = element.getBoundingClientRect().bottom + 10;
    codeMirror.setSize( element.getBoundingClientRect().right + 10, height-offset);
}

function composeHTML(){
    var txt = "<meta charset=\"UTF-8\">\n<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>App</title>\n<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css\">\n\n<link rel=\'stylesheet\' href=\'https://cdn.jsdelivr.net/bootstrap.material-design/0.3.0/css/material-fullpalette.min.css\'>\n<link rel=\"stylesheet\" href=\"https://cdn.rawgit.com/FezVrasta/snackbarjs/master/dist/snackbar.min.css\">\n<link rel=\"stylesheet\" href=\"https://cdn.rawgit.com/FezVrasta/snackbarjs/master/themes-css/material.css\">\n\n<script src=\"https://code.jquery.com/jquery-1.11.3.min.js\"></script>\n<script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js\"></script>\n\n<script src=\"https://cdn.rawgit.com/FezVrasta/snackbarjs/master/dist/snackbar.min.js\"></script>\n\n<script src=\"https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/ui/button.js\"></script>\n<script src=\"https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/ui/textArea.js\"></script>\n<script src=\"https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/ui/label.js\"></script>\n<script src=\"https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/ui/image.js\"></script>\n<script src=\"https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/ui/input.js\"></script>\n<script src=\"https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/ui/snackbar.js\"></script>\n<script src=\"https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/sensor/location.js\"></script>\n<script src=\"https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/sensor/orientation.js\"></script>\n<script src=\"https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/sensor/acceleration.js\"></script>\n<script src=\"https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/sensor/proximity.js\"></script>\n<script src=\"https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/sensor/light.js\"></script>\n<script src=\'https://cdn.rawgit.com/aul12/Simple-HTML-Editor/master/framework/sensorObjects.js\'></script>\n";

    txt += "<script type='text/javascript'>";
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

function downloadFile(){
    document.getElementById("downloadLink").setAttribute("href", "data:text/html;charset=utf-8;ascii,"+composeHTML());
}

function saveFile() {
    if (fname == null)
        fname = prompt("Wie soll das Projekt heißen?");
    if(fname==null && fname.indexOf("example")>-1)
        return;
    var hr = new XMLHttpRequest();
    var url = "server/saveFile.php";

    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function () {
        if (hr.readyState == 4 && hr.status == 200) {
            console.log(hr.responseText);
        }
    };
    hr.send("html=" + encodeURIComponent(editor.document.getBody().getHtml()) +
    "&js=" + encodeURIComponent(codeMirror.getValue()) + "&fname=" + fname);
}

function openFile(){
    if(fname==null)
        fname = prompt("Wie heißt das Projekt?");
    if(fname==null)
        return;
    var hr = new XMLHttpRequest();
    var url = "server/openFile.php";

    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function () {
        if (hr.readyState == 4 && hr.status == 200) {
            var response = hr.response.split("#|#|#");
            editor.document.getBody().setHtml(response[0]);
            codeMirror.setValue(response[1]);
            codeMirror.refresh();
        }
    };
    hr.send("fname=" + fname);


}

function openDevice(){
    if(fname==null)
        fname = prompt("Wie soll das Projekt heißen?");
    if(fname==null)
        return;
    var hr = new XMLHttpRequest();
    var url = "server/openDevice.php";

    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function(){
        if(hr.readyState == 4 && hr.status == 200) {
            console.log(hr.responseText);
            var lochref = window.location.href.substr(0, window.location.href.length-1);
            $.snackbar({content: lochref+hr.responseText});
            document.getElementById("linkDevice").setAttribute("href", lochref+hr.responseText);
        }
    };
    hr.send("html="+encodeURIComponent(composeHTML())+"&fname="+fname);
}

function login(){
    console.log("Test");
    $('#modalLogin').modal();
}

function loginComplete(){
    var name = document.getElementById("inputName").value;
    var pass = document.getElementById("inputPassword").value;

    var hr = new XMLHttpRequest();
    var url = "server/login.php";

    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function(){
        if(hr.readyState == 4 && hr.status == 200) {
            $.snackbar({content: hr.responseText});
        }
    };
    hr.send("name="+encodeURIComponent(name)+"&pass="+pass);
}