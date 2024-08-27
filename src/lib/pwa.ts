import { registerSW } from "virtual:pwa-register";

export function registerPWA() {
  registerSW({
    onRegistered(r) {
      console.log("Service worker has been registered.");
    },
    onRegisterError(error) {
      console.error("Error during service worker registration:", error);
    },
  });
}
