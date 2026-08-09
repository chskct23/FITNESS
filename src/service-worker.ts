import { precacheAndRoute } from 'workbox-precaching';

// Use Vite PWA to inject the manifest and service worker registration.
// This file can be extended for additional caching strategies.
precacheAndRoute(self.__WB_MANIFEST || []);
