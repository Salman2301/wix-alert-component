
<svelte:options tag="alert-component"/>


<script>
	import {onMount, onDestroy, createEventDispatcher} from "svelte";
	import { fly } from "svelte/transition";
	import { get_current_component } from "svelte/internal"
	
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	const dispatch = (name, detail) => {
		svelteDispatch(name, detail)
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }))
	}

	// props
	export let message = "Alert message!.";
	export let brandColor="#4BB543"
	export let autoClose = true;
	export let closeLabel = "X";
	export let wait = 4;// wait for 4 sec before autoClose
	export let style="";
	export let onClose;
	export let onAction;
	export let id;
	export let type="success";
	// variable
	let alertInstance;
	const perSec = 1000;
	
	// lifecycle
	onMount(()=>{
		// console.log({alertInstance});
		if(type!== "success") {
			if(type==="error") {
				brandColor = "red";
			}
			else if( type==="info") {
				brandColor = "grey";
			}
			else if(type==="warn") {
				brandColor = "orange"
			}
		}

		alertInstance.style.setProperty('--brand-color', brandColor);

		dispatch("ready");
		
		if(autoClose) setTimeout(()=>done("timeout"), wait*perSec);
		
	});
	
	// event
	const handleClose = e => done("action");
	
	const done = (reason) =>{
		let detail = {
			reason : reason,
			message: message,
			id: id
		}
		// call back!
		// trigger when timeout or button click
		if(onClose) onClose(detail);
		// trigger only when the button click
		if(onAction && reason !== "timeout") onAction(detail)
		
		dispatch('done' , detail);
	}

</script>

<div class="alert" bind:this={alertInstance}>
	<div class="header"></div>

	<div
			class="alert-body" 
			transition:fly="{{ x: -100, duration: 1200 }}"
			style={style}
		>


		<p class="message">{message}</p>

		<button
			class="btn-close" 
			class:isBtnAction={closeLabel!=="X" && closeLabel!==""}
			on:click={handleClose}>{closeLabel}
		</button>
	</div>
</div>


<style>

:host {
	--brand-color: "#4BB543"
}
.alert  {
	
	margin: 10px 10px;
	padding: 0px;
	width: 100%;
	bottom: 10px;
	min-height: 50px;
  max-height: 200px;
	font-family: sans-serif;
	border: 1px solid var(--brand-color);
	font-size: 18px;
	/* border-radius: 5px; */

	box-shadow: 4px 4px 10px -5px black;
}

.alert-body {
	display: flex;
	background: white;
	color: black;
	
	height: 90%;

}

.header {
	height: 5px;
	background: var(--brand-color);
	width: 100%;
}
.message {
	display: flex-inline;
	margin: 5px;
	padding: 2px 5px;
	width: 80%;
}
.btn-close{
	flex:auto;
	float: right;
	margin: 0px;
	padding: 5px;
	/* right: 10px; */
	/* height: 100%; */
	border: 0px;
	font-size: 16px;
	cursor: pointer;
	
	background: rgba(0,0,0,0);
	color: var(--brand-color);
}

.isBtnAction {
	border: 1px solid black;
	color: black;
	align-self: center;
	font-size: 16px;
	width: 80px;
	margin: 5px 10px;

}
.btn-close:active{
	color: black;
}
.btn-close:hover{
	color: black;
}

@media screen and (max-device-width: 640px){
	.alert {
    margin: 0px;
    margin-bottom: 10px;
	}
}

</style>