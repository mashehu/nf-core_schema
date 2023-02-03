<script lang="ts">
  import SchemaFormElement from "./SchemaFormElement.svelte";
  import { showHidden } from "./store.js";

  export let definition: {
    title: "",
    description: "",
    properties: {},
    required: [],
    fa_icon: "",
  };
  export let id: string;

  //go through definition.properities and check if all hidden are set to true
  let hidden = true;
  for (const [title, property] of Object.entries(definition.properties)) {
    if (!property.hidden) {
      hidden = false;
      break;
    }
  }
</script>

<div class="card my-2" class:collapse={hidden} class:show={$showHidden}>
  <div class="card-header position-sticky bg-body-secondary">
    <h2 class="card-title text-success scroll-target " id={id.replaceAll("_", "-")}>
      {#if definition.fa_icon}
        <i class="fa fa-fw me-2 {definition.fa_icon}" />
      {/if}
      {definition.title}

    </h2>
  </div>
  <div class="card-body">
    <p>{definition.description ? definition.description : ""}</p>
    {#if definition.properties}
      <div class="properties">
        {#each Object.entries(definition.properties) as [title, property] (title)}
          <SchemaFormElement {title} {property} required={definition.required && definition.required.includes(title)}/>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .properties > :global(.property) {
    margin-top: -1px; // avoid doubled borders
  }
</style>
