$("#btnRun").click(function(){
    switch ($('input[name=radioDevice]:checked', '#formDevice').val()){
        case 'preview':
            $("#modalPreview").modal();
            break;
        case 'adb':
            installADB();
            break;
    }
});