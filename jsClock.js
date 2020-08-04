/**
 * jsClock
 *   Web Audio Studio clock
 *
 *  TGrif 2015 - Licence MIT
 */


var jsClock = function(audioCtx, element, option) {

  this.clock = document.getElementById(element);

  this.audioCtx = audioCtx;

  this.time = 0;
  this.timeElapse = 0;

  this.tempo = option ? option.tempo : 120;
  
  this.possibleMesure = [ '4/4', '3/4', '5/4', '6/4' ];
  this.mesure = option ? option.mesure : this.possibleMesure[0];

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

    if (!this.audioCtx) {
      return console.error("Web Audio API error!");
    }

    this.setTempo();
    this.setMesure();

  },

  _startAnimation: function() {

    var displayTime = jsClock.prototype._displayTime.bind(this);

    try {
      this.frame = requestAnimationFrame(displayTime);
    } catch(e) {
      console.warn(e);
      console.info('requestAnimationFrame not supported, fallback to setTimeout');
      this.frame = window.setTimeout(displayTime, 1000 / 60);
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
    var milli = (time % 1).toFixed(2).split('.')[1];
    var seconds	= this._addZeroHelper( ~~ (time % 60));
    var minutes	= this._addZeroHelper( ~~ ((time / 60) % 60));
    var hours = this._addZeroHelper( ~~ ((time / (60 * 60)) % 60));

    return hours + ':' + minutes + ':' + seconds + ':' + milli;
  },

  _displayTime: function() {
    this.time = this._getTime() - this.timeElapse + this.timePause;
    this.clock.textContent = this._formatTime(this.time);
    this._startAnimation();
  },

  startClock: function() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.timeElapse = this._getTime();
    this._displayTime();
  },

  pauseClock: function() {
    if (!this.isRunning) return;
    this.isRunning = false;
    this.timePause = this.time;
    this._stopAnimation();
  },

  clearClock: function() {
    this.timeElapse = this._getTime();
    this._initClock();
    this._stopAnimation();
  },

  clockIsRunning: function() {
    return this.isRunning;
  },

  clockTime: function() {
    return this._formatTime(this.time);
  },

  getSampleRate: function() {
    return this.audioCtx.sampleRate + " Hz";
  },

  getTempo: function() {
    return this.tempo;
  },

  setTempo: function (tempo) {
    this.tempo = tempo || this.tempo;
    return this.tempo;
  },

  getMesure: function() {
    return this.mesure;
  },

  setMesure: function (mesure) {
    if (~this.possibleMesure.indexOf(mesure)) {
      this.mesure = mesure || this.mesure;
    }
    return this.mesure;
  },

  getMetronome: function() {
    return this.metronome.isRunning;
  },

  setMetronome: function() {

    if (!this.metronome.isRunning) {
      this.metronome.isRunning = true;
      console.info('starting metronome');
    } else {
      this.metronome.isRunning = false;
      console.info('stoping metronome');
    }

  }

}
