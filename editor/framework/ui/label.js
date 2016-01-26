function Label(id){
    this.id = id;

    this.setText = function(text){
        document.getElementById(id).innerHTML = text;
    }
}
