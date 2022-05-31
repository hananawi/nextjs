import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    const progressBar = pianoNoteRef.current
      .nextElementSibling as HTMLDivElement;
    progressBar.style.setProperty("--duration", `${5 / speed}s`);
    handleStop();
  }, [speed]);

  return (
    <Layout>
      <div className={styles.noteContainer}>
        {/* set default value Cx */}
        <div className={styles.pianoNote} ref={pianoNoteRef}>
          {notes[octaveRange[0] - 1][2]}
        </div>
        <div
          className={`${styles.progressBar} ${hasStarted ? styles.active : ""}`}
        ></div>
      </div>
      <div>
        <div>
          <button onClick={handleSpeedMinus}>-</button>
          <span>{speed}</span>
          <button onClick={handleSpeedPlus}>+</button>
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
    </Layout>
  );
}

export default MyPage;
