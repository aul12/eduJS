function Acceleration(){
    this.accWithGravity = 0;
    this.accWithoutGravity = 0;

    this.start = function(callback){
        window.addEventListener('devicemotion', function(e) {
            parent.accWithoutGravity = e.acceleration;
            parent.accWithGravity = e.accelerationIncludingGravity;
            callback(parent.accWithoutGravity, parent.accWithGravity);
        });
    };

}