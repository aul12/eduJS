$("#btnRun").click(function(){
    switch ($('input[name=radioDevice]:checked', '#formDevice').val()){
        case 'preview':
            update();
            $("#modalPreview").modal();
            break;
        case 'adb':
            installADB();
            break;
    }
});