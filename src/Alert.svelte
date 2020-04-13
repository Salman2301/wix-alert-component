<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";
  import { get_current_component } from "svelte/internal";

  const component = get_current_component();
  const svelteDispatch = createEventDispatcher();

  const dispatch = (name, detail) => {
    svelteDispatch(name, detail);
    component.dispatchEvent &&
      component.dispatchEvent(new CustomEvent(name, { detail }));
  };

  // props
  export let message = "Alert message!.";
  export let brandColor = "#4BB543";
  export let autoClose = true;
  export let closeLabel = "X";
  export let wait = 4; // wait for 4 sec before autoClose
  export let style = "";
  export let onClose;
  export let onAction;
  export let id;
  export let type = "success";

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
<div class="alert" bind:this="{alertInstance}">
  <div class="header"></div>

  <div
    class="alert-body"
    transition:fly="{{ x: -100, duration: 1200 }}"
    {style}
  >

    <p class="message">{message}</p>

    <button
      class="btn-close"
      class:isBtnAction="{closeLabel !== 'X' && closeLabel !== ''}"
      on:click="{handleClose}"
    >
      {closeLabel}
    </button>
  </div>
</div>

<style>
  :host {
    --brand-color: "#4BB543";
  }
  .alert {
    margin: 10px 10px;
    padding: 0px;
    width: 100%;
    bottom: 10px;
    min-height: 50px;
    max-height: 200px;
    font-size: 18px;
    font-family: sans-serif;
    border: 1px solid var(--brand-color);
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
    width: 100%;
    background: var(--brand-color);
  }

  .message {
    display: flex-inline;
    margin: 5px;
    padding: 2px 5px;
    width: 80%;
  }
  .btn-close {
    flex: auto;
    float: right;
    margin: 0px;
    padding: 5px;
    border: 0px;
    font-size: 16px;
    cursor: pointer;
    color: var(--brand-color);
    background: rgba(0, 0, 0, 0);
  }

  .isBtnAction {
    border: 1px solid black;
    color: black;
    align-self: center;
    font-size: 16px;
    width: 80px;
    margin: 5px 10px;
  }

  .btn-close:active {
    color: black;
  }

  .btn-close:hover {
    color: black;
  }

  @media screen and (max-device-width: 640px) {
    .alert {
      margin: 0px;
      margin-bottom: 10px;
    }
  }
</style>
