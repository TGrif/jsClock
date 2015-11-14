/**
 *  jsClock
 * web audio API studio clock
 *  
 *  TGrif 2015 - MIT Licence
 */


    var



            jsClock = function() {
                this.audioCtx = window.AudioContext();
                this.clock = document.getElementById('studio_clock');
            };





            jsClock.prototype = {
                
                
                _getTime: function() {
                    return this.audioCtx.currentTime.toFixed(3);
                },
                
                
                
                displayTime: function() {                    

                    this.clock.textContent = this._getTime();

                    this.frame = requestAnimationFrame(
                            jsClock.prototype.displayTime.bind(this)
                        );
          
                },
                
                
                resetClock: function() {
                    cancelAnimationFrame(this.frame);
                    this.clock.textContent = "0.000";
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
        
        
        document.getElementById('start').onclick = function() {
            studioClock.displayTime();
        };
        
        document.getElementById('stop').onclick = function() {
            studioClock.resetClock();
        };
