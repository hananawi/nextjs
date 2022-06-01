import { ChangeEvent, useEffect, useRef, useState } from "react";
import Layout from "../../components/layout";
import styles from "./index.module.scss";

// [
//   ['A1', 'B1', ...],
//   ['A2', 'B2', ...],
//   ['A3', 'B3', ...],
//   ...
// ]
const notes = Array(7)
  .fill(null)
  .map((_, index) =>
    ["A", "B", "C", "D", "E", "F", "G"].map((val) => val + (index + 1))
  );
let c = 0;
let frameId = 0;

function MyPage() {
  const [speed, setSpeed] = useState(5);
  const [octaveRange, setOctaveRange] = useState<[number, number]>([3, 4]);
  const [octaveInput, setOctaveInput] = useState<[number, number]>([3, 4]);
  const [hasStarted, setHasStarted] = useState(false);

  const pianoNoteRef = useRef<HTMLDivElement>(null);

  function callback(octaveRange: [number, number]) {
    c++;
    frameId = window.requestAnimationFrame(() => callback(octaveRange));
    if (c < (60 * 5) / speed) {
      // when speed is 5 one note last for 1s
      return;
    }
    const [l, r] = octaveRange;
    const octaveNumber = Math.floor(Math.random() * (r - l + 1) + l);
    pianoNoteRef.current.innerHTML =
      notes[octaveNumber - 1][Math.floor(Math.random() * 7)];
    c = 0;
  }

  function handleStart() {
    if (hasStarted) {
      return;
    }
    frameId = window.requestAnimationFrame(() => callback(octaveRange));
    setHasStarted(true);
  }

  function handleStop() {
    if (!hasStarted) {
      return;
    }
    window.cancelAnimationFrame(frameId);
    setHasStarted(false);
    c = 0;
  }

  function handleSpeedMinus() {
    if (speed <= 1) {
      return;
    }
    setSpeed((prev) => prev - 1);
  }

  function handleSpeedPlus() {
    if (speed >= 10) {
      return;
    }
    setSpeed((prev) => prev + 1);
  }

  function handleOctaveChange() {
    if (octaveInput[0] > octaveInput[1]) {
      return;
    }
    handleStop();
    setOctaveRange(octaveInput);
  }

  useEffect(() => {
    const progressBar = pianoNoteRef.current
      .nextElementSibling as HTMLDivElement;
    progressBar.style.setProperty("--duration", `${5 / speed}s`);
    handleStop();
  }, [speed]);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.noteContainer}>
          {/* set default value Cx */}
          <div className={styles.pianoNote} ref={pianoNoteRef}>
            {notes[octaveRange[0] - 1][2]}
          </div>
          <div
            className={`${styles.progressBar} ${
              hasStarted ? styles.active : ""
            }`}
          ></div>
        </div>
        <div>
          <div>
            <button className={styles.round} onClick={handleSpeedMinus}>
              -
            </button>
            <span>{speed}</span>
            <button className={styles.round} onClick={handleSpeedPlus}>
              +
            </button>
          </div>
          <div>
            <span>Octave Range: </span>
            <OctaveSelection
              defaultValue={octaveInput[0]}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setOctaveInput((prev) => [parseInt(e.target.value), prev[1]])
              }
            />
            <OctaveSelection
              defaultValue={octaveInput[1]}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setOctaveInput((prev) => [prev[0], parseInt(e.target.value)])
              }
            />
            <button onClick={handleOctaveChange}>Change</button>
          </div>
          <button
            className={hasStarted ? styles.forbidden : ""}
            onClick={handleStart}
          >
            Start
          </button>
          <button
            className={!hasStarted ? styles.forbidden : ""}
            onClick={handleStop}
          >
            Stop
          </button>
        </div>
      </div>
    </Layout>
  );
}

function OctaveSelection({ onChange, defaultValue }) {
  return (
    <select onChange={onChange} defaultValue={defaultValue}>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
      <option value={6}>6</option>
      <option value={7}>7</option>
    </select>
  );
}

export default MyPage;
