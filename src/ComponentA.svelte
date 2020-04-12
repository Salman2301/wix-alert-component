<svelte:options tag={null}/>

<script>
	import {addNewAlert} from "./store.js";
	
		let count = 0;
		const handleNewAlert = e => {
			addNewAlert({
				message: "test " + ++count,
				autoExit: true
			});
		}
</script>

<div class="container" >
	<button on:click={handleNewAlert}>
		Add a new alert!
	</button>
</div>


<style>
	.container {
		border: 1px dashed red;
		margin: 0px;
		padding: 0px;
		height: 100px;
		display: flex;
		justify-content: center;
	}
	.container button {
		margin: auto 0;
	}
</style>