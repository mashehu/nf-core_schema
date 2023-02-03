<script lang="ts">
    export let btn_class: string="";

    // validate form
    


</script>

<div class="pt-2 sticky-top">
  <button class={"btn btn-success launch-btn "+btn_class} type="submit">
    <i class="fa fa-rocket me-2" />
    Launch
  </button>
</div>

<style lang="scss">
  .launch-btn {
    scroll-margin-top: 1rem;
  }
</style>
