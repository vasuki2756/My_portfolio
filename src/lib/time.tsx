"use client";

import { useEffect, useState } from "react";

export const Clock = ({ timezone }: { timezone: string }) => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: timezone,
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        setDateTime(formatter.format(now));
      } catch {
        setDateTime("");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  if (!dateTime)
    return (
      <span className="text-[10px] font-bold uppercase tracking-tight text-secondary">
        Loading...
      </span>
    );

  return <span className="text-[10px] font-bold tracking-tight text-primary">{dateTime}</span>;
};
