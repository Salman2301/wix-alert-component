
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
	export let backgroundColor="#FF5733"
	export let autoExit = true;
	export let closeLabel = "X";
	export let wait = 4;// wait for 4 sec before autoExist
	export let style="";
	export let onClose;
	export let onAction;
	export let id;
	
	// variable
	let alertInstance;
	const perSec = 1000;
	
	// lifecycle
	onMount(()=>{
		alertInstance.style.background = backgroundColor;
		dispatch("ready");
		
		if(autoExit) setTimeout(()=>done("timeout"), wait*perSec);
		
	});
	
	// event
	const handleClose = e =>{
		done("action")
	}
	
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

<div class="alert-message" 
		 transition:fly="{{ x: -100, duration: 1200 }}"
		 bind:this={alertInstance}
		 style={style}>
	<p class="message">{message}</p>
	
	<button class="btn-close" on:click={handleClose}>{closeLabel}</button>
</div>
<style>
.alert-message {
	display: flex;
	margin: 10px 10px;
	padding: 0px;
	width: 300px;
	bottom: 10px;
  max-height: 200px;
	
	background: #FF5733;
	color: white;
	border: 1px solid grey;
	border-radius: 10px;
}
.message {
	display: flex-inline;
	margin: 5px;
	padding: 2px 5px;
	width: 80%;
	font-size: 18px;
}
.btn-close{
	flex:auto;
	float: right;
	margin: 0px;
	padding: 5px;
	right: 10px;
	height: 100%;
	border: 0px;
	font-size:1.2em;
	cursor: pointer;
	
	background: rgba(0,0,0,0);
	color: white;
}
.btn-close:active{
	background: rgba(0,0,0,0.15);
}
.btn-close:hover{
	background: rgba(0,0,0,0.15);
}
</style>