/*
20 oscillators, vary them by dx, y is pitch
 */

var synths = [];
var gainVal = 0.1;

function openNotes(num){
    for(var i=0; i<num; i++){
       synths[i]= setupSynth();
    synths[i].volume.gain.value=0;
       synths[i].source.noteOn(0);
    }
}

function closeNotes(){
   for(var i=0; i<synths.length; i++){
       synths[i].source.noteOff(0);
    }
}

function updateNotes(pitch, variance){
   for(var i=0; i<synths.length; i++){
       synths[i].source.frequency.value = pitch + variance*Math.random();
    }
}

function onNotes(){
   for(var i=0; i<synths.length; i++){
       synths[i].volume.gain.value=gainVal;
    }
}


function offNotes(){
   for(var i=0; i<synths.length; i++){
       synths[i].volume.gain.value=0;
    }
}



function setupSynth(){
    var nodes={};
    nodes.source = context.createOscillator();
    nodes.source.type=2;
    nodes.filter = context.createBiquadFilter();
    nodes.volume = context.createGainNode();
    nodes.filter.type=0; //0 is a low pass filter

    nodes.volume.gain.value = gainVal;
    nodes.source.connect(nodes.filter);
    nodes.filter.connect(nodes.volume);
    //frequency val
    nodes.filter.frequency.value=2000;
    nodes.volume.connect(context.destination);
    return nodes;
}




