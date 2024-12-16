<script lang="ts">
  import {  globalTopEasy } from "../../stores/stores";
</script>

{#if $globalTopEasy && $globalTopEasy.length > 0}
  <div
    class="absolute left-0 bottom-0 top-0 place-content-center w-52 text-center select-none "
  >
    <span class="text-2xl md:text-4xl text-white bangers-regular"
      >Global Top</span
    >
    <ul>
      {#each $globalTopEasy as item, index}
        <li class="sm:text-xs md:text-2xl  text-white bangers-regular">
          {index + 1} - {item.member} - {item.score}
        </li>
      {/each}
    </ul>
  </div>
{/if}
