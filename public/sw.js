const scheduled = new Map();

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

// Schedule or cancel notifications sent from the page
self.addEventListener('message', (event) => {
  const { type, matchId, homeTeam, awayTeam, utcDate, minutesBefore, notifyAt } = event.data;

  if (type === 'SCHEDULE_NOTIFICATION') {
    // Cancel any existing timer for this match
    if (scheduled.has(matchId)) clearTimeout(scheduled.get(matchId));

    const delay = notifyAt - Date.now();
    if (delay <= 0) return;

    const timer = setTimeout(() => {
      const label = minutesBefore === 0
        ? 'El partido está comenzando'
        : `Comienza en ${minutesBefore} minuto${minutesBefore > 1 ? 's' : ''}`;

      self.registration.showNotification(`⚽ ${homeTeam} vs ${awayTeam}`, {
        body: label,
        icon: '/icon.svg',
        badge: '/icon.svg',
        tag: `match-${matchId}`,
        data: { matchId },
        requireInteraction: true,
        vibrate: [200, 100, 200],
      });
      scheduled.delete(matchId);
    }, delay);

    scheduled.set(matchId, timer);
  }

  if (type === 'CANCEL_NOTIFICATION') {
    if (scheduled.has(matchId)) {
      clearTimeout(scheduled.get(matchId));
      scheduled.delete(matchId);
    }
    self.registration.getNotifications({ tag: `match-${matchId}` })
      .then((notes) => notes.forEach((n) => n.close()));
  }
});

// Notification click → open app at /?match=ID (auto-expands the card)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const matchId = event.notification.data?.matchId;
  const url = matchId ? `/?match=${matchId}` : '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If app is already open, navigate the existing tab
      for (const client of clientList) {
        if ('navigate' in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      // Otherwise open a new window
      return self.clients.openWindow(url);
    })
  );
});
