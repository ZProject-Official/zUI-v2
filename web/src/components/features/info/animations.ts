interface AnimationsProps {
  entry: string;
  exit: string;
}

export default function getAnimation({ entry, exit }: AnimationsProps) {
  let initialAnim: any = {};
  let animateAnim: any = {};
  let exitAnim: any = {};

  switch (entry) {
    case "fadeIn":
      initialAnim = { opacity: 0 };
      animateAnim = { opacity: 1 };
      break;
    case "slideInHorizontal":
      initialAnim = { x: "25%", opacity: 0 };
      animateAnim = { x: "0%", opacity: 1 };
      break;
    case "slideInVertical":
      initialAnim = { y: "-25%", opacity: 0 };
      animateAnim = { y: "0%", opacity: 1 };
      break;
    case "zoomIn":
      initialAnim = { scale: 0.8, opacity: 0 };
      animateAnim = { scale: 1, opacity: 1 };
      break;
    case "rotateIn":
      initialAnim = { rotate: -45, opacity: 0 };
      animateAnim = { rotate: 0, opacity: 1 };
      break;
    case "bounceIn":
      initialAnim = { y: "-100%", opacity: 0 };
      animateAnim = {
        y: "0%",
        opacity: 1,
        transition: {
          type: "spring",
          bounce: 0.5,
        },
      };
      break;
    case "flipIn":
      initialAnim = { rotateX: 90, opacity: 0 };
      animateAnim = { rotateX: 0, opacity: 1 };
      break;
    default:
      initialAnim = { opacity: 0 };
      animateAnim = { opacity: 1 };
      break;
  }

  switch (exit) {
    case "fadeOut":
      exitAnim = { opacity: 0 };
      break;
    case "slideOutHorizontal":
      exitAnim = { x: "25%", opacity: 0 };
      break;
    case "slideOutVertical":
      exitAnim = { y: "-25%", opacity: 0 };
      break;
    case "zoomOut":
      exitAnim = { scale: 0.8, opacity: 0 };
      break;
    case "rotateOut":
      exitAnim = { rotate: 45, opacity: 0 };
      break;
    case "bounceOut":
      exitAnim = {
        y: "100%",
        opacity: 0,
        transition: {
          type: "spring",
          bounce: 0.5,
        },
      };
      break;
    case "flipOut":
      exitAnim = { rotateX: -90, opacity: 0 };
      break;
    default:
      exitAnim = { opacity: 0 };
      break;
  }

  return { initialAnim, animateAnim, exitAnim };
}
