

 document.addEventListener("DOMContentLoaded", function() {

	var	audioContext = new (window.AudioContext || window.webkitAudioContext),
		studioClock = new jsClock(audioContext, 'studio_clock');
			

		document.getElementById('start').onclick = function() {
			studioClock.startClock();
		}

		document.getElementById('pause').onclick = function() {
			studioClock.pauseClock();
		}

		document.getElementById('stop').onclick = function() {
			studioClock.stopClock();
		}

		document.getElementById('metronome').onclick = function() {
			studioClock.setMetronome();
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

});

