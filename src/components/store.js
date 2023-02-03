import { writable } from "svelte/store";

export const showHidden = writable(false);
export const showHelp = writable(false);
export const parameters = writable({});