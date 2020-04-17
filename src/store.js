import { writable, derived } from "svelte/store";

export const alertsStore = writable([]);
export const position = writable("bottom-right");

let currAlertId = 0;
export const alertId = () => String(currAlertId++);
export const pos = derived(position, $position=> {
	const [pos1, pos2] = $position.split("-");

	return {
		top : pos1 === "top",
		bottom : pos1 === "bottom",
		left : pos2 === "left",
		right : pos2 === "right",
	}
})

export function addNewAlert(alert) {
	alert.id = alertId();
	alertsStore.update(alerts => [...alerts, alert]);
}

// STORE HELPERS
function updatePositionClass(position) {
	const [pos1, pos2] = position.split("-");

	return {
		posTop : pos1 === "top",
		posBottom : pos1 === "bottom",
		posLeft : pos2 === "left",
		posRight : pos2 === "right",
	}
}
