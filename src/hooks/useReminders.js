import { useState, useCallback } from 'react';

function loadReminders() {
  try { return JSON.parse(localStorage.getItem('reminders') || '{}'); }
  catch { return {}; }
}

function postToSW(msg) {
  navigator.serviceWorker?.controller?.postMessage(msg);
}

export function useReminders() {
  const [reminders, setReminders] = useState(loadReminders);

  const save = useCallback((updated) => {
    setReminders(updated);
    localStorage.setItem('reminders', JSON.stringify(updated));
  }, []);

  const setReminder = useCallback((match, minutesBefore) => {
    const notifyAt = new Date(match.utcDate).getTime() - minutesBefore * 60 * 1000;
    const entry = {
      matchId: match.id,
      homeTeam: match.homeTeam?.name ?? 'TBD',
      awayTeam: match.awayTeam?.name ?? 'TBD',
      utcDate: match.utcDate,
      minutesBefore,
      notifyAt,
    };
    save({ ...reminders, [match.id]: entry });
    postToSW({ type: 'SCHEDULE_NOTIFICATION', ...entry });
  }, [reminders, save]);

  const removeReminder = useCallback((matchId) => {
    const { [matchId]: _, ...rest } = reminders;
    save(rest);
    postToSW({ type: 'CANCEL_NOTIFICATION', matchId });
  }, [reminders, save]);

  return {
    reminders,
    hasReminder: (matchId) => !!reminders[matchId],
    getReminder: (matchId) => reminders[matchId] ?? null,
    setReminder,
    removeReminder,
  };
}

// Re-register all stored reminders with the SW (call on SW ready)
export function rehydrateReminders() {
  const reminders = loadReminders();
  const now = Date.now();
  navigator.serviceWorker?.ready.then((reg) => {
    Object.values(reminders).forEach((r) => {
      if (r.notifyAt > now) {
        reg.active?.postMessage({ type: 'SCHEDULE_NOTIFICATION', ...r });
      }
    });
  });
}
