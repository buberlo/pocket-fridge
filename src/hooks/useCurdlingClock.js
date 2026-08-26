import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

const DEFAULT_INTERVAL_MS = 1000;
const MIN_INTERVAL_MS = 250;

/**
 * Returns a wall-clock timestamp that ticks while enabled.
 *
 * The timestamp is intended to drive curdling timers, smell scores,
 * weight changes, and spoilage visuals without requiring each item
 * to manage its own interval.
 *
 * @param {Object} [options]
 * @param {number} [options.intervalMs=1000] How often the clock should tick.
 * @param {boolean} [options.enabled=true] Whether the clock should tick.
 * @returns {number} Current timestamp in milliseconds since the epoch.
 */
export default function useCurdlingClock({
  intervalMs = DEFAULT_INTERVAL_MS,
  enabled = true,
} = {}) {
  const [now, setNow] = useState(() => Date.now());
  const enabledRef = useRef(enabled);

  enabledRef.current = enabled;

  const tick = useCallback(() => {
    setNow(Date.now());
  }, []);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    tick();

    const safeIntervalMs = Math.max(
      MIN_INTERVAL_MS,
      Number(intervalMs) || DEFAULT_INTERVAL_MS
    );

    const id = setInterval(() => {
      if (enabledRef.current) {
        tick();
      }
    }, safeIntervalMs);

    return () => clearInterval(id);
  }, [enabled, intervalMs, tick]);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const subscription = AppState.addEventListener('change', (status) => {
      if (status === 'active') {
        tick();
      }
    });

    return () => subscription.remove();
  }, [enabled, tick]);

  return now;
}