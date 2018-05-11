

document.addEventListener("DOMContentLoaded", function() {

	var audioContext = new (window.AudioContext || window.webkitAudioContext);
	var studioClock = new jsClock(audioContext, 'studio_clock');

		
		document.getElementById("start")
			.addEventListener("click", function() {
				studioClock.startClock();
			})

	document.getElementById("pause")
		.addEventListener("click", function() {
			studioClock.pauseClock();
		})

	document.getElementById("stop")
		.addEventListener("click", function() {
			studioClock.stopClock();
		})

	document.getElementById("metronome")
		.addEventListener("click", function() {
			studioClock.setMetronome();
		})

	document.getElementById("bpm")
		.addEventListener("click", function() {
			var tempo = prompt("tempo", this.innerHTML);
			studioClock.setTempo(tempo);
		})

	document.getElementById("mesure")
		.addEventListener("click", function() {
			var mesure = prompt('mesure', this.innerHTML);
			studioClock.setMesure(mesure);
		})

			
})

