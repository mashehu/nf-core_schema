<script lang="ts">
  import { showHidden, showHelp } from "./store.js";

  export let title: string;
  export let property: {
    type: string;
    description: string;
    default?: string;
    help_text?: string;
    fa_icon: string;
    hidden?: boolean;
    pattern?: string;
    enum?: string[];
  };
  export let required: boolean = false;
  const id = title.replace(" ", "-");

  import { marked } from "marked";
  let help_text = "";
  if (property.help_text) {
    help_text = marked.parse(property.help_text);
  }
  $: show = $showHelp;
</script>

<div
  class="property border border-secondary-subtle pt-2 pb-2 px-2 mx-md-2 justify-content-between"
  class:collapse={property.hidden}
  class:show={$showHidden}
>
  <div class="input-group mb-1">
    <span class="input-group-text" id="basic-addon1">
      {#if property.fa_icon}
        <i class="fa fa-fw me-2 {property.fa_icon}" />
      {/if}
      <code>--{title}</code>
      {#if required}
        <sup class="text-danger ms-1" title="required" data-bs-toggle="tooltip">*</sup>
      {/if}
    </span>
    {#if property.enum}
      <select class="form-select" aria-label={title} value={property.default} name={title}>
        {#each property.enum as value}
          <option {value}>{value + (value === property.default ? " (default)" : "")}</option>
        {/each}
      </select>
    {:else if property.type === "boolean"}
      <div
        class="form-check form-switch border d-flex align-items-center justify-content-center mb-0 ps-0"
        class:rounded-end={!property.help_text}
      >
        <input
          type="checkbox"
          class="form-check-input mt-0 mx-3"
          role="switch"
          aria-label={title}
          id={title}
          name={title}
          checked={property.default}
        />
      </div>
    {:else if ["integer", "number"].includes(property.type)}
      <input
        type="number"
        class="form-control"
        id={title}
        name={title}
        aria-label={title}
        step={property.type === "integer" ? "1" : "any"}
        value={property.default ? property.default : ""}
        {required}
      />
    {:else if property.type === "string"}
      <input
        type={title === "email" ? "email" : "text"}
        id={title}
        name={title}
        class="form-control"
        aria-label={title}
        value={property.default ? property.default : ""}
        pattern={property.pattern ? property.pattern : ".*"}
        title={property.pattern ? property.pattern : ""}
        {required}
      />
      {#if property.pattern}
        <div class="invalid-feedback">Must match pattern <code>{property.pattern}</code></div>
        {/if}
    {/if}
    {#if property.help_text}
      <button class="btn btn-outline-secondary" type="button" on:click={() => (show = !show)}
        ><i class="fa-regular fa-question-circle" /></button
      >
    {/if}
  </div>

  <div class="description text-muted">
    {property.description}
    <div class="text-nowrap d-flex flex-column align-items-end justify-content-between">
      {#if property.hidden}
        <span class="badge text-bg-warning">hidden</span>
      {/if}
    </div>
  </div>
  {#if property.help_text}
    <div
      {id}
      class="m-2 p-2 text-tertiary bg-tertiary-subtle border border-tertiary-subtle help-text collapse"
      class:show
    >
      {@html help_text}
    </div>
  {/if}
</div>

<style lang="scss">
  .help-text :global(p) {
    margin-bottom: 0 !important;
  }
</style>
