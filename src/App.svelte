<script>
  import { alertsStore, addNewAlert, position } from "./store.js";
  import Alert from "./Alert.svelte";

  // TODO: rename a better attribute and function name
  // ATTRIBUT DOES NOT ALLOW - OR _ OR UPPER CASE
  export let setposition = $position;
  export let newalert;

  let availPos = ["top-left", "top-right", "bottom-left", "bottom-right"];

  let posTop = false;
  let posBottom = false;
  let posLeft = false;
  let posRight = false;

  $: if (setPosition) setPosition(setposition);
  $: if (newalert) newAlert(newalert);

  const isValidPositon = pos => availPos.indexOf(pos) > -1;

  position.subscribe(updatePositionClass);

  function updatePositionClass() {
    const [pos1, pos2] = $position.split("-");

    posTop = pos1 === "top";
    posBottom = pos1 === "bottom";

    posLeft = pos2 === "left";
    posRight = pos2 === "right";
  }

  export const newAlert = (data = {}) => {   
    if (!data.message) {
      throw new Error(
        "message is required to alert the user. newAlert({message:'string'})"
      );
    }

    const { message, position: pos } = data; //position

    if (pos) {
      setPosition(pos);
      delete data.position;
    }

    // pass the current position to Alert component
    // data.pos = $position;

    addNewAlert(data);
     if (typeof data === "string") {
      data = JSON.parse(data);
      newalert = ""; // remove the attribute from html
    }
      
  };

  export function setPosition(pos) {
    if (!isValidPositon(pos)) {
      console.error(
        "Not a vaild position!, available positions : " + availPos.join(", ")
      );
      return;
    }
    $position = pos;
    updatePositionClass();
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
  class:top="{posTop}"
  class:bottom="{posBottom}"
  class:left="{posLeft}"
  class:right="{posRight}"
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
