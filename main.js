document.addEventListener("DOMContentLoaded", function () {
    console.log('DOM content loaded');

    const synth = new Tone.Synth().toDestination();
    const volumeInput = document.getElementById("volumeInput");
    const cutoffInput = document.getElementById("cutoffInput");

    // Create effects (FeedbackDelay, Freeverb, Distortion, Filter) and connect them
    const feedbackDelay = new Tone.FeedbackDelay({
        delayTime: 0.5,
        feedback: 0.5,
    }).toDestination();

    const reverb = new Tone.Freeverb().toDestination();

    const distortion = new Tone.Distortion(1.5).toDestination();

    const lowPassFilter = new Tone.Filter({
        frequency: 5000, // Default cutoff frequency
        type: "lowpass", // Use lowpass filter type
        rolloff: -12,    // Default rolloff (dB/octave)
    }).toDestination();

    // Connect the feedback delay and synth to the reverb
    feedbackDelay.connect(reverb);
    synth.connect(reverb);

    // Connect the reverb to the distortion
    reverb.connect(distortion);

    // Connect the distortion to the low pass filter
    distortion.connect(lowPassFilter);

    // Set the BPM to control the playback speed
    Tone.Transport.bpm.value = 200; // Adjust the BPM as needed

    // Volume fader input element
    volumeInput.addEventListener("input", () => {
        // Set the volume of the synth based on the input value
        synth.volume.value = parseFloat(volumeInput.value);
    });

    // Cutoff fader input element
    cutoffInput.addEventListener("input", () => {
        // Set the cutoff frequency of the low pass filter based on the input value
        lowPassFilter.frequency.value = parseFloat(cutoffInput.value);
    });

    // Button to start AudioContext

    // AudioContext is crucial because it is an essential step in initializing and activating the audio processing system. 
    // The Web Audio API, which Tone.js builds upon, requires an AudioContext to create and process audio. 
    // The AudioContext is a central object in the Web Audio API, and it is the interface to the audio hardware of the computer. 
    // It is the main way to create and manipulate audio.
    
    const startAudioContextButton = document.getElementById("startAudioContextButton");

    startAudioContextButton.addEventListener("click", async () => {
        try {
            await Tone.start();
            console.log('Audio context started');
        } catch (error) {
            console.error('Error starting audio context:', error);
        }
    });

    let loopEvent;

    const startLoop = (midiLow, midiHigh) => {
        // Clear any existing loop event
        if (loopEvent) {
            loopEvent.stop();
        }

        loopEvent = new Tone.Sequence((time, index) => {
            playRandomMelody(time, index, midiLow, midiHigh);
        }, Array.from({ length: 32 }, (_, index) => index), "32n");

        loopEvent.start();
        Tone.Transport.start();
    };

    const stopLoop = () => {
        // Stop the loop event
        if (loopEvent) {
            loopEvent.stop();
        }

        // Stop the Tone.Transport
        Tone.Transport.stop();
    };

    const playRandomMelody = (time, index, midiLow, midiHigh) => {
        const randomPitch = Tone.Frequency(midiLow + Math.random() * (midiHigh - midiLow), "midi").toNote();
        const noteTime = time + index * 0.05;
        synth.triggerAttackRelease(randomPitch, "32n", noteTime);
    };

    const stopButton = document.getElementById("stopButton");

    stopButton.addEventListener("click", stopLoop);

    listenToMidiInput();

    function listenToMidiInput() {
        WebMidi.enable(function (err) {
            if (err) {
                console.log("WebMidi could not be enabled.", err);
            } else {
                console.log("WebMidi enabled!");
                WebMidi.inputs.forEach(input => {
                    input.addListener('noteon', 'all', function (e) {
                        handleMidiNoteOn(e.note.number);
                    });
                });
            }
        });
    }

    function handleMidiNoteOn(midiNote) {
        let midiLow, midiHigh;

        switch (midiNote) {
            case Tone.Midi("C3").toMidi():
                midiLow = 21;
                midiHigh = 45;
                break;
            case Tone.Midi("D3").toMidi():
                midiLow = 46;
                midiHigh = 65;
                break;
            case Tone.Midi("E3").toMidi():
                midiLow = 66;
                midiHigh = 85;
                break;
            case Tone.Midi("F3").toMidi():
                midiLow = 86;
                midiHigh = 107;
                break;
            default:
                return;
        }

        startLoop(midiLow, midiHigh);
    }
});
