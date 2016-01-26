function Button(id){
    var id = id;

    this.setText = function(text){
        document.getElementById(id).value = text;
    };

    this.onClick = function(callback){
        document.getElementById(id).onclick = callback;
    }
}
