<script lang="ts">
  import { gameState, score } from "../../stores/stores";
</script>

<div class="flex h-screen select-none place-items-center justify-between bg-cyan-500">
  <div class="grid w-full justify-center gap-4 space-y-8">
    <div class="grid gap-4 rounded-md bg-orange-400 p-4 shadow-2xl w-96">
      <div class="flex justify-center place-items-end">
        <img class="w-10 -rotate-45" src="crown.svg" alt="">

        <img class="w-20" src="crown.svg" alt="">
        <img class="w-10 rotate-45" src="crown.svg" alt="">

      </div>

      <div class="text-center">
        <span class="bangers-regular text-7xl text-white">- Score -</span>
      </div>

      <div class="flex h-40 place-items-center justify-center rounded-md border-4  bg-orange-100 text-center text-white">
        <span class="text-7xl bangers-regular text-slate-800">{$score}</span>
      </div>

      <div class="flex place-content-center space-x-4">
        <button 
        
        on:click={() => {
          gameState.update((state) => ({
            ...state,
            currentView: "welcome", // Vuelve al modo de juego actual
          }));
        }}
        class="w-full grid place-items-center bg-pink-500 rounded-md border p-2 transition-transform hover:scale-110 hover:bg-black">
          <span class="bangers-regular text-4xl text-white">Back Home</span>
        </button>

        <button 
        
        on:click={() => {
          gameState.update((state) => ({
            ...state,
            currentView: state.currentMode,
            status: "playing", // Vuelve al modo de juego actual
          }));
        }}
        class="w-full grid place-items-center bg-green-600 rounded-md border p-2 transition-transform hover:scale-110 hover:bg-black">
          <span class="bangers-regular text-4xl text-white">Restart</span>
        </button>
      </div>
    </div>
  </div>
</div>

<div class="fixed bottom-1 right-2 select-none bg-black px-2 text-white">
  <span class="bangers-regular">Made with ❤️ by @vital</span>
</div>
