<script>
  import { showHidden } from "./store.js";

  export let title;
  export let property;
  const id = title.replace(" ", "-");

  import { marked } from "marked";
  import Collapsible from "./Collapsible.svelte";
  let help_text = "";
  if (property.help_text) {
    help_text = marked.parse(property.help_text);
  }
</script>

<div
  class="property row border border-secondary py-2 mx-md-2 justify-content-between"
  class:collapse={property.hidden}
  class:show={$showHidden}
>
  <div class="input-group mb-3">
    <span class="input-group-text" id="basic-addon1">
      {#if property.fa_icon}
        <i class="fa fa-fw me-2 {property.fa_icon}" />
      {/if}
      <code>--{title}</code>
    </span>
    {#if property.enum && property.enum.length > 0}
      <select class="form-select" aria-label={title} value={property.default}>
        {#each property.enum as value}
          <option {value}>{value + (value === property.default ? " (default)" : "")}</option>
        {/each}
      </select>
    {:else if property.type === "boolean"}
      <div class="form-check form-switch border rounded-end d-flex align-items-center justify-content-center mb-0">
        <input
          type="checkbox"
          class="form-check-input mt-0"
          role="switch"
          aria-label={title}
          id={title}
          checked={property.default}
        />
      </div>
    {:else if ["integer", "number"].includes(property.type)}
      <input
        type="number"
        class="form-control"
        id={title}
        aria-label={title}
        value={property.default ? property.default : ""}
      />
    {:else if property.type === "string"}
      <input
        type={title === "email" ? "email" : "text"}
        class="form-control"
        aria-label={title}
        value={property.default ? property.default : ""}
      />
    {/if}
    {#if property.help_text}
    <Collapsible>
        <div {id} class="p-2 text-info-emphasis bg-info-subtle border border-info-subtle rounded-3">
          {@html help_text}
        </div>
      </Collapsible>
  {/if}
  </div>

  <div class="description ">
    {property.description}
    <div class="text-nowrap d-flex flex-column align-items-end justify-content-between">
      {#if property.hidden}
        <span class="badge text-bg-warning">hidden</span>
      {/if}
    </div>
  </div>
     {#if property.help_text}  
     <div class="row my-2 mx-1 w-100 ms-auto px-0">
      
    </div>
  {/if}

  
</div>

<style lang="scss">
  .rounded-3 {
    border-top-left-radius: 0 !important;
  }
</style>
