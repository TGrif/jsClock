/**
 * jsClock
 *	 Web Audio Studio clock
 *  
 *  TGrif 2015 - Licence MIT
 */


	var

        audioContext = window.AudioContext || window.webkitAudioContext,
            
		UTC = Date.now(),
                    
					

			jsClock = function() {

				this.version = '0.0.1';

				this.clock = document.getElementById('studio_clock');

				this.audioCtx = new audioContext();

				this.time = 0;
				this.timeElapse = 0;

				this.tempo = 120;
				this.mesure = '4/4';


				this._initClock();


				this.metronome = {

					isRunning: false,

					tempo: this.tempo,
					mesure: this.mesure/*,

					osc: function() { this.audioCtx.createOscillator(); }*/
					//TODO why this.audioCtx doesn't work in this case ?
				}

			}



			jsClock.prototype = {


				_addZero: function (num) {
					return (num < 10) ? '0' + num : num;
				},            


				_initClock: function() {

					this.timePause = 0;
					this.isRunning = false;
					this.clock.textContent = "00:00:00:00";

					if (this.audioCtx) {

						this.setTempo();
						this.setMesure();

						document.getElementById('sampleRate').innerHTML = this.audioCtx.sampleRate + " Hz";

					}

				},                


				_startAnimation: function() {

					try {
						this.frame = requestAnimationFrame(jsClock.prototype._displayTime.bind(this));
					} catch (e) {
						console.warn(e);
						console.info('setTimeout fallback');						
						this.frame = window.setTimeout(jsClock.prototype._displayTime.bind(this), 1000 / 60);
					}

				},


				_stopAnimation: function() {

					try {
						cancelAnimationFrame(this.frame);
					} catch (e) {
						console.warn(e);
						console.info('clearTimeout fallback');
						clearTimeout(this.frame);
					}

				},                


				_getTime: function() {
					return this.audioCtx.currentTime;
					//TODO fallBack
				},
                

				_formatTime: function (time) {

						var

							milli       = (time % 1).toFixed(2).split('.')[1],
							seconds     = this._addZero( ~~ (time % 60)),
							minutes     = this._addZero( ~~ ((time / 60) % 60)),
							hours       = this._addZero( ~~ ((time / (60 * 60)) % 60));

					return hours + ':' + minutes + ':' + seconds + ':' + milli;

				},


				_displayTime: function() {

					this.time = this._getTime() - this.timeElapse + this.timePause;
					this.clock.textContent = this._formatTime(this.time);
					this._startAnimation();

				},                



				startClock: function() {

					this.isRunning = true;
					this.timeElapse = this._getTime();
					this._displayTime();

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


				clockIsRunning: function() {  // deprecated
					return this.isRunning;
				},                


				clockTime: function() {
					return this._formatTime(this.time);
				},


				setTempo: function (tempo) {					
					this.tempo = tempo || this.tempo;  //TODO possibleTempo
					document.getElementById('bpm').innerHTML = this.tempo;
				},                


				setMesure: function (mesure) {

					var possibleMesure = [ '4/4', '3/4', '5/4' ];

					if (possibleMesure.indexOf(mesure) !== -1) {
						this.mesure = mesure || this.mesure;
					}

					document.getElementById('mesure').innerHTML = this.mesure;

				},


				setMetronome: function() {

					if (this.metronome.isRunning == false) {
						this.metronome.isRunning = true;
						console.info('starting metronome');
					} else {
						this.metronome.isRunning = false;
						console.info('stoping metronome');
					}

//                    console.log(this.time);
                    
                    // TODO make it blink
                    // TODO implements good metronome by cwillo
                    
                    
                    /*if (this.isRunning) {
                        
                        var img = document.getElementById('metronome');

                        var interval = window.setInterval(function() {
                            if (img.display == 'hidden') {
                                img.style.visibility = 'visible';
                            } else {
                                img.style.visibility = 'hidden';
                            }
                        }, 1000);
                    }*/
                    
                    
                }
                
                

            }
        



        
    var studioClock = new jsClock();
        
        
		
//        document.getElementById('start').onclick = () => studioClock.startClock();
        document.getElementById('start').onclick = function() {
            studioClock.startClock();
        }

        document.getElementById('pause').onclick = function() {
            studioClock.pauseClock();
        }

        document.getElementById('stop').onclick = function() {
            studioClock.stopClock();
        }




        document.getElementById('bpm').onclick = function() {
            studioClock.setTempo(
                    prompt('tempo', this.innerHTML)
                );
        }


        document.getElementById('mesure').onclick = function() {            
            studioClock.setMesure(
                    prompt('mesure', this.innerHTML)
                );
        }


        document.getElementById('metronome').onclick = function() {
            studioClock.setMetronome();
        }




// TODO calculer la durée d'une piste et afficher le temps restant

//TODO keep tempo and mesure in local storage or cookie when refresh page


//console.log(studioClock.metronome.osc());

