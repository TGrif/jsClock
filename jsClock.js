


    var

            jsClock = function() {
                this.audioCtx = window.AudioContext();
                this.clock = document.getElementById('studio_clock');
            };


            jsClock.prototype = {
                displayTime: function() {
                    this.time = this.audioCtx.currentTime.toFixed(3);
    //                console.log(this.time);
                    this.clock.textContent = this.time;
    //                requestAnimationFrame(function() { that.displayTime(); });
                    requestAnimationFrame(
                            jsClock.prototype.displayTime.bind(this)
                        );
                }
            };
        


            
            
//    (function displayTime() {
//        var currentTime = audioCtx.currentTime.toFixed(3);
//        document.querySelector('p').textContent = currentTime;        
//        requestAnimationFrame(displayTime);
//    })(audioCtx);




//        var minutes = ~~(currentTime / 60);
        
        
//        console.log(jsClock);

        
        studioClock = new jsClock();
        studioClock.displayTime();
