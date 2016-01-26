function Input(id){
    var id = id;

    this.setText = function(text){
        document.getElementById(id).value = text;
    };

    this.getText = function(){
        return document.getElementById(id).value;
    };
}