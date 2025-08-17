import React from "react";
import { SmartImage } from "@/components/ui/smart-image";

import { ArrowRight, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const DesktopOrbital = ({
  containerRef,
  onCanvasClick,
  orbitRef,
  timelineData,
  isRelated,
  expandedId,
  toggleItem,
  positions,
  statusStyles,
}) => {
  return (
    <div
      className="hidden h-[80vh] w-full items-center justify-center overflow-hidden bg-black md:flex"
      ref={containerRef}
      onClick={onCanvasClick}
    >
      <div
        ref={orbitRef}
        className="relative mx-auto flex size-[min(90vh,90vw)] items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        {/* Center orb (single image, responsive) */}
        <div className="absolute z-10 flex items-center justify-center rounded-full">
          <SmartImage
            src="/images/opium.png"
            alt="Opium"
            className="h-auto w-[160px] sm:w-[200px] lg:w-[260px]"
            width={520}
            height={520}
            sizes="(max-width: 1023px) 200px, (min-width: 1024px) 260px"
            quality={80}
            decoding="async"
          />
        </div>

        {/* Orbit guide */}
        <div className="absolute h-[65%] w-[65%] rounded-full border border-white/10" />

        {/* Nodes */}
        {timelineData.map((item, i) => {
          const pos = positions[i];
          const expanded = expandedId === item.id;
          const related = isRelated(item.id);
          const displayNumber = String(i + 1).padStart(2, "0");

          return (
            <div
              key={item.id}
              className="absolute will-change-transform"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px) translateZ(0)`,
                zIndex: expanded ? 200 : pos.zIndex,
                opacity: expanded ? 1 : pos.opacity,
                transition: "transform 300ms ease, opacity 300ms ease",
              }}
            >
              <button
                type="button"
                aria-expanded={expanded}
                aria-label={item.title}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
                className={[
                  "flex size-10 items-center justify-center rounded-full border-2 transition-all will-change-transform",
                  expanded
                    ? "scale-150 border-white bg-white text-black shadow-lg shadow-white/30"
                    : related
                    ? "border-white bg-white/60 text-black"
                    : "border-white/40 bg-black text-white",
                  "focus:outline-none focus:ring-2 focus:ring-white/60",
                ].join(" ")}
              >
                <span className="pointer-events-none select-none font-mono tabular-nums text-[11px] font-semibold leading-none sm:text-xs">
                  {displayNumber}
                </span>
              </button>

              <div
                className={[
                  "absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wider transition-all",
                  expanded ? "scale-110 text-white" : "text-white/70",
                ].join(" ")}
              >
                {item.title}
              </div>

              {expanded && (
                <Card className="absolute left-1/2 top-20 w-[22rem] -translate-x-1/2 overflow-visible border-white/30 bg-black/90 backdrop-blur-md shadow-xl shadow-white/10 lg:w-[28rem]">
                  <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-white/50" />
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge
                        className={`px-2 text-xs ${statusStyles(item.status)}`}
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2 text-lg lg:text-2xl">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-white/80">
                    <p className="text-base leading-relaxed lg:text-lg">
                      {item.content}
                    </p>

                    {!!item.relatedIds?.length && (
                      <div className="mt-4 border-t border-white/10 pt-3">
                        <div className="mb-2 flex items-center">
                          <Link size={12} className="mr-1 text-white/70" />
                          <h4 className="text-xs font-medium uppercase tracking-wider text-white/70">
                            Jasa Lainnya
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.relatedIds.map((rid) => {
                            const rel = timelineData.find((t) => t.id === rid);
                            return (
                              <Button
                                key={rid}
                                variant="outline"
                                size="sm"
                                className="h-6 rounded-none border-white/20 bg-transparent px-2 py-0 text-xs text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleItem(rid);
                                }}
                              >
                                {rel?.title ?? rid}
                                <ArrowRight
                                  size={10}
                                  className="ml-1 text-white/60"
                                />
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {!!item.relatedService?.length && (
                      <div className="mt-4 border-t border-white/10 pt-3">
                        <div className="mb-2 flex items-center">
                          <Link size={12} className="mr-1 text-white/70" />
                          <h4 className="text-xs font-medium uppercase tracking-wider text-white/70">
                            Jasa Terkait
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.relatedService.map((svc) => (
                            <Badge
                              key={svc}
                              variant="outline"
                              className="border-white/20 text-white/80"
                            >
                              {svc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
