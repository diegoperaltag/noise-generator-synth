# Design Document: Noise-generator Synthesizer

--

The Noise-generator Synthesizer is a web-based musical instrument designed to provide users a first encounter with noise textures in an interactive environment. This synthesizer leverages the Tone.js library for audio synthesis and Web MIDI API for MIDI input support

--

### 1.- Architecture and Audio Processing

The core architecture of the synthesizer centers around the Tone.js library, a powerful and flexible framework for creating music in the browser. The primary audio element is a Tone.Synth, a basic synthesizer capable of producing a wide range of sounds. To enhance the audio output, the design incorporates several audio effects, including FeedbackDelay, Freeverb, Distortion, and a Low Pass Filter.

Connecting these effects in a serial manner, with each effect linked to the previous one, results in a complex and rich audio output. The FeedbackDelay introduces a delayed and feedback-enriched sound, while the Freeverb simulates a reverb effect. Distortion adds grit and character, and the Low Pass Filter serves to control the brightness of the sound. These effects are adjustable in real-time through the volume and cutoff frequency sliders.

--

### 2.- MIDI Integration

MIDI input is a significant feature of the Noise-generator Synthesizer, enhancing its expressive capabilities. The Web MIDI API is employed to establish communication between the browser and external MIDI devices. Users can connect their MIDI keyboards to the synthesizer, and the instrument responds to note-on events, triggering musical loops in different pitch ranges.

The MIDI note mapping is structured to correspond to specific musical ranges, with C3, D3, E3, and F3 activating low, mid-low, mid-high, and high pitch ranges, respectively. This design decision provides a musical and intuitive mapping for users, aligning with common conventions in electronic music.

--

### 3.- User Interface and Interaction

The user interface is minimalistic and user-friendly, featuring sliders for volume and cutoff frequency, buttons to start the audio context and stop the musical loops, and clear instructions for operation. The startAudioContextButton initializes the audio context, ensuring smooth audio playback, while the stopButton halts the ongoing musical loop. Users can adjust the volume and cutoff frequency in real-time using the sliders, offering a dynamic and interactive experience.

--

### 4.- Design Philosophy

The design of the Noise-generator Synthesizer prioritizes simplicity, flexibility, and user engagement. By leveraging the capabilities of the Tone.js library, the synthesizer achieves a high level of audio fidelity and versatility. The integration of MIDI support expands the range of creative possibilities, making the instrument accessible to both novice and experienced musicians.

--


