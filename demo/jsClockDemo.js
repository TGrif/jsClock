
document.addEventListener("DOMContentLoaded", function() {

  var audioContext = new (window.AudioContext || window.webkitAudioContext);
  var studioClock = new jsClock(audioContext, 'studio_clock');

  var start = document.getElementById("start");
  var clear = document.getElementById("clear");
  var sampleRate = document.getElementById('sampleRate');
  var bpm = document.getElementById('bpm');
  var mesure = document.getElementById('mesure');
  var metronome = document.getElementById("metronome");
  
  sampleRate.innerHTML = studioClock.getSampleRate();
  bpm.innerHTML = studioClock.getTempo();
  mesure.innerHTML = studioClock.getMesure();
  

  start.addEventListener('click', function() {
    if (!studioClock.clockIsRunning()) {
      studioClock.startClock();
      start.innerHTML = "pause";
      // metronome()
    } else {
      studioClock.pauseClock();
      start.innerHTML = "start";
    }
  })

  clear.addEventListener('click', function() {
    studioClock.clearClock();
    start.innerHTML = "start";
  })

  metronome.addEventListener('click', function() {
    studioClock.setMetronome();
  })

  bpm.addEventListener("click", function() {
    bpm.innerHTML = studioClock.setTempo(
      prompt("tempo", this.innerHTML)
    );
  })

  mesure.addEventListener('click', function() {
    mesure.innerHTML = studioClock.setMesure(
      prompt('mesure', this.innerHTML)
    );
  })

// function metronome() {
// 
//   console.log(studioClock.clockIsRunning())
//   if (!studioClock.clockIsRunning()) {
// 
//       var img = document.getElementById('metronome');
// 
//       var interval = window.setInterval(function() {
//         if (img.display == 'hidden') {
//             img.style.visibility = 'visible';
//         } else {
//             img.style.visibility = 'hidden';
//         }
//       }, 1000);
//   }
// }
  
})

