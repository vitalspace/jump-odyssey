<script lang="ts">
  import EasyMode from "./lib/componets/EasyMode.svelte";
  import GameOver from "./lib/componets/GameOver.svelte";
  import MidMode from "./lib/componets/MidMode.svelte";
  import Welcome from "./lib/componets/Welcome.svelte";
  import "./lib/reddis/reddisMessages";
  import { gameState } from "./stores/stores";

  let show = true;

  const handle = () => {
    show = !show;
  };
</script>

{#if $gameState.currentView == "welcome"}
  <Welcome />
{/if}

{#if $gameState.currentView == "easy"}
  <EasyMode />
{/if}

{#if $gameState.currentView == "mid"}
  <MidMode />
{/if}

<!-- {#if $gameState.currentView == "hardMode"}
  <HardMode />
{/if} -->

{#if $gameState.currentView == "gameOver"}
  <GameOver />
{/if}
