<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { get_current_component } from "svelte/internal";
  import {
    successIcon,
    infoIcon,
    warnIcon,
    errorIcon,
    closeIcon
  } from "./icons/all.js";

  const component = get_current_component();
  const svelteDispatch = createEventDispatcher();


  const dispatch = (name, detail) => {
    svelteDispatch(name, detail);
    component.dispatchEvent &&
      component.dispatchEvent(new CustomEvent(name, { detail }));
  };

  // props
  export let id;
  export let title = "Oops";
  export let message = "Something went wrong. Check field and try again";
  export let type = "error";
  export let autoClose = true;
  export let closeLabel = "X";
  export let wait = 8; // wait for 4 sec before autoClose
  export let brandColor = "red";
  export let style = "";
  export let onClose;
  export let onAction;
  export let pos = "bottom-right"; //
  // variable
  let alertInstance;
  const perSec = 1000;
  let alertIcon = errorIcon;

  // lifecycle
  onMount(async () => {
    // console.log({alertInstance});
    if (type === "success") {
      brandColor = "#4BB543";
      alertIcon = successIcon;
      if(!title) title = "Success!";
    }
    else if (type === "error") {
      brandColor = "red";
      alertIcon = errorIcon;
      if(!title) title = "Oops!";
    }
    else if (type === "info") {
      brandColor = "grey";
      alertIcon = infoIcon;
      if(!title) title = "Info!";
    }
    else if (type === "warn") {
      brandColor = "orange";
      alertIcon = warnIcon;
      if(!title) title = "Info!";
    }

    alertIcon =  alertIcon.replace(/{fillColor}/g, brandColor);

    alertInstance.style.setProperty("--brand-color", brandColor);


    dispatch("ready");

    alertInstance.classList.add("slide"); //toggle("slide");

    if (autoClose) setTimeout(() => done("timeout"), wait * perSec);
  });

  onDestroy(async () => {
    await alertInstance.classList.toggle("slide");
  });

  // event
  const handleClose = e => done("action");

  const waitTill = ms => new Promise(res => setTimeout(res, ms));
  const done = async reason => {
    alertInstance.classList.toggle("slide");
    await waitTill(1000);

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

<div
  class="alert slide"
  bind:this="{alertInstance}"
>
  <div class="header"></div>

  <div class="icon">
    {@html alertIcon}
  </div>

  <div class="alert-container" class:shrink="{closeLabel !== 'X'}">
    <div class="alert-title">
      <p>{title}</p>
    </div>

    <div class="alert-body" {style}>
      <p class="message">{message}</p>
    </div>
  </div>

  <div
    class="close"
    class:isBtnAction="{closeLabel !== 'X'}"
    on:click="{handleClose}"
  >
    {#if closeLabel === 'X'}
      {@html closeIcon}
    {:else}
      <button class="btn-close">{closeLabel}</button>
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
    font-family: "Roboto", sans-serif;
    box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.25);
    display: flex;
    margin-bottom: 10px;
    animation: slide-in 2s;
  }

  .alert-container {
    width: 200px;
    margin: 0px;
    padding: 0px;
  }

  .alert-title {
    width: 200px;
    font-weight: bold;
    font-size: 16px;
    margin-top: 9px;
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
    cursor: pointer;
  }

  .btn-close {
    flex: auto;
    float: right;
    margin: 0px;
    padding: 5px;
    border: 0px;
    font-size: 16px;
    cursor: pointer;
    background: #fff;
  }

  .isBtnAction {
    width: 200px;
    display: flex;
  }

  .isBtnAction > button {
    border: 1px solid #ccc;
    color: black;
    align-self: center;
    font-size: 12px;
    font-weight: bold;
    margin: 0 10px;
  }

  .isBtnAction > button:hover,
  .isBtnAction > button:active {
    color: #333;
    border: 1px solid black;
  }

  .shrink {
    width: 150px;
  }

  .slide {
    animation: slide-out 2s;
  }

  @media screen and (max-device-width: 640px) {
    .alert {
      margin: 0px;
      margin-bottom: 10px;
    }

    .close {
      margin-left: 50px;
      margin-right: 50px;
    }

    .alert-container {
      width: 300px;
    }
  }

  @keyframes slide-in {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }

  @keyframes slide-out {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
</style>
