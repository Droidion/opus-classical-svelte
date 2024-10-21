// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    interface Platform {
      env: {
        PUBLIC_IMAGES_URL: string
        DATABASE_URL: string
        OPUS_CLASSICAL_HYPERDRIVE: {
          connectionString: string
        }
      }
    }
  }
}

export {}
