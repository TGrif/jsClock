
var audioCtx = window.AudioContext(); //console.log(audioCtx);





//var
//
//    jsClock =
            
    (function displayTime() {
        var currentTime = audioCtx.currentTime.toFixed(3);
//        var time = currentTime.split('.', currentTime);
//        var minutes = ~~(currentTime / 60);
//        console.log(typeof(currentTime));
//        document.querySelector('p').textContent = time[0] + ':' + time [1];
        document.querySelector('p').textContent = currentTime;
        
        requestAnimationFrame(displayTime);
    })(audioCtx);

//var d = new Date();
//	d.setSeconds(62);
//	 
//	alert(d);
//        
        
        
//        console.log(jsClock);