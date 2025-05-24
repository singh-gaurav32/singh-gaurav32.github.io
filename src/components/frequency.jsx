import React, { useEffect, useRef, useState } from "react";

const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const GuitarTuner = () => {
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [frequency, setFrequency] = useState(null);
  const [noteInfo, setNoteInfo] = useState(null);

  useEffect(() => {
    const setupAudio = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      sourceRef.current = source;

      const bufferLength = analyser.fftSize;
      const timeData = new Float32Array(bufferLength);

      const logFrequency = () => {
        analyser.getFloatTimeDomainData(timeData);
        const freq = autoCorrelate(timeData, audioContext.sampleRate);
        if (freq !== -1) {
          setFrequency(Math.round(freq));
          setNoteInfo(getNoteInfo(freq));
        } else {
          setFrequency(null);
          setNoteInfo(null);
        }

        animationFrameRef.current = requestAnimationFrame(logFrequency);
      };

      logFrequency();
    };

    setupAudio();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Guitar Tuner</h1>
      <h2>
        {frequency ? `Detected Frequency: ${frequency} Hz` : "Listening..."}
        {noteInfo && (
          <div>
            <h2>Note: {noteInfo.name}</h2>
            <p>Diff: {noteInfo.diff} Hz</p>
            <p>
              {noteInfo.isFlat
                ? "Too Flat"
                : noteInfo.isSharp
                ? "Too Sharp"
                : "In Tune"}
            </p>
          </div>
        )}
      </h2>
    </div>
  );
};

// Autocorrelation function
function autoCorrelate(buffer, sampleRate) {
  const SIZE = buffer.length;
  let rms = 0;
  for (let i = 0; i < SIZE; i++) {
    const val = buffer[i];
    rms += val * val;
  }
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) return -1;

  let r1 = 0,
    r2 = SIZE - 1,
    threshold = 0.2;

  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buffer[i]) < threshold) {
      r1 = i;
      break;
    }
  }
  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buffer[SIZE - i]) < threshold) {
      r2 = SIZE - i;
      break;
    }
  }

  buffer = buffer.slice(r1, r2);
  const newSize = buffer.length;
  const c = new Array(newSize).fill(0);

  for (let i = 0; i < newSize; i++) {
    for (let j = 0; j < newSize - i; j++) {
      c[i] += buffer[j] * buffer[j + i];
    }
  }

  let d = 0;
  while (c[d] > c[d + 1]) d++;

  let maxval = -1,
    maxpos = -1;
  for (let i = d; i < newSize; i++) {
    if (c[i] > maxval) {
      maxval = c[i];
      maxpos = i;
    }
  }

  let T0 = maxpos;
  return sampleRate / T0;
}

function getNoteInfo(frequency) {
  if (!frequency) return null;

  const noteNumber = 12 * Math.log2(frequency / 440) + 69;
  const roundedNote = Math.round(noteNumber);
  const noteName = NOTE_NAMES[roundedNote % 12];
  const octave = Math.floor(roundedNote / 12) - 1;

  const exactFreq = 440 * Math.pow(2, (roundedNote - 69) / 12);
  const diff = frequency - exactFreq;

  return {
    name: `${noteName}${octave}`,
    exactFreq: exactFreq,
    diff: diff.toFixed(2),
    isSharp: diff > 1,
    isFlat: diff < -1,
  };
}

export default GuitarTuner;
