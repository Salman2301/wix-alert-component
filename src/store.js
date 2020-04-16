import {writable} from "svelte/store";

export const alertsStore = writable([]);
export const position = writable("bottom-right");

let currAlertId = 0;
export const alertId = () => String(currAlertId++);

export function addNewAlert(alert) {
	alert.id = alertId();
	alertsStore.update(alerts => [...alerts, alert]);
}