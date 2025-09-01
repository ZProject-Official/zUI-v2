import { FC, useState, useEffect } from "react";

import "./app.scss";

// Components
import Layout from "./layout/layout";
import Menu from "./features/menu/menu";
import Sounds from "./features/sounds";
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../utils/useNuiEvent";
import Info from "./features/info/info";

export interface themeProps {
  menu: {
    width: string;
    displayBanner: boolean;
    displayInformations: boolean;
    displayControlsIndicator: boolean;
    cornersRadius: number;
    perspective: boolean;
    margin: boolean;
    shadow: boolean;
    hoverStyle: string;
    animations: {
      entry: string;
      exit: string;
      onSwitch: boolean;
      onScroll: boolean;
    };
    keyPressDelay: number;
    sound: boolean;
    colors: {
      primary: string;
      background: string;
      description: string;
      informations: string;
      controlsIndicator: string;
      itemSelected: string;
      banner: string;
    };
    font: string;
    maxVisibleItems: number;
  };
  info: {
    width: string;
    cornersRadius: number;
    perspective: boolean;
    shadow: boolean;
    animations: {
      entry: string;
      exit: string;
    };
    colors: {
      primary: string;
      background: string;
    };
    font: string;
  };
  editMod: {
    menu: boolean;
    info: boolean;
  };
}

interface Feature {
  name: string;
  defaultPos: { x: number; y: number };
  component: (editMod: boolean) => JSX.Element;
  selected: boolean;
  position?: { x: number; y: number };
}

const initialFeatures: Feature[] = [
  {
    name: "menu",
    defaultPos: { x: 25, y: 25 },
    component: (editMod: boolean) => <Menu editMod={editMod} />,
    selected: false,
  },
  {
    name: "info",
    defaultPos: { x: 750, y: 25 },
    component: (editMod: boolean) => <Info editMod={editMod} />,
    selected: false,
  },
];

const App: FC = () => {
  const [editMod, setEditMod] = useState<boolean>(false);
  const [features, setFeatures] = useState<Feature[]>(initialFeatures);

  useNuiEvent(
    "app:setPositions",
    (data: { [key: string]: { x: number; y: number } }) => {
      setFeatures((prevFeatures) =>
        prevFeatures.map((feature) => {
          return {
            ...feature,
            position: data[feature.name] || feature.defaultPos,
          };
        })
      );
    }
  );

  useEffect(() => {
    const savedPositions = localStorage.getItem("layoutPositions");
    if (savedPositions) {
      const positions = JSON.parse(savedPositions);
      setFeatures((prevFeatures) =>
        prevFeatures.map((feature) => ({
          ...feature,
          position: positions[feature.name] || feature.defaultPos,
        }))
      );
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "e") {
        e.preventDefault();
        setEditMod(true);
        fetchNui("app:manageEditMod", { state: true });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOnSelected = (index: number) => {
    if (!editMod) {
      setFeatures(features.map((feature) => ({ ...feature, selected: false })));
      return;
    }

    setFeatures(
      features.map((feature, i) => ({
        ...feature,
        selected: i === index,
      }))
    );
  };

  const handlePositionChange = (
    index: number,
    position: { x: number; y: number }
  ) => {
    setFeatures((prevFeatures) => {
      const newFeatures = [...prevFeatures];
      newFeatures[index] = {
        ...newFeatures[index],
        position,
      };
      return newFeatures;
    });
  };

  const handleSave = () => {
    const positions = features.reduce(
      (acc, feature) => ({
        ...acc,
        [feature.name]: feature.position || feature.defaultPos,
      }),
      {}
    );
    localStorage.setItem("layoutPositions", JSON.stringify(positions));

    setEditMod(false);
    fetchNui("app:manageEditMod", {
      state: false,
    });
    fetchNui("app:savePositions", {
      positions: features.reduce(
        (acc, feature) => ({
          ...acc,
          [feature.name]: feature.position || feature.defaultPos,
        }),
        {}
      ),
    });
  };

  return (
    <div
      id="app"
      style={{
        background: `${editMod ? "rgba(0, 0, 0, 0.5)" : "transparent"}`,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleOnSelected(-1);
        }
      }}
    >
      <Sounds />
      {features.map((feature, index) => {
        return (
          <Layout
            index={index}
            key={feature.name}
            defaultPos={feature.position || feature.defaultPos}
            editMod={editMod}
            selected={feature.selected}
            children={() => feature.component(editMod)}
            onSelected={() => handleOnSelected(index)}
            onPositionChange={(position) =>
              handlePositionChange(index, position)
            }
          />
        );
      })}
      {editMod && (
        <div id="save" onClick={handleSave}>
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.5 1.25C4.5 1.11175 4.612 1 4.75 1C4.888 1 5 1.11175 5 1.25V2.25C5 2.38825 4.888 2.5 4.75 2.5C4.612 2.5 4.5 2.38825 4.5 2.25V1.25ZM2.25 3H5.75C5.888 3 6 2.88825 6 2.75V0H2V2.75C2 2.88825 2.112 3 2.25 3ZM7 0H6.5V3C6.5 3.276 6.276 3.5 6 3.5H2C1.724 3.5 1.5 3.276 1.5 3V0H1C0.44775 0 0 0.44775 0 1V7C0 7.55225 0.44775 8 1 8H7C7.55225 8 8 7.55225 8 7V1C8 0.44775 7.55225 0 7 0Z"
              fill="white"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default App;
