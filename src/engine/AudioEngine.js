import * as Tone from 'tone';

export class AudioEngine {
    constructor() {
        this.player = null;
        this.drone = null;
        this.binaural = null; // Initialize binaural property
        this.isInitialized = false;
        this.isPlaying = false;
    }

    async init() {
        if (this.isInitialized) return;
        await Tone.start();
        this.isInitialized = true;
        console.log('Audio Engine Initialized');
    }

    async playRaga(raga) {
        await this.init();

        if (this.player) {
            this.player.stop();
            this.player.dispose();
        }

        // In a real app, we'd load the audio file. 
        // For this demo, we'll synthesize a drone if audio is missing or just play the drone.
        // We will try to load the loop if it exists, else fallback to drone.

        console.log(`Playing ${raga.name}`);

        // Start Drone
        this.startDrone(raga.droneNote);

        // Simulate Loop Playback (since we don't have actual files)
        // In production: this.player = new Tone.Player(raga.audioPath).toDestination();
        // this.player.loop = true;
        // this.player.start();

        this.isPlaying = true;
    }

    startDrone(note) {
        if (this.drone) {
            this.drone.stop();
            this.drone.dispose();
        }

        // Create a rich drone sound using multiple oscillators
        this.drone = new Tone.PolySynth(Tone.Synth, {
            oscillator: {
                type: "fatsawtooth",
                count: 3,
                spread: 30
            },
            envelope: {
                attack: 2,
                decay: 1,
                sustain: 1,
                release: 2
            }
        }).toDestination();

        // Play root and fifth
        const root = Tone.Frequency(note).toFrequency();
        const fifth = Tone.Frequency(note).transpose(7).toFrequency();

        this.drone.triggerAttack([root, fifth]);
        this.drone.volume.value = -12; // Lower volume for background
    }

    stop() {
        if (this.player) this.player.stop();
        if (this.drone) this.drone.releaseAll();
        this.isPlaying = false;
    }

    setVolume(val) {
        Tone.Destination.volume.value = val;
    }

    // V2: Binaural Beats
    startBinaural(freq = 440, beatFreq = 5) { // 5Hz = Theta (meditation)
        this.stopBinaural();

        const left = new Tone.Oscillator(freq, "sine").toDestination().start();
        const right = new Tone.Oscillator(freq + beatFreq, "sine").toDestination().start();

        // Pan them hard left and right
        const pannerL = new Tone.Panner(-1).toDestination();
        const pannerR = new Tone.Panner(1).toDestination();

        left.connect(pannerL);
        right.connect(pannerR);

        this.binaural = { left, right, pannerL, pannerR };

        // Low volume for background
        left.volume.value = -20;
        right.volume.value = -20;
    }

    stopBinaural() {
        if (this.binaural) {
            this.binaural.left.stop();
            this.binaural.right.stop();
            this.binaural.left.dispose();
            this.binaural.right.dispose();
            this.binaural.pannerL.dispose();
            this.binaural.pannerR.dispose();
            this.binaural = null;
        }
    }
}

export const audioEngine = new AudioEngine();
