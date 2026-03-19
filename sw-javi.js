const MSGS = [
  'Buenos días. La granja no espera.',
  'Javi. 7 de la mañana. A por ello.',
  'Buenos días. Los animales ya están despiertos.',
  'Nuevo día. La Pata Negra está en el garaje esperando.',
  'Buenos días. Dios da el día, tú pones el trabajo.',
  'Arriba. El campo no se cuida solo.',
  'Buenos días, legionario. Misión del día por definir.',
  'Siete de la mañana. El hierro se forja temprano.'
];

self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE_NOTIFICATION') {
    scheduleDaily(e.data.hour, e.data.minute);
  }
});

function scheduleDaily(hour, minute) {
  const now = new Date();
  const next = new Date();
  next.setHours(hour, minute, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 1);
  const delay = next.getTime() - now.getTime();
  setTimeout(() => {
    fireNotification();
    setInterval(fireNotification, 24 * 60 * 60 * 1000);
  }, delay);
}

function fireNotification() {
  const idx = Math.floor(Math.random() * MSGS.length);
  self.registration.showNotification('Mi día · Guerrero musulmán', {
    body: MSGS[idx],
    icon: 'https://fav.farm/⚔️',
    badge: 'https://fav.farm/⚔️',
    tag: 'daily-reminder-javi',
    renotify: true,
    vibrate: [300, 100, 300]
  });
}
