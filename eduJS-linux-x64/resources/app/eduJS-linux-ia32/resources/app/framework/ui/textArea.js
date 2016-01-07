function TextArea(id){
    var id = id;

    this.addLine = function(text){
        document.getElementById(id).value += text+"\n";
    };

    this.setText = function(text){
        document.getElementById(id).value = text;
    };

    this.getText = function(){
        return document.getElementById(id).value;
    };

    this.setEditable = function(editable){
        document.getElementById(id).readOnly = !editable;
    };

    this.clear = function(){
        document.getElementById(id).value = "";
    }
}
