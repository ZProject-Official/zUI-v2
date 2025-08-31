import { FC, useState, useEffect } from "react";

import switchSound from "../../assets/switch.mp3";
import enterSound from "../../assets/enter.mp3";
import backspaceSound from "../../assets/backspace.mp3";

type SoundItem = {
  id: number;
  type: string;
};

const Sounds: FC = () => {
  const [sounds, setSounds] = useState<SoundItem[]>([]);

  const addSound = (type: string) => {
    setSounds((prev) => [...prev, { id: Date.now() + Math.random(), type }]);
  };

  useEffect(() => {
    const handleMessage = (e: any) => {
      let event = e.data;
      if (event.type === "sounds:play") {
        addSound(event.data.sound);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const removeSound = (id: number) => {
    setSounds((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div>
      {sounds.map(({ id, type }) => {
        let src;
        switch (type) {
          case "switch":
            src = switchSound;
            break;
          case "enter":
            src = enterSound;
            break;
          case "backspace":
            src = backspaceSound;
            break;
          default:
            return null;
        }

        return (
          <audio
            key={id}
            src={src}
            onEnded={() => removeSound(id)}
            autoPlay
            onLoadedMetadata={(e) => {
              (e.currentTarget as HTMLAudioElement).volume = 0.25;
            }}
          />
        );
      })}
    </div>
  );
};

export default Sounds;
