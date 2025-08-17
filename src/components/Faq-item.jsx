import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const FaqItem = React.forwardRef(function FaqItem(
  { question, answer, index, prefersReduced },
  ref
) {
  const [isOpen, setIsOpen] = React.useState(false);
  const panelId = React.useId();
  const motionTransition = prefersReduced
    ? { duration: 0 }
    : { duration: 0.3, ease: "easeInOut" };

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? false : { opacity: 0, y: 20, scale: 0.98 }}
      whileInView={
        prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
      }
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.4,
        delay: prefersReduced ? 0 : index * 0.1,
        ease: "easeOut",
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border transition-all duration-300",
        isOpen
          ? "shadow-lg border-neutral-700 bg-neutral-900"
          : "hover:shadow-md border-neutral-800 bg-black hover:border-neutral-700 hover:bg-neutral-900"
      )}
      whileHover={prefersReduced ? {} : { scale: 1.01 }}
      whileTap={prefersReduced ? {} : { scale: 0.99 }}
    >
      {/* Subtle border effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300",
          isOpen ? "opacity-100" : "group-hover:opacity-50"
        )}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r via-transparent from-neutral-800/50 to-neutral-800/50" />
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-controls={panelId}
        aria-expanded={isOpen}
        className="relative flex w-full items-center justify-between gap-4 px-6 py-6 text-left sm:px-8 sm:py-7"
      >
        <h3
          className={cn(
            "text-base font-semibold leading-relaxed transition-colors duration-200 sm:text-lg lg:text-xl",
            isOpen
              ? "text-neutral-100"
              : " text-neutral-200 group-hover:text-neutral-100"
          )}
        >
          {question}
        </h3>

        <div className="flex-shrink-0">
          <motion.div
            animate={
              prefersReduced ? { rotate: 0 } : { rotate: isOpen ? 180 : 0 }
            }
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200",
              isOpen
                ? "bg-neutral-800 text-neutral-100"
                : "bg-neutral-800 text-neutral-100 group-hover:bg-neutral-700 group-hover:text-neutral-300"
            )}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={prefersReduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={motionTransition}
            className="overflow-hidden"
          >
            <div className="border-t  px-6 pb-6 pt-4 sm:px-8 sm:pb-8 sm:pt-6 border-neutral-800">
              <motion.div
                initial={prefersReduced ? false : { y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={prefersReduced ? { opacity: 0 } : { y: -10, opacity: 0 }}
                transition={{ duration: 0.2, delay: prefersReduced ? 0 : 0.1 }}
                className="prose prose-gray max-w-none prose-invert"
              >
                <p className="text-sm leading-relaxed sm:text-base lg:text-lg text-neutral-100">
                  {answer}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
