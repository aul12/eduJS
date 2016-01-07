function Location(){
    this.latitude = 0;
    this.longitude = 0;
    this.start = function(callback){
        navigator.geolocation.watchPosition(function(position) {
            parent.latitude = position.coords.latitude;
            parent.longitude = position.coords.longitude;
            callback(parent.latitude, parent.longitude);
        });
    };

}