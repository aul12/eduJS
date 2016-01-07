function Orientation(){
    this.tiltLR = 0;
    this.tiltFB = 0;
    this.direction = 0;
    this.start = function(callback){
        window.addEventListener('deviceorientation', function(event) {
            parent.tiltLR = event.gamma;
            parent.tiltFB = event.beta;
            parent.direction = event.alpha;

            callback(parent.tiltLR, parent.tiltFB, parent.direction);
        });
    };

}