<script lang="ts">
  import { gameState } from "../../stores/stores";
</script>

<!-- <div class="flex h-screen place-items-center justify-between bg-cyan-500 select-none">
  <div class="borderpy-8 grid w-full justify-center gap-4 space-y-8">
    <div class="text-center">
      <span class="bangers-regular text-7xl text-white">
        Select Game Mode
      </span>
    </div>

    <div class="flex place-content-center space-x-8">
      <button
        on:click={() =>
          gameState.set({
            currentView: "easy",
            currentMode: "easy",
            status: "playing",
          })}
        class="grid h-60 w-40 place-items-center rounded-md border p-2 transition-transform hover:scale-110 hover:bg-black"
      >
        <span class="bangers-regular text-4xl text-white">Easy</span>
      </button>

      <button
        on:click={() =>
          gameState.set({
            currentView: "mid",
            currentMode: "mid",
            status: "playing",
          })}
        class="grid h-60 w-40 place-items-center rounded-md border p-2 transition-transform hover:scale-110 hover:bg-black"
      >
        <span class="bangers-regular text-4xl text-white">Mid</span>
      </button>
    </div>
  </div>
</div>

<div class="fixed bottom-1 right-2 text-white px-2 bg-black select-none">
  <span class="bangers-regular">Made with ❤️ by @vital</span>
</div> -->

<div
  class="flex h-screen select-none place-items-center justify-between bg-cyan-600"
>
  <div class="borderpy-8 grid w-full justify-center gap-4 space-y-8">
    <div class="flex flex-col gap-y-4 text-center">
      <p class="bangers-regular text-7xl text-white">
        Jump <span class="text-orange-400 underline text-border">Odyssey</span>
      </p>
      <p class="bangers-regular text-3xl text-white">CHOOSE YOUR DESTINY</p>
    </div>

    <div class="flex place-content-center space-x-8">
      <button
        on:click={() =>
          gameState.set({
            currentView: "easy",
            currentMode: "easy",
            status: "playing",
          })}
        class="grid h-60 w-40 place-items-center rounded-md border p-2 transition-transform hover:scale-110 hover:bg-orange-400"
      >
        <img class="w-20" src="/game.svg" alt="" />

        <span class="bangers-regular text-4xl text-white">Easy</span>
      </button>

      <button
        on:click={() =>
          gameState.set({
            currentView: "mid",
            currentMode: "mid",
            status: "playing",
          })}
        class="grid h-60 w-40 place-items-center rounded-md border p-2 transition-transform hover:scale-110 hover:bg-orange-400"
      >
        <img class="w-14" src="/swords.svg" alt="" />
        <span class="bangers-regular text-4xl text-white">Mid</span>
      </button>
    </div>
  </div>
</div>

<div class="fixed bottom-1 right-2 select-none bg-black px-2 text-white">
  <span class="bangers-regular">Made with ❤️ by @vital</span>
</div>
