function Image(id){
    this.id = id;

    this.setSRC = function(src){
        document.getElementById(this.id).src = src;
    };

    this.rotate = function(angle){
        document.getElementById(this.id).style.transform = "rotate("+angle+"deg)";
    }
}
