import React from "react";

import { Link } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const MobileOrbital = ({ timelineData, statusStyles }) => {
  return (
    <div className="block md:hidden">
      <div className="container mx-auto px-6 py-16">
        <header className="mb-6 flex justify-center">
          <div
            className="
              mx-auto mb-5 inline-flex items-center gap-2 rounded-full
              border px-4 py-1.5 text-sm font-medium 
              border-white/15 bg-white/10 text-white/80
            "
          >
            <span className="inline-block size-1.5 rounded-full bg-white/60" />
            Layanan Kami
          </div>
        </header>
        <ul className="space-y-4">
          {timelineData.map((item) => (
            <li key={item.id}>
              <Card className="border-white/15 bg-white/5">
                <CardHeader className="space-y-1 pb-2">
                  <div className="flex items-center justify-between">
                    <Badge
                      className={`px-2 text-xs ${statusStyles(item.status)}`}
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-white">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white/80">
                  <p className="text-base leading-relaxed">{item.content}</p>
                  {item.relatedService?.length > 0 && (
                    <div className="mt-4 border-t border-white/10 pt-3">
                      <div className="mb-2 flex items-center">
                        <Link size={12} className="mr-1 text-white/70" />
                        <span className="text-xs uppercase tracking-wider text-white/70">
                          Terkait
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.relatedService.map((rid) => (
                          <Badge
                            key={rid}
                            variant="outline"
                            className="border-white/20"
                          >
                            {timelineData.find((t) => t.id === rid)?.title ??
                              rid}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
