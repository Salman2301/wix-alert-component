<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";
  import { get_current_component } from "svelte/internal";
  import alertIcon from "./icons/warning.js";
  import closeIcon from "./icons/close.js";


  const component = get_current_component();
  const svelteDispatch = createEventDispatcher();

  const dispatch = (name, detail) => {
    svelteDispatch(name, detail);
    component.dispatchEvent &&
      component.dispatchEvent(new CustomEvent(name, { detail }));
  };

  // props
  export let message = "Something went wrong. Check filed and try again";
  export let title = "Opps";
  export let brandColor = "#4BB543";
  export let autoClose = true;
  export let closeLabel = "X";
  export let wait = 8; // wait for 4 sec before autoClose
  export let style = "";
  export let onClose;
  export let onAction;
  export let id;
  export let type = "error";

  // variable
  let alertInstance;
  const perSec = 1000;

  // lifecycle
  onMount(() => {
    // console.log({alertInstance});
    if (type !== "success") {
      if (type === "error") {
        brandColor = "red";
      } else if (type === "info") {
        brandColor = "grey";
      } else if (type === "warn") {
        brandColor = "orange";
      }
    }

    alertInstance.style.setProperty("--brand-color", brandColor);

    dispatch("ready");

    if (autoClose) setTimeout(() => done("timeout"), wait * perSec);
  });

  // event
  const handleClose = e => done("action");

  const done = reason => {
    let detail = {
      reason: reason,
      message: message,
      id: id
    };
    // call back!
    // trigger when timeout or button click
    if (onClose && typeof onClose === "function") onClose(detail);
    // trigger only when the button click
    if (onAction && reason !== "timeout" && typeof onAction === "function")
      onAction(detail);

    dispatch("done", detail);
  };
</script>

<svelte:options tag="alert-component" />

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css?family=Roboto"
    rel="stylesheet"
  />
</svelte:head>

<div class="alert" bind:this="{alertInstance}">

  <div class="header"></div>

  <div class="icon">
    {@html alertIcon}
  </div>
  <div class="alert-container"
  class:shrink={closeLabel !== 'X'}
  >

    <div class="alert-title">
      <p>{title}</p>
    </div>

    <div
      class="alert-body"
      transition:fly="{{ x: -100, duration: 1200 }}"
      {style}
    >
      <p class="message">{message}</p>

    </div>
  </div>

  <div 
    class="close"
    class:isBtnAction={closeLabel !== 'X'}
  >
    {#if closeLabel === 'X'} 
      {@html closeIcon}
    {:else}
    <button
      class="btn-close"
      on:click={handleClose}
    >
      {closeLabel}
    </button>
    
    {/if}
  </div>
  
</div>

<style>
  :host {
    --brand-color: "#4BB543";
    margin: 0px;
    padding: 0px;
  }
  p {
    margin: 0px;
    padding: 0px;
  }
  .alert {
    margin: 0px;
    padding: 0px;
    width: 100%;
    bottom: 10px;
    min-height: 80px;
    max-height: 200px;
    font-family: "Roboto"; /* sans-serif */
    /* border: 1px solid var(--brand-color); */
    box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.25);
    display: flex;
    margin-bottom: 10px;
  }

  .alert-container {
    width: 200px;
    margin: 0px;
    padding: 0px;
  }

  .alert-title > p {
    width: 200px;
  }

  .alert-title {
    width: 200px;

    font-weight: bold;
    font-size: 16px;
    margin-top: 9px;
    /* width: 100%; */
  }

  .alert-title > p {
    width: 200px;
  }

  .alert-body {
    display: flex;
    background: white;
    color: #767676;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 22px;
    font-weight: lighter;
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
  }
  .alert-body > p {
    margin: 0;
    padding: 0;
    width: 200px;
  }

  .icon {
    margin: 0px;
    margin-top: 9px;
    width: 53px;
    display: block;
  }
  svg {
    shape-rendering: geometricprecision;

  }

  .icon > * {
    /* SVG ICON */
    width: 25px;
    height: 25px;
    margin: auto;
    display: block;
  }

  .header {
    width: 12px;
    background: var(--brand-color);
  }

  .message {
    display: flex-inline;
    margin: 5px;
    padding: 2px 5px;
    width: 80%;
  }

  .close {
    margin: auto;
  }
  .btn-close {
    flex: auto;
    float: right;
    margin: 0px;
    padding: 5px;
    border: 0px;
    font-size: 16px;
    cursor: pointer;
    /* color: var(--brand-color); */
    background: #fff;
  }
  .isBtnAction {
    width:200px; 
    display:flex;
  }
  .isBtnAction > button{
    border: 1px solid #ccc;
    color: black;
    align-self: center;
    font-size: 12px;
    font-weight:bold;
    /* width: 80px; */
    margin: 0 10px;

  }
  .isBtnAction > button:hover, .isBtnAction > button:active{
    color: #333;
    border: 1px solid black;
  }

  .shrink{
    width: 150px;
  }
  
  @media screen and (max-device-width: 640px) {
    .alert {
      margin: 0px;
      margin-bottom: 10px;
    }
  }
</style>
