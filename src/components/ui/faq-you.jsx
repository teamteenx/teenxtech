"use client";
import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaqItem } from "../Faq-item";

export const FaqYou = React.forwardRef(
  (
    {
      className,
      title = "Frequently Asked Questions",
      description,
      items = [],
      contactInfo,
      badgeText = "FAQ",
      ...props
    },
    ref
  ) => {
    const prefersReduced = useReducedMotion();

    return (
      <section
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden  py-20 sm:py-24 lg:py-32 bg-black",
          className
        )}
        {...props}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0  opacity-[0.05]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z' fill-rule='nonzero'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with AnimatePresence on scroll */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 30 }}
            whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 lg:mb-20"
          >
            {/* Enhanced Badge */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mx-auto mb-6 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur-sm border-neutral-800 bg-neutral-900 text-neutral-200"
            >
              <Sparkles className="h-4 w-4 animate-pulse" aria-hidden="true" />
              <span>{badgeText}</span>
            </motion.div>

            {/* Enhanced Title */}
            <motion.h2
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4 bg-gradient-to-r bg-clip-text text-3xl font-bold leading-tight tracking-tight text-transparent sm:text-4xl lg:text-5xl from-neutral-100 via-white to-neutral-100"
            >
              {title}
            </motion.h2>

            {description && (
              <motion.p
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-base leading-relaxed  sm:text-lg lg:text-xl text-neutral-400"
              >
                {description}
              </motion.p>
            )}
          </motion.div>

          {/* FAQ Items with AnimatePresence on scroll */}
          <div className="mx-auto max-w-4xl space-y-4 sm:space-y-6">
            {items.map((item, index) => (
              <FaqItem
                key={index}
                question={item.question}
                answer={item.answer}
                index={index}
                prefersReduced={prefersReduced}
              />
            ))}
          </div>

          {/* Enhanced Contact CTA with AnimatePresence biar kerean aja */}
          {contactInfo && (
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 30 }}
              whileInView={
                prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-16 max-w-lg rounded-2xl border border-neutral-800 p-8 text-center shadow-xl backdrop-blur-sm sm:mt-20 bg-neutral-900"
            >
              <motion.div
                initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.4,
                  delay: 0.4,
                  type: "spring",
                  stiffness: 200,
                }}
                className="mx-auto mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full shadow-lg bg-white"
              >
                <Mail className="h-5 w-5 text-black" aria-hidden="true" />
              </motion.div>

              <motion.h3
                initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mb-2 text-lg font-semibold text-neutral-100"
              >
                {contactInfo.title}
              </motion.h3>

              <motion.p
                initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="mb-6 text-sm leading-relaxed  text-neutral-400"
              >
                {contactInfo.description}
              </motion.p>

              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <Link href="#contact">
                  <Button
                    size="lg"
                    onClick={contactInfo.onContact}
                    className="group relative overflow-hidden rounded-full px-8 py-3 font-semibold shadow-lg transition-all duration-300  hover:shadow-xl hover:scale-105 bg-white text-black hover:bg-neutral-100"
                  >
                    <span className="relative z-10">
                      {contactInfo.buttonText}
                    </span>
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
    );
  }
);
