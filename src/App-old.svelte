<svelte:options tag={null}/>

<script>
	import Alerts from "./Alerts.svelte";
	import ComponentA from "./ComponentA.svelte";
	import {alertsStore, alertId} from "./store.js";
	
	// init alert test
	$alertsStore = [
		{
			id: alertId(),
			message: "I will close in 4 secs?",
			backgroundColor: "#FF5733",
			style: "border:4px solid orange",
			onClose:(e)=>{console.log("completed!", e)}
	  },
		{
			id: alertId(),
			message: "I won't close until u hit X button?",
			backgroundColor: "#C70039",
			autoExit:false,
			onClose:(e)=>{console.log("completed!", e)}
	  },
		{
			id: alertId(),
			message: "Wait for 8 secs till i autoExit?",
			backgroundColor: "#900C3F",
			wait: 8 // wait for 8 sec before autoExist
	  },
		{
			id: alertId(),
			message: "Waiting for your action?",
			backgroundColor: "#581845",
			autoExit: false,
			closeLabel: "ACTION",
			onAction: (el)=>{console.log("Action : " , el)}
	  },
	];
</script>


<ComponentA />
<ComponentA />
<Alerts />