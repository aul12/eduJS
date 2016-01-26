function Proximity(){
    this.near = 0;
    this.start = function(callback){
        window.addEventListener('userproximity', function(event) {
            parent.near = event.near;
            callback(parent.near);
        });
    };

}