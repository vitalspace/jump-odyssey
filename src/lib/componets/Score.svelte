<script lang="ts">
  import { score } from "../../stores/stores";
</script>

<div class="absolute left-2 top-2 place-content-center text-center select-none">
  <div
    class="flex space-x-4 justify-center justify-items-center bg-orange-500 px-4 py-1"
  >
    <span class="text-xl md:text-4xl text-white bangers-regular"> Score</span>
    <span class="text-xl md:text-4xl text-white bangers-regular">{$score}</span>
  </div>
</div>
