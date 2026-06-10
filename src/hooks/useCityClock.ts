import { useEffect, useState } from "react";

const TIMEZONE = "Australia/Melbourne";

function formatTime(): string {
  return new Intl.DateTimeFormat("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: TIMEZONE,
  }).format(new Date());
}

/** Live clock in Melbourne/Sydney time (AEST/AEDT). */
export function useLocalClock() {
  const [time, setTime] = useState(formatTime);

  useEffect(() => {
    setTime(formatTime());
    const id = setInterval(() => setTime(formatTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}
