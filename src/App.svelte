<svelte:options tag="alerts-component"/>

<script >
	import {alertsStore, addNewAlert} from "./store.js";
	import Alert from "./Alert.svelte";
	

	// ATTRIBUT DOES NOT ALLOW - OR _ OR UPPER CASE	
	export let setposition="bottom-right";
	export let newalert;


	let position="bottom-right";

	let availPos = [
		"top",
		"left",
		"right",
		"bottom",
		"top-left",
		"top-right",
		"bottom-left",
		"bottom-right"
	];

	let posTop = false;
	let posBottom = false;
	let posLeft = false;
	let posRight = false;


	$:if(setPosition)setPosition(setposition); 
	$:if(newalert)newAlert(newalert);


	updatePositionClass();
	function updatePositionClass() {
		const [pos1, pos2] = position.split("-");
		// console.log({pos1, pos2});

		posTop = pos1 === "top";
		posBottom = pos1 === "bottom";
		posLeft = pos1 === "left";
		posRight = pos1 === "right";

		if(pos2) {
			posLeft = pos2 === "left"; 
			posRight = pos2 === "right"; 
		}
	}

	export const newAlert = (data={}) => {
		if(typeof data === "string") {
			data = JSON.parse(data);
			newalert=""; // remove the attribute from html
		} 
		const { message, position:pos } = data; //position
		// console.log({data});

		if(pos) {
			setPosition(pos);
			delete data.pos1;
		}
		if(!message) {
			throw new Error("message is required to alert the user. newAlert({message:'your message!'})");
		}
		addNewAlert(data);
	}

	
	export function setPosition(pos) {
		// console.log({pos});
		
		if(isValidPositon(pos)) {
				position=pos;
				updatePositionClass();
		} else {
			console.error("Not a vaild position available positions :" + availPos.join(", "));
		}
	}

	export function handleDone(e) {
		if(!(e && e.detail && e.detail.id)) return;

		let id = e.detail.id;
		$alertsStore = $alertsStore.filter((alert, i) => alert.id !== id);
	}



	function isValidPositon(pos) {
		
		return availPos.indexOf(pos) > -1;
	}

</script>
	
<div class="alerts bottom left"
	class:top={posTop}
	class:bottom={posBottom}
	class:left={posLeft}
	class:right={posRight}>
	{#each $alertsStore as alert(alert.id)}
		<alert-component {...alert} on:done={handleDone} ></alert-component>
		<!-- <Alert {...alert} on:done={handleDone}/> -->
	{/each}
</div>



<style>
	.alerts {
		position: fixed;
    /* left:2%; */
		width: 300px;
		
    z-index: 1000;
    background-color: white;
	}

	.top {
    top: 5px;
	}

	.bottom {
    bottom: 5px;
	}

	.left {
		left: 50px;
	}
	
	.right {
		right: 50px;
	}

	/* #### Mobile Phones Portrait or Landscape #### */
@media screen and (max-device-width: 640px){
	.alerts {
    margin: 0px;
    padding: 0px;
    width: 95vw;
		left: 50%;
		right: 0px;
		transform: translate(-50%, 0)
	}
}
/* 
@media screen and (max-device-width: 401px) {
.alerts {
    width: 200px;

		margin: 0px;
    padding: 0px;
    width: 100%;
    bottom: 0px;
		left: 50%;
		right: 0px;
		transform: translate(-50%, 0)
	}
} */
</style>