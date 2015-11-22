/**
 *  jsClock
 * studio clock for Web Audio API
 *  
 *  TGrif 2015 - Licence MIT
 */


    var



                jsClock = function() {

                    this.audioCtx = window.AudioContext() || window.webkitAudioContext();
                    
                    this.clock = document.getElementById('studio_clock');

                    this._initClock();

                    this.time = 0;
                    this.timeElapse = 0;


                };





            jsClock.prototype = {
                
                
                
                _addZero: function(num) {
                    return (num < 10) ? '0' + num : num;
                },
            
            
            
                _initClock: function() {
                    
                    this.timePause = 0;
                    this.isRunning = false;
                    this.clock.textContent = "00:00:00:00";
                    
                },
                
                
                
                _stopAnimation: function() {
                    
                    try {
                        cancelAnimationFrame(this.frame);
                    } catch (e) { //clearTimeout fallback
                        clearTimeout(this.frame);
                    }
                    
                },
                
                
                
                _startAnimation: function() {
                    
                        try {
                            this.frame = requestAnimationFrame(
                                    jsClock.prototype.displayTime.bind(this)
                                );
                        } catch (e) { //setTimeout fallback
                            this.frame = window.setTimeout(
                                    jsClock.prototype.displayTime.bind(this)
                                , 1000 / 60);
                        }

                },
                
                
                
                _getTime: function() {
                    //TODO find fallBack for audioCtx.currentTime
                    return this.audioCtx.currentTime;
                },
                
                
                
                _formatTime: function(time) {
                    
                      var

                            milli       = (time % 1).toFixed(2).split('.')[1],
                            seconds     = this._addZero( ~~ (time % 60)),
                            minutes     = this._addZero( ~~ ((time / 60) % 60)),
                            hours       = this._addZero( ~~ ((time / (60 * 60)) % 60));


                    return hours + ':' + minutes + ':' + seconds + ':' + milli;
                    
                },
                
                
                
                
                
                displayTime: function() {
                    
                    this.time = this._getTime() - this.timeElapse + this.timePause;
                    
                    this.clock.textContent = this._formatTime(this.time);                    
                    
                        this._startAnimation();
                        
                },
                
                
                
                startClock: function() {
                    
                    this.isRunning = true;
                    this.timeElapse = this._getTime();
                    this.displayTime();
                    
                },
                
                
                
                pauseClock: function() {
                    
                    if (this.isRunning) {
                        
                        this.isRunning = false;
                        this.timePause = this.time;

                            this._stopAnimation();
                    }
                    
                },
                
                
                
                stopClock: function() {
                    
                    this.timeElapse = this._getTime();
                    this._initClock();
                    
                        this._stopAnimation();
                    
                },
                
                
                
                clockIsRunning: function() {
                    return this.isRunning;
                }
                


            };
        



        
        
        var studioClock = new jsClock();
        
        
        
            document.getElementById('start').onclick = function() {
                studioClock.startClock();
            };

            document.getElementById('pause').onclick = function() {
                studioClock.pauseClock();       
            };

            document.getElementById('stop').onclick = function() {
                studioClock.stopClock();
            };



