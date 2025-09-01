import { FC, useState, useRef, useEffect } from "react";
import { useNuiEvent } from "../../../utils/useNuiEvent";
import { themeProps } from "../../app";
import { AnimatePresence, motion } from "framer-motion";
import getAnimation from "./animations";
import Text from "./infos/text/text";
import Percent from "./infos/percent/percent";
import Image from "./infos/image/image";

import "./info.scss";
import { fetchNui } from "../../../utils/fetchNui";

interface infoProps {
  type: "text" | "percent" | "image";
  title: string;
  color?: string;
  value: string | number;
}

interface showProps {
  title: string;
  subtitle: string;
  theme: themeProps;
  infos: infoProps[];
}

const Info: FC<{ editMod: boolean }> = ({ editMod }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [theme, setTheme] = useState<themeProps>();
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [infos, setInfos] = useState<infoProps[]>([]);
  const infoRef = useRef<HTMLDivElement>(null);
  const infoTimeout = useRef<number | null>(null);

  useNuiEvent<showProps>("info:show", (data) => {
    if (data.theme?.info?.font) {
      const existingLink = document.querySelector(
        'link[data-font="customInfoFont"]'
      );
      if (existingLink) {
        existingLink.setAttribute("href", data.theme.info.font);
      } else {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = data.theme.info.font;
        link.setAttribute("data-font", "customInfoFont");
        document.head.appendChild(link);
      }
      const url = new URL(data.theme.info.font);
      const familyParam = url.searchParams.get("family");
      const fontName =
        familyParam?.split(":")[0].replace(/\+/g, " ") || "sans-serif";
      document.documentElement.style.setProperty(
        "--custom-info-font-family",
        fontName
      );
    }
    setTheme(data.theme);
    setTitle(data.title);
    setSubtitle(data.subtitle);
    setInfos(data.infos);
    setVisible(true);
    if (infoTimeout.current) clearTimeout(infoTimeout.current);
    infoTimeout.current = setTimeout(() => {
      setVisible(false);
    }, 500);
  });

  const calculateRotation = () => {
    if (!infoRef.current || !theme?.info?.perspective) return "rotateY(0deg)";

    const infoRect = infoRef.current.getBoundingClientRect();
    const centerX = window.innerWidth / 2;

    const infoCenterX = infoRect.left + infoRect.width / 2;

    const angleX = (centerX - infoCenterX) / 35;

    return `rotateY(${angleX}deg)`;
  };

  const defaultAnimations = { entry: "fadeIn", exit: "fadeOut" };

  useEffect(() => {
    if (!theme) {
      fetchNui<themeProps>("zUI:getTheme").then((response) => {
        console.log("Fetched theme:", response);
        setTheme(response);
      });
    }
  }, [editMod]);

  return (
    <AnimatePresence>
      {(visible || (theme?.editMod.info && editMod)) && (
        <div id="info-wrapper">
          <motion.div
            ref={infoRef}
            id="info-container"
            initial={
              getAnimation(theme?.info.animations ?? defaultAnimations)
                .initialAnim
            }
            animate={{
              ...getAnimation(theme?.info.animations ?? defaultAnimations)
                .animateAnim,
              transform: calculateRotation(),
            }}
            exit={
              getAnimation(theme?.info.animations ?? defaultAnimations).exitAnim
            }
            style={{
              minWidth: theme?.info.width ?? "20vw",
              maxWidth: theme?.info.width ?? "20vw",
              borderRadius: `${theme?.info.cornersRadius}em`,
              background: `${theme?.info.colors.background}`,
              boxShadow: `${theme?.info.shadow ? "0 0 10px black" : "none"}`,
            }}
          >
            <h1 id="title">{!editMod ? title : "Title"}</h1>
            <h1 id="subtitle">{!editMod ? subtitle : "Subtitle"}</h1>
            <div id="infos">
              {(!editMod
                ? infos
                : [
                    { type: "text", title: "Title", value: "value" },
                    { type: "percent", title: "Title", value: 50 },
                    {
                      type: "image",
                      title: "Title",
                      value:
                        "https://www.terdav.com/Content/img/mag/vignettes/grande/1515.jpg",
                    },
                  ]
              ).map((info) => {
                switch (info.type) {
                  case "text":
                    return <Text {...info} />;
                  case "percent":
                    if (typeof info.value === "number" && theme) {
                      return (
                        <Percent {...info} value={info.value} theme={theme} />
                      );
                    }
                  case "image":
                    return <Image {...info} />;
                }
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Info;
