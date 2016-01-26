$("#btnRun").click(function(){
    switch ($('input[name=radioDevice]:checked', '#formDevice').val()){
        case 'preview':
            update();
            $("#modalPreview").modal();
            break;
        case 'adb':
            if(fname == null)
                $("#modalSave").modal('show');
            else {
                fs.writeFile("./save/" + fname + "/index.html", composeHTML(), function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    installADB();
                    console.log("The file was saved!");
                });
            }
            break;
    }
});