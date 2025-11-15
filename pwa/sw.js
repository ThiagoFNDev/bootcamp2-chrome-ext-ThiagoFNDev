self.addEventListener("install", () => {
  console.log("PWA service worker instalado");
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("PWA ativo");
});
