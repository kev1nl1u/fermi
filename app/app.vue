<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage :page-key="(route) => route.fullPath" />
  </NuxtLayout>
</template>

<style>
/* Fade — stesso livello */
.page-enter-active,
.page-leave-active {
  transition: opacity 120ms ease-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

/* Slide left — avanzamento (apertura sottocartella) */
.slide-left-enter-active {
  transition: transform 320ms cubic-bezier(0.32, 0.72, 0, 1),
              opacity   240ms ease-out;
  will-change: transform, opacity;
}
.slide-left-leave-active {
  transition: transform 260ms cubic-bezier(0.5, 0, 0.75, 0),
              opacity   200ms ease-in;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  will-change: transform, opacity;
}
.slide-left-enter-from { transform: translateX(80px); opacity: 0; }
.slide-left-leave-to   { transform: translateX(-30px); opacity: 0; }

/* Slide right — ritorno al parent */
.slide-right-enter-active {
  transition: transform 320ms cubic-bezier(0.32, 0.72, 0, 1),
              opacity   240ms ease-out;
  will-change: transform, opacity;
}
.slide-right-leave-active {
  transition: transform 260ms cubic-bezier(0.5, 0, 0.75, 0),
              opacity   200ms ease-in;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  will-change: transform, opacity;
}
.slide-right-enter-from { transform: translateX(-80px); opacity: 0; }
.slide-right-leave-to   { transform: translateX(30px); opacity: 0; }
</style>
