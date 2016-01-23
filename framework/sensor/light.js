function Light(){
    this.brightness = 0;
    this.start = function(callback){
        window.addEventListener('devicelight', function(event) {
            parent.brightness = event.value;
            callback(parent.brightness);
        });
    };

}