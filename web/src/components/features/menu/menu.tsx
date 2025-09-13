import { FC, useState, useEffect, useRef, useMemo } from "react";
import { useNuiEvent } from "../../../utils/useNuiEvent";
import { themeProps } from "../../app";
import { AnimatePresence, motion } from "framer-motion";
import "./menu.scss";
import isUrl from "../../../utils/isUrl";
import getAnimation from "./animations";

// Props
interface infoProps {
  title: string;
  subtitle: string;
  description: string;
  theme: themeProps;
  banner: string;
}

interface historyProps {
  lastMenu: string;
  newMenu: string;
}

interface maskProps {
  start: number;
  end: number;
}

interface itemProps {
  type: string;
  colors?: string[];
  link?: string;
  label?: string;
  description?: string;
  state?: boolean;
  index?: number;
  placeholder?: string;
  value?: string;
  items?: string[];
  percentage?: number;
  step?: number;
  styles?: {
    IsDisabled?: boolean;
    LeftBadge?: string;
    ShowPercentage?: boolean;
    RightLabel?: string;
    RightBadge?: string;
  };
  position?: "left" | "center" | "right";
  itemId: string;
}

interface MenuProps {
  editMod?: boolean;
}

const listVariants = {
  initial: {},
  animate: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  initial: { y: 50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, bounce: 0.2, duration: 0.4 },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const debugData: itemProps[] = [
  {
    type: "separator",
    position: "center",
    itemId: "zUI:ActionIdentifier:1/261790",
    label: "Separator",
  },
  {
    type: "line",
    itemId: "zUI:ActionIdentifier:2/261790",
    colors: ["#ff0000", "#00ff00", "#0000ff"],
  },
  {
    description: "SearchBar",
    value: "",
    type: "searchbar",
    itemId: "zUI:ActionIdentifier:3/261790",
    placeholder: "Search...",
  },
  {
    description: "Button description :)",
    type: "button",
    itemId: "zUI:ActionIdentifier:4/261790",
    styles: { RightLabel: "RightLabel" },
    label: "Button",
  },
  {
    description: "ColorPicker description ;)",
    value: "#faad2c",
    type: "colorpicker",
    itemId: "zUI:ActionIdentifier:5/261790",
    styles: {},
    label: "ColorPicker",
  },
  {
    description: "Select do open link",
    itemId: "zUI:ActionIdentifier:6/261790",
    type: "linkbutton",
    link: "https://zsquad.fr",
    styles: {},
    label: "LinkButton",
  },
  {
    description: "test",
    type: "button",
    itemId: "zUI:ActionIdentifier:7/261790",
    styles: {
      RightBadge: "https://avatars.githubusercontent.com/u/25160833?s=280&v=4",
      LeftBadge: "https://avatars.githubusercontent.com/u/25160833?s=280&v=4",
    },
    label: "test",
  },
  {
    description: "Checkbox description",
    label: "Checkbox",
    type: "checkbox",
    itemId: "zUI:ActionIdentifier:8/261790",
    styles: {},
    state: false,
  },
  {
    description: "List description",
    index: 1,
    label: "List",
    type: "list",
    itemId: "zUI:ActionIdentifier:9/261790",
    styles: {},
    items: ["Item number 1", "Item number 2", "Item number 3"],
  },
  {
    description: "Slider description",
    itemId: "zUI:ActionIdentifier:10/261790",
    label: "Slider",
    type: "slider",
    step: 5,
    styles: { ShowPercentage: true },
    percentage: 10,
  },
  {
    description: "TextArea description",
    value: "",
    placeholder: "Write text",
    type: "textarea",
    itemId: "zUI:ActionIdentifier:11/261790",
    styles: {},
    label: "TextArea",
  },
  {
    description: "Color list description",
    index: 1,
    label: "ColorList",
    type: "colorslist",
    itemId: "zUI:ActionIdentifier:12/261790",
    styles: {},
    colors: ["#faad2c", "#ff00ff", "#ffffff"],
  },
];

// Items
import Line from "./items/line/line";
import Separator from "./items/separator/separator";
import Button from "./items/button/button";
import { fetchNui } from "../../../utils/fetchNui";
import Checkbox from "./items/checkbox/checkbox";
import LinkButton from "./items/linkbutton/linkbutton";
import List from "./items/list/list";
import Slider from "./items/slider/slider";
import TextArea from "./items/textArea/textArea";
import ColorPicker from "./items/colorPicker/colorPicker";
import ColorsList from "./items/colorsList/colorsList";
import SearchBar from "./items/searchBar/searchBar";
import formatString from "../../../utils/formatString";

const getHoverType = (type: string, color: string) => {
  if (!isUrl(color)) {
    switch (type) {
      case "complete":
        return { background: color };
      case "rod":
        return { borderLeft: `solid 0.25vw ${color}` };
      case "neon":
        return { background: `linear-gradient(to top, ${color}, transparent)` };
      case "border":
        return {
          outline: `2px solid ${color}`,
          outlineOffset: "-2px",
        };
      case "modern":
        return {
          background: `linear-gradient(to right, ${color}33, transparent)`,
          borderLeft: `solid 0.25vw ${color}`,
          boxShadow: `0 0 10px ${color}33`,
        };
      case "glowInset":
        return {
          background: color,
          borderRadius: "0.5rem",
          boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.5)",
        };
      case "twist":
        return {
          background: color,
          animation: "heatWave 2s infinite ease-in-out",
          borderRadius: "0.5rem",
        };
      case "liquid":
        return {
          background: color,
          animation: "liquidWobble 3s ease-in-out infinite",
          borderRadius: "0.5rem",
        };

      default:
        return { background: color };
    }
  } else {
    return {
      background: `url(${color})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };
  }
};

const SendMessage = (type: string, data: {}) => {
  window.postMessage({ type: type, data }, "*");
};

function renderMenuItem(
  item: itemProps,
  i: number,
  isSelected: boolean,
  theme: themeProps | undefined
) {
  switch (item.type) {
    case "line":
      return (
        <Line defaultColor={theme?.menu.colors.primary} colors={item.colors} />
      );
    case "separator":
      return <Separator label={item.label} position={item.position} />;
    case "button":
      return <Button {...item} isSelected={isSelected} />;
    case "checkbox":
      return (
        <Checkbox
          {...item}
          color={theme?.menu.colors.primary}
          state={item.state ?? false}
          isSelected={isSelected}
        />
      );
    case "linkbutton":
      return <LinkButton {...item} isSelected={isSelected} />;
    case "list":
      return <List {...item} isSelected={isSelected} />;
    case "slider":
      return (
        <Slider
          {...item}
          color={theme?.menu.colors.primary}
          isSelected={isSelected}
        />
      );
    case "textarea":
      return <TextArea {...item} isSelected={isSelected} />;
    case "colorpicker":
      return <ColorPicker {...item} isSelected={isSelected} />;
    case "colorslist":
      return <ColorsList {...item} isSelected={isSelected} />;
    case "searchbar":
      return <SearchBar {...item} isSelected={isSelected} />;
    default:
      return null;
  }
}

const Menu: FC<MenuProps> = ({ editMod = false }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [information, setInformation] = useState<infoProps | null>(null);
  const [items, setItems] = useState<itemProps[] | null>(null);
  const [index, setIndex] = useState<number>(1);
  const maxVisibleItemsParam = information?.theme.menu.maxVisibleItems ?? 8;
  const [mask, setMask] = useState<maskProps>({
    start: 0,
    end: maxVisibleItemsParam - 1,
  });
  const menuPosition = useRef({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const [indexHistory, setIndexHistory] = useState<{
    [key: string]: { index: number; mask: maskProps };
  }>({});

  useNuiEvent("app:applyTheme", (data: { theme: themeProps }) => {
    if (information) {
      setInformation({
        ...information,
        theme: data.theme,
      });
    }
  });

  useNuiEvent("menu:getHoveredItem", () => {
    if (items && usableItems[index - 1] !== undefined) {
      fetchNui("menu:sendHoveredItem", {
        id: items[usableItems[index - 1]].itemId,
      });
    } else {
      fetchNui("menu:sendHoveredItem", { id: "nothing" });
    }
  });

  const usableItems = useMemo(
    () =>
      items
        ?.map((item, index) => {
          if (
            item.type !== "line" &&
            item.type !== "separator" &&
            !item.styles?.IsDisabled
          ) {
            return index;
          }
          return undefined;
        })
        .filter((item): item is number => item !== undefined) ?? [],
    [items]
  );
  const numOfItems = useMemo(() => usableItems.length, [usableItems]);
  const maxVisibleItems = useMemo(
    () => Math.min(maxVisibleItemsParam, items?.length ?? maxVisibleItemsParam),
    [maxVisibleItemsParam, items]
  );

  useNuiEvent<historyProps>("menu:setIndexHistory", (data) => {
    let lastMenu: string = data.lastMenu;
    let newMenu: string = data.newMenu;
    if (lastMenu) {
      setIndexHistory((prev) => ({
        ...prev,
        [lastMenu]: {
          index: index,
          mask: mask,
        },
      }));
    }

    if (indexHistory[newMenu]) {
      setIndex(indexHistory[newMenu].index || 1);
      if (indexHistory[newMenu].mask) {
        setMask(indexHistory[newMenu].mask);
      } else {
        const usable =
          items
            ?.map((item, idx) =>
              item.type !== "line" &&
              item.type !== "separator" &&
              !item.styles?.IsDisabled
                ? idx
                : undefined
            )
            .filter((item): item is number => item !== undefined) ?? [];
        const nb = usable.length;
        const maxVisible = Math.min(
          maxVisibleItemsParam,
          items?.length ?? maxVisibleItemsParam
        );

        setMask({ start: 0, end: maxVisible - 1 });
      }
    } else {
      const usable =
        items
          ?.map((item, idx) =>
            item.type !== "line" &&
            item.type !== "separator" &&
            !item.styles?.IsDisabled
              ? idx
              : undefined
          )
          .filter((item): item is number => item !== undefined) ?? [];
      const maxVisible = Math.min(
        maxVisibleItemsParam,
        items?.length ?? maxVisibleItemsParam
      );
      setMask({ start: 0, end: maxVisible - 1 });
      setIndex(1);
    }
  });

  const keyIntervals = useRef<Map<string, number>>(new Map());

  const processKeyPress = (event: KeyboardEvent) => {
    if (!items) return;
    let item = items[usableItems[index - 1]];
    let id = index - 1;
    switch (event.key) {
      case "ArrowUp":
        if (
          !document.activeElement?.classList.contains("content") &&
          !document.activeElement?.classList.contains("search-bar")
        ) {
          let lastIndex = index;
          let newIndex;
          if (index > 1) {
            newIndex = index - 1;
            if (id <= 1 && usableItems[id] > 1) {
              setMask({ start: 0, end: maxVisibleItems - 1 });
            } else if (usableItems[id] <= mask.start) {
              setMask({ start: mask.start - 1, end: mask.end - 1 });
            }
          } else {
            newIndex = numOfItems || 1;
            setMask({
              start: Math.max(0, (items?.length ?? 0) - maxVisibleItems),
              end: (items?.length ?? 0) - 1,
            });
          }
          setIndex(newIndex);
          if (lastIndex !== newIndex) {
            if (information?.theme.menu.sound) {
              SendMessage("sounds:play", { sound: "switch" });
            }
          }
        }
        break;
      case "ArrowDown":
        if (
          !document.activeElement?.classList.contains("content") &&
          !document.activeElement?.classList.contains("search-bar")
        ) {
          let lastIndex = index;
          let newIndex;
          if (index < numOfItems) {
            newIndex = index + 1;
            if (
              id + 1 == usableItems.length - 1 &&
              usableItems[id] < (items?.length ?? maxVisibleItems)
            ) {
              setMask({
                start: Math.max(0, (items?.length ?? 0) - maxVisibleItems),
                end: (items?.length ?? 0) - 1,
              });
            } else if (usableItems[id] >= mask.end) {
              setMask({ start: mask.start + 1, end: mask.end + 1 });
            }
          } else {
            newIndex = 1;
            setMask({ start: 0, end: maxVisibleItems - 1 });
          }
          setIndex(newIndex);
          if (lastIndex !== newIndex) {
            if (information?.theme.menu.sound) {
              SendMessage("sounds:play", { sound: "switch" });
            }
          }
        }
        break;
      case "ArrowRight":
        if (item.type === "list" && item.index !== undefined && item.items) {
          if (information?.theme.menu.sound) {
            SendMessage("sounds:play", { sound: "switch" });
          }
          fetchNui("menu:useItem", {
            type: item.type,
            itemId: item.itemId,
            listChange: true,
            index: item.index < item.items.length ? item.index + 1 : 1,
          });
        } else if (
          item.type === "colorslist" &&
          item.index !== undefined &&
          item.colors
        ) {
          if (information?.theme.menu.sound) {
            SendMessage("sounds:play", { sound: "switch" });
          }
          fetchNui("menu:useItem", {
            type: item.type,
            itemId: item.itemId,
            listChange: true,
            index: item.index < item.colors.length ? item.index + 1 : 1,
          });
        } else if (
          item.type === "slider" &&
          item.percentage !== undefined &&
          item.step !== undefined
        ) {
          if (information?.theme.menu.sound) {
            SendMessage("sounds:play", { sound: "switch" });
          }
          fetchNui("menu:useItem", {
            type: item.type,
            itemId: item.itemId,
            percentageChange: true,
            percentage: Math.min(100, item.percentage + item.step),
          });
        }

        break;
      case "ArrowLeft":
        if (item.type === "list" && item.index !== undefined && item.items) {
          if (information?.theme.menu.sound) {
            SendMessage("sounds:play", { sound: "switch" });
          }
          fetchNui("menu:useItem", {
            type: item.type,
            itemId: item.itemId,
            listChange: true,
            index: item.index === 1 ? item.items.length : item.index - 1,
          });
        } else if (
          item.type === "colorslist" &&
          item.index !== undefined &&
          item.colors
        ) {
          if (information?.theme.menu.sound) {
            SendMessage("sounds:play", { sound: "switch" });
          }

          fetchNui("menu:useItem", {
            type: item.type,
            itemId: item.itemId,
            listChange: true,
            index: item.index === 1 ? item.colors.length : item.index - 1,
          });
        } else if (
          item.type === "slider" &&
          item.percentage !== undefined &&
          item.step !== undefined
        ) {
          if (information?.theme.menu.sound) {
            SendMessage("sounds:play", { sound: "switch" });
          }

          fetchNui("menu:useItem", {
            type: item.type,
            itemId: item.itemId,
            percentageChange: true,
            percentage: Math.max(0, item.percentage - item.step),
          });
        }

        break;
      case "Enter":
        if (information?.theme.menu.sound) {
          SendMessage("sounds:play", { sound: "enter" });
        }
        if (items) {
          if (item.type === "linkbutton") {
            //@ts-ignore
            window.invokeNative("openUrl", item.link);
          } else if (item.type === "textarea") {
            SendMessage("textArea:focus", { itemId: item.itemId });
          } else if (item.type === "searchbar") {
            SendMessage("searchBar:focus", { itemId: item.itemId });
          } else if (item.type === "colorpicker") {
            SendMessage("colorPicker:focus", { itemId: item.itemId });
          } else if (item.type === "list" || item.type === "colorlist") {
            fetchNui("menu:useItem", {
              itemId: item.itemId,
              type: item.type,
              index: item.index,
            });
          } else {
            fetchNui("menu:useItem", {
              itemId: item.itemId,
              type: item.type,
            });
          }
        }
        break;
      case "Backspace":
        if (
          !document.activeElement?.classList.contains("content") &&
          !document.activeElement?.classList.contains("search-bar")
        ) {
          if (information?.theme.menu.sound) {
            SendMessage("sounds:play", { sound: "backspace" });
          }
          fetchNui("menu:goBack");
          break;
        }
    }
  };

  const processKeyPressRef = useRef(processKeyPress);

  useEffect(() => {
    processKeyPressRef.current = processKeyPress;
  });

  useEffect(() => {
    const isEditableElement = (el: EventTarget | null) => {
      if (!(el instanceof HTMLElement)) return false;
      const tag = el.tagName.toLowerCase();
      const editable =
        tag === "input" || tag === "textarea" || el.isContentEditable;
      return editable;
    };
    const validKeys = [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "Enter",
      "Backspace",
    ];

    const handleKeyDown = (event: KeyboardEvent) => {
      const pressedKey = event.key;
      if (isEditableElement(event.target)) {
        if (pressedKey === "Enter") {
          processKeyPressRef.current({ key: pressedKey } as KeyboardEvent);
        }
        return;
      }
      event.preventDefault();
      if (!validKeys.includes(event.key)) return;
      if (keyIntervals.current.has(event.key)) return;

      if (pressedKey === "Enter") {
        if (event.repeat) return;
        processKeyPressRef.current({ key: pressedKey } as KeyboardEvent);
        return;
      } else {
        processKeyPressRef.current({ key: pressedKey } as KeyboardEvent);
        const delay =
          (pressedKey === "Backspace"
            ? 250
            : information?.theme.menu.keyPressDelay || 150) * 0.4;

        const interval = window.setInterval(() => {
          processKeyPressRef.current({ key: pressedKey } as KeyboardEvent);
        }, delay);

        keyIntervals.current.set(pressedKey, interval);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      event.preventDefault();
      if (!validKeys.includes(event.key)) return;

      const interval = keyIntervals.current.get(event.key);
      if (interval) {
        clearInterval(interval);
        keyIntervals.current.delete(event.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      keyIntervals.current.forEach((interval) => clearInterval(interval));
      keyIntervals.current.clear();
    };
  }, [information?.theme.menu]);

  useEffect(() => {
    if (!items || !visible) {
      keyIntervals.current.forEach((interval) => clearInterval(interval));
      keyIntervals.current.clear();
    }
  }, [items, visible]);

  const closeMenu = () => {
    setVisible(false);
    setInformation(null);
    setItems(null);
    setIndex(1);
    fetchNui("menu:closed");
  };

  useNuiEvent<infoProps>(
    "menu:show",
    ({ title, subtitle, description, banner, theme }) => {
      if (theme?.menu?.font) {
        const existingLink = document.querySelector(
          'link[data-font="customMenuFont"]'
        );
        if (existingLink) {
          existingLink.setAttribute("href", theme.menu.font);
        } else {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = theme.menu.font;
          link.setAttribute("data-font", "customMenuFont");
          document.head.appendChild(link);
        }
        const url = new URL(theme.menu.font);
        const familyParam = url.searchParams.get("family");
        const fontName =
          familyParam?.split(":")[0].replace(/\+/g, " ") || "sans-serif";
        document.documentElement.style.setProperty(
          "--custom-menu-font-family",
          fontName
        );
      }

      if (editMod) {
        setInformation({
          title: "Title",
          subtitle: "Subtitle",
          description: "Description",
          theme: theme!,
          banner: "",
        });
      } else {
        setInformation({
          title: title,
          subtitle: subtitle,
          description: description,
          theme: theme!,
          banner: banner,
        });
      }

      setMask({ start: 0, end: theme.menu.maxVisibleItems - 1 });
      setIndex(1);
      setVisible(true);
    }
  );

  useNuiEvent("menu:close", closeMenu);

  useNuiEvent<itemProps[]>("menu:loadItems", (items) => {
    if (!visible) {
      setVisible(true);
    }
    if (!editMod) {
      setItems(items);
      if (items.length - 1 - mask.start > mask.end) {
        const max = information?.theme?.menu?.maxVisibleItems ?? 8;
        setMask({
          start: mask.start,
          end: Math.min(items.length - 1, mask.start + max - 1),
        });
      }
    } else {
      setItems(debugData);
      setIndex(1);
      setMask({
        start: 0,
        end: (information?.theme?.menu?.maxVisibleItems ?? 8) - 1,
      });
    }
  });

  useEffect(() => {
    let timeout: number;

    if (visible && !editMod) {
      const checkTimeout = () => {
        timeout = setTimeout(() => {
          closeMenu();
        }, 780);
      };

      checkTimeout();

      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }
  }, [items, visible, editMod]);

  const defaultAnimations = { entry: "fadeIn", exit: "fadeOut" };

  const calculateRotation = () => {
    if (!menuRef.current || !information?.theme.menu?.perspective)
      return "rotateY(0deg)";

    const menuRect = menuRef.current.getBoundingClientRect();
    const centerX = window.innerWidth / 2;

    const menuCenterX = menuRect.left + menuRect.width / 2;

    const angleX = (centerX - menuCenterX) / 35;

    return `rotateY(${angleX}deg)`;
  };

  useEffect(() => {
    const updatePosition = () => {
      if (menuRef.current) {
        const rect = menuRef.current.getBoundingClientRect();
        menuPosition.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      }
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <AnimatePresence>
      {(visible || (information?.theme.editMod.menu && editMod)) && (
        <div id="menu-wrapper">
          <motion.div
            ref={menuRef}
            id="menu-container"
            initial={
              getAnimation(
                information?.theme.menu.animations ?? defaultAnimations
              ).initialAnim
            }
            animate={{
              ...getAnimation(
                information?.theme.menu.animations ?? defaultAnimations
              ).animateAnim,
              transform: calculateRotation(),
            }}
            exit={
              getAnimation(
                information?.theme.menu.animations ?? defaultAnimations
              ).exitAnim
            }
            style={
              !information?.theme.menu.margin
                ? {
                    minWidth: information?.theme.menu.width ?? "20vw",
                    maxWidth: information?.theme.menu.width ?? "20vw",
                    borderRadius: `${information?.theme.menu.cornersRadius}em`,
                    background: `${information?.theme.menu.colors.background}`,
                    boxShadow: `${
                      information?.theme.menu.shadow ? "0 0 10px black" : "none"
                    }`,
                  }
                : {
                    minWidth: information?.theme.menu.width ?? "20vw",
                    maxWidth: information?.theme.menu.width ?? "20vw",
                    gap: "1vh",
                    boxShadow: `${
                      information?.theme.menu.shadow ? "0 0 10px black" : "none"
                    }`,
                  }
            }
          >
            {information?.theme.menu.displayBanner && (
              <div
                id="banner"
                style={
                  isUrl(information?.banner)
                    ? {
                        borderRadius: `${
                          !information.theme.menu.margin
                            ? 0
                            : information?.theme.menu.cornersRadius
                        }em`,
                      }
                    : {
                        minHeight: "10vh",
                        borderRadius: `${
                          !information.theme.menu.margin
                            ? 0
                            : information?.theme.menu.cornersRadius
                        }em`,
                        ...(isUrl(information?.theme.menu.colors.banner)
                          ? {
                              backgroundImage: `url(${information?.theme.menu.colors.banner})`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                            }
                          : {
                              background: `${information?.theme.menu.colors.banner}`,
                            }),
                      }
                }
              >
                {isUrl(information?.banner) && (
                  <img src={information?.banner} alt="banner" id="image" />
                )}
                <div id="titles">
                  {information?.title && information?.title.length > 0 && (
                    <h1 id="title">{formatString(information?.title)}</h1>
                  )}
                  {information?.subtitle &&
                    information?.subtitle.length > 0 && (
                      <h1 id="subtitle">
                        {formatString(information?.subtitle)}
                      </h1>
                    )}
                </div>
              </div>
            )}
            {information?.theme.menu.displayInformations && (
              <div
                id="infos"
                style={
                  information?.theme.menu.margin
                    ? {
                        borderRadius: `${information?.theme.menu.cornersRadius}em`,
                        background: `${information?.theme.menu.colors.informations}`,
                      }
                    : {
                        background: `${information?.theme.menu.colors.informations}`,
                      }
                }
              >
                {information?.description &&
                  information?.description?.length > 0 && (
                    <h1 id="description">
                      {formatString(information?.description)}
                    </h1>
                  )}
                <h1 id="counter">
                  {index}/{numOfItems}
                </h1>
              </div>
            )}
            {items && items.length > 0 && (
              <div
                id="items-container"
                style={
                  information?.theme.menu.margin
                    ? {
                        borderRadius: `${information?.theme.menu.cornersRadius}em`,
                        height: `${maxVisibleItems * 4}vh`,
                        background: `${information?.theme.menu.colors.background}`,
                      }
                    : {
                        height: `${maxVisibleItems * 4}vh`,
                      }
                }
              >
                <span
                  id="hover-bar"
                  style={
                    information?.theme.menu.colors.itemSelected
                      ? {
                          ...getHoverType(
                            information.theme.menu.hoverStyle,
                            information?.theme.menu.colors.itemSelected
                          ),
                          top: `${(usableItems[index - 1] - mask.start) * 4}vh`,
                          transition: `${
                            information?.theme.menu.animations.onScroll
                              ? "0.5"
                              : "0"
                          }s`,
                        }
                      : {}
                  }
                />
                <AnimatePresence>
                  <motion.div
                    variants={
                      information?.theme.menu.animations.onSwitch
                        ? listVariants
                        : {}
                    }
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    id="items"
                  >
                    {items.map((item, i) => {
                      if (i >= mask.start && i <= mask.end) {
                        const isSelected = i === usableItems[index - 1];
                        return (
                          <motion.div
                            className="item"
                            key={item.itemId}
                            variants={
                              information?.theme.menu.animations.onSwitch
                                ? itemVariants
                                : {}
                            }
                          >
                            {renderMenuItem(
                              item,
                              i,
                              isSelected,
                              information?.theme
                            )}
                          </motion.div>
                        );
                      }
                      return null;
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
            {information?.theme.menu.displayControlsIndicator && (
              <div
                id="indicator"
                style={
                  information?.theme.menu.margin
                    ? {
                        borderRadius: `${information?.theme.menu.cornersRadius}em`,
                        background: `${information?.theme.menu.colors.controlsIndicator}`,
                      }
                    : {
                        background: `${information?.theme.menu.colors.controlsIndicator}`,
                      }
                }
              >
                <svg
                  width="12"
                  height="21"
                  viewBox="0 0 12 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 14L6 19L11 14M11 7L6 2L1 7"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
            )}
            {(() => {
              const selectedItem =
                items && usableItems[index - 1] !== undefined
                  ? items[usableItems[index - 1]]
                  : undefined;
              return (
                selectedItem &&
                selectedItem.description &&
                selectedItem.description.length > 0 && (
                  <motion.div
                    id="description"
                    key={selectedItem.description}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    style={
                      information?.theme.menu.margin
                        ? {
                            borderRadius: `${information?.theme.menu.cornersRadius}em`,
                            background: `${information?.theme.menu.colors.description}`,
                          }
                        : {}
                    }
                  >
                    {formatString(selectedItem.description)}
                  </motion.div>
                )
              );
            })()}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Menu;
