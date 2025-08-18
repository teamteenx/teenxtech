"use client";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";

export const Navbar = ({ children, className }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  // Update only when threshold crossed
  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 100;
    setVisible((v) => (v !== next ? next : v));
  });

  // Keep CSS var --nav-h in sync
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const setVar = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--nav-h", `${h}px`);
    };
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    setVar();
    return () => ro.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      data-navbar
      role="navigation"
      aria-label="Primary"
      className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}
      style={{ willChange: "transform" }}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={false}
      animate={
        reduce
          ? {}
          : {
              y: visible ? 12 : 0,
              scale: visible ? 0.985 : 1,
            }
      }
      transition={{ type: "spring", stiffness: 220, damping: 40 }}
      style={{ willChange: "transform", transform: "translateZ(0)" }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl transform-gpu flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-transparent",
        visible &&
          "backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset]",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = React.memo(function NavItems({
  items,
  className,
  onItemClick,
}) {
  const [hovered, setHovered] = useState(null);
  const links = useMemo(() => items, [items]);

  const onClick = useCallback(
    (e, link) => {
      if (!onItemClick) return;
      e.preventDefault();
      onItemClick(link);
    },
    [onItemClick]
  );

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 transform-gpu flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition-colors duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className
      )}
    >
      {links.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={(e) => onClick(e, item.link)}
          className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
          key={item.name ?? `link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="nav-hover-bg"
              className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
              style={{ willChange: "transform, opacity" }}
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
});

export const MobileNav = ({ children, className, visible }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={false}
      animate={
        reduce
          ? {}
          : {
              y: visible ? 12 : 0,
              scale: visible ? 0.995 : 1,
            }
      }
      transition={{ type: "spring", stiffness: 220, damping: 40 }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] transform-gpu flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible &&
          "backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset]",
        className
      )}
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = React.memo(function MobileNavHeader({
  children,
  className,
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
});

export const MobileNavMenu = React.memo(function MobileNavMenu({
  children,
  className,
  isOpen,
  id,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={id}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950",
            className
          )}
          style={{
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export const MobileNavToggle = React.memo(function MobileNavToggle({
  isOpen,
  onClick,
  controlsId,
}) {
  return (
    <button
      type="button"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls={controlsId}
      onClick={onClick}
      className="p-2"
    >
      {isOpen ? (
        <X className="text-black dark:text-white" />
      ) : (
        <Menu className="text-black dark:text-white" />
      )}
    </button>
  );
});

export const NavbarLogo = React.memo(function NavbarLogo() {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
      aria-label="Homepage"
    >
      <Image
        src="/images/teenx.jpg"
        alt="TEENX TECH logo"
        width={30}
        height={30}
        priority
      />
      <span className="font-medium text-black dark:text-white sr-only">
        TEENX TECH
      </span>
    </a>
  );
});

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
