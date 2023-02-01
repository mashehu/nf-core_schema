<script>
  import SchemaFormGroup from "./SchemaFormGroup.svelte";

  export let schema;
  // console.log(schema.definitions);
</script>

<div class="schema-listing">
  {#if schema.definitions}
    <div class="d-flex flex-column">
      {#each Object.entries(schema.definitions) as [id, definition] (id)}
        <SchemaFormGroup {definition} {id}/>
      {/each}
    </div>
  {/if}
</div>
