<script>
  import { gameState } from "../../stores/stores";
  import { onMount } from "svelte";

  let state = { status: "playing", message: "" };

  // Suscríbete al estado del juego
  const unsubscribe = gameState.subscribe((value) => {
    state = value;
  });

  // Limpia la suscripción al desmontar
  onMount(() => {
    return () => unsubscribe();
  });

  // Reinicia el juego
  const restartGame = () => {
    gameState.set({
      status: "playing",
      message: "",
    });
    location.reload(); // Recarga la página para reiniciar el juego
  };
</script>

{#if state.status !== "playing"}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="absolute message-overlay z-10 border-2 text-white bg-black" on:click={restartGame}>
    <div class="message">
      <p>{state.message}</p>
      <button>Reiniciar</button>
    </div>
  </div>
{/if}

<style>
  .message-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .message {
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    font-size: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>
