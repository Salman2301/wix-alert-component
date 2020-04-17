<script>
  import { alertsStore, addNewAlert, position } from "./store.js";
  import {pos} from "./store.js";
  import Alert from "./Alert.svelte";

  // TODO: rename a better attribute and function name
  // ATTRIBUT DOES NOT ALLOW - OR _ OR UPPER CASE
  export let setposition = $position;
  export let newalert;

  let availPos = ["top-left", "top-right", "bottom-left", "bottom-right"];

  $: if (setPosition) setPosition(setposition);
  $: if (newalert) newAlert(newalert);

  const isValidPositon = newPos => availPos.indexOf(newPos) > -1;
  
  export const newAlert = (data = {}) => {   
    if (!data.message) {
      throw new Error(
        "message is required to alert the user. newAlert({message:'string'})"
      );
    }

    const { message, position: newPos } = data; //position

    if (newPos) {
      setPosition(newPos);
      delete data.position;
    }


    addNewAlert(data);
     if (typeof data === "string") {
      data = JSON.parse(data);
      newalert = ""; // remove the attribute from html
    }
      
  };

  export function setPosition(newPos) {
    if (!isValidPositon(newPos)) {
      console.error(
        "Not a vaild position!, available positions : " + availPos.join(", ")
      );
      return;
    }
    position.set(newPos);
    // updatePositionClass();
  }

  export function handleDone(e) {
    if (!(e && e.detail && e.detail.id)) return;

    let id = e.detail.id;
    $alertsStore = $alertsStore.filter((alert, i) => alert.id !== id);
  }
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css?family=Roboto"
    rel="stylesheet"
  />
</svelte:head>

<svelte:options tag="alerts-component" />
<div
  class="alerts bottom right"
  class:top={$pos.top}
  class:bottom={$pos.bottom}
  class:left={$pos.left}
  class:right={$pos.right}
>

  {#each $alertsStore as alert (alert.id)}
    <alert-component {...alert} on:done="{handleDone}"></alert-component>
  {/each}

</div>

<style>
  .alerts {
    position: fixed;
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

  @media screen and (max-device-width: 640px) {
    .alerts {
      margin: 0px;
      padding: 0px;
      width: 95vw;
      left: 50%;
      right: 0px;
      transform: translate(-50%, 0);
    }
  }
</style>
