/**
 *  jsClock
 * studio clock for Web Audio API
 *  
 *  TGrif 2015 - Licence MIT
 *  
 */


    var



            jsClock = function() {
                
                this.audioCtx = window.AudioContext();
                this.clock = document.getElementById('studio_clock');
                
                this._initClock();
                
                this.time = 0;
                this.timeElapse = 0;
//                this.timePause = 0;

                this.running = false;
                
                
            };


//var now = new Date();
//var audioLoadOffset = (new Date() - now) / 1000;
//console.log(audioLoadOffset);



            jsClock.prototype = {
                
                
                _addZero: function(num) {
                    return (num < 10) ? '0' + num : num;
                },
            
            
                _initClock: function() {
                    // TODO reset audioCtx.currentTime
//                    this.timeElapse = this._getTime();
                    this.clock.textContent = "00:00:00:00";
                },
                
                
                _getTime: function() {
                    return this.audioCtx.currentTime;
                },
                
                
                _formatTime: function(time) {            
                    // inspired by https://github.com/jipodine/web-audio-clock/
                    
                        var

                            milli       = (time % 1).toFixed(2).split('.')[1],
                            seconds     = this._addZero( ~~ (time % 60)),
                            minutes     = this._addZero( ~~ ((time / 60) % 60)),
                            hours       = this._addZero( ~~ ((time / (60 * 60)) % 60));


                    return hours + ':' + minutes + ':' + seconds + ':' + milli;
                    
                },
                
                
                
                displayTime: function() {                    
                //var audioLoadOffset = (new Date() - this.now) / 1000;
                //console.log(audioLoadOffset);
                    this.running = true;
                    this.time = this._getTime() - this.timeElapse/* - audioLoadOffset*/;
                    
                    this.clock.textContent = this._formatTime(this.time);


                    this.frame = requestAnimationFrame(
                            jsClock.prototype.displayTime.bind(this)
                        );
          
                },
                
                
                pauseClock: function() {
                    this.running = false;
//                    this.timePause = this._getTime();
//                    this.timeElapse+=this.timePause;
//                    this.timeElapse = this._getTime();
                    cancelAnimationFrame(this.frame);
                },
                
                
                resetClock: function() {
                    
                    this.running = false;
                    this.timeElapse = this._getTime();
                    this._initClock();
                    
                    cancelAnimationFrame(this.frame);
                    
                }
                

            };
        



        
        var studioClock = new jsClock();
        
//        studioClock.displayTime();
        
        
        
        document.getElementById('start').onclick = function() {
            studioClock.displayTime();
        };
        
        document.getElementById('pause').onclick = function() {
            studioClock.pauseClock();
        };
        
        document.getElementById('stop').onclick = function() {
            studioClock.resetClock();
        };



//console.log(performance);
//console.log(performance.now() * 1e-3);
