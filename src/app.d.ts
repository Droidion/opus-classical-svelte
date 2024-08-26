// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

declare module "$env/static/private" {
  export const DATABASE_URL: string;
}

declare module "$env/static/public" {
  export const PUBLIC_IMAGES_URL: string;
}

export {};
