import { writable } from "svelte/store";

export const userMeta = writable({
  loggedIn: false,
  user: null,
});
