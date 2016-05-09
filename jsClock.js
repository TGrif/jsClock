/**
 * jsClock
 *	 Web Audio Studio clock
 *  
 *  TGrif 2015 - Licence MIT
 */

					

	jsClock = function (audioCtx, element) {

		this.version = '0.0.2';

		this.clock = document.getElementById(element);

		this.audioCtx = audioCtx;

		this.time = 0;
		this.timeElapse = 0;

		this.tempo = 120; // default tempo
		this.mesure = '4/4'; // default mesure


		this._initClock();


		this.metronome = {

			isRunning: false,

			tempo: this.tempo,
			mesure: this.mesure

		}

	}




		jsClock.prototype = {


			_addZeroHelper: function (num) {
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

				} else {
					console.error("Web Audio API error!");
				}

			},


			_startAnimation: function() {

				try {
					this.frame = requestAnimationFrame(jsClock.prototype._displayTime.bind(this));
				} catch (e) {
					console.warn(e);
					console.info('requestAnimationFrame not supported, fallback to setTimeout');
					this.frame = window.setTimeout(jsClock.prototype._displayTime.bind(this), 1000 / 60);
				}

			},


			_stopAnimation: function() {

				try {
					cancelAnimationFrame(this.frame);
				} catch (e) {
					console.warn(e);
					console.info('cancelAnimationFrame not supported, fallback to clearTimeout');
					clearTimeout(this.frame);
				}

			},


			_getTime: function() {
				return this.audioCtx.currentTime;
			},


			_formatTime: function (time) {

					var

						milli = (time % 1).toFixed(2).split('.')[1],
						seconds	= this._addZeroHelper( ~~ (time % 60)),
						minutes	= this._addZeroHelper( ~~ ((time / 60) % 60)),
						hours = this._addZeroHelper( ~~ ((time / (60 * 60)) % 60));

				return hours + ':' + minutes + ':' + seconds + ':' + milli;

			},


			_displayTime: function() {

				this.time = this._getTime() - this.timeElapse + this.timePause;
				this.clock.textContent = this._formatTime(this.time);
				this._startAnimation();

			},



			/**
			 * Starting the clock
			 */
			startClock: function() {

				this.isRunning = true;
				this.timeElapse = this._getTime();

				this._displayTime();

			},


			/**
			 * Pausing the clock
			 */
			pauseClock: function() {

				if (this.isRunning) {

					this.isRunning = false;
					this.timePause = this.time;

					this._stopAnimation();

				}

			},


			/**
			 * Stoping the clock
			 */
			stopClock: function() {

				this.timeElapse = this._getTime();
				this._initClock();

				this._stopAnimation();

			},


			clockIsRunning: function() {
				return this.isRunning;
			},


			clockTime: function() {
				return this._formatTime (this.time);
			},


			setTempo: function (tempo) {					
				this.tempo = tempo || this.tempo;
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


