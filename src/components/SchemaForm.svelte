<script lang="ts">
  import LaunchButton from "./LaunchButton.svelte";
  import SchemaFormGroup from "./SchemaFormGroup.svelte";
  import {parameters} from "./store.js";

  export let schema: {
    definitions: {
      [key: string]: {
        type: string;
        description: string;
        properties: {
          [key: string]: {
            type: string;
            description: string;
            default?: string;
            help_text?: string;
            fa_icon: string;
            hidden?: boolean;
            pattern?: string;
            enum?: string[];
          };
        };
        fa_icon: string;
      };
    };
  };

  function validateForm(e : Event) {
    const isValid = e.target.checkValidity();

    e.target.classList.add("was-validated");
    if (!isValid) {
      e.preventDefault();
      e.stopPropagation();
    }
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    // compare values to schema and only keep those which are different than default
    const params = Object.entries(schema.definitions).map(([_, definition]) => {
      let param :{}= {};
      Object.entries(definition.properties).map(([title, property]) => {
        if ([ "integer", "number" ].includes(property.type)) {
          data[title] = Number(data[title]);
        }
        if (property.type === "boolean") {
          data[title] = data[title] === "on";
          if (property.default && property.default !== data[title]) {
            param[title]= data[title];
            return;
          } else {
            return;
          }
        }
        else if (property.enum) {
          if ((data[title] && !property.default) || (property.default && property.default !== data[title])) {   
            param[title]= data[title];
            return;
          } else {
            return;
          }
        }
        else if ((data[title].length > 0 && !property.default)|| (property.default && property.default !== data[title])) {
          if(title ==="max_cpus"){
            debugger;
          }
          param[title]= data[title];
            return;
        }
      });
      return param;
    })
    parameters.set(params);
  }
</script>

<form class="schema-listing needs-validation" on:submit|preventDefault={validateForm}>
  {#if schema.definitions}
    <div class="d-flex flex-column">
      <LaunchButton btn_class="float-end" />
      {#each Object.entries(schema.definitions) as [id, definition] (id)}
        <SchemaFormGroup {definition} {id} />
      {/each}
    </div>
  {/if}
</form>
<div class="my-3 text-center">
  <LaunchButton btn_class="btn-lg mx-auto" />
</div>
