<svelte:options tag="alerts-component"/>

<script >
	import {alertsStore, addNewAlert} from "./store.js";
	import Alert from "./Alert.svelte";
	

	let position="bottom-left";

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

	updatePositionClass();
	function updatePositionClass() {
		const [pos1, pos2] = position.split("-");
		console.log({pos1, pos2});

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
		const { message, position:pos } = data; //position
		console.log(data);
		if(pos) {
			setPosition(pos);
			delete data.pos1;
		}
		if(!message) {
			throw new Error("mesasge is required to alert the user. newAlert({message:'your message!'})");
		}
		addNewAlert(data);
	}

	
	export function setPosition(pos) {
		console.log({pos});
		
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
	}

	.top {
    top: 5px;
	}

	.bottom {
    bottom: 5px;
	}

	.left {
		left: 0px;
	}
	
	.right {
		right: 60px;
	}
</style>