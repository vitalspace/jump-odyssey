<script>
    import { onMount } from 'svelte';
  
    let isVisible = true;
  
    onMount(() => {
      // Ocultar el div después de 5 segundos
      setTimeout(() => {
        isVisible = false;
      }, 2500);
    });
  </script>
  
  <style>
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
    }
  
    .animate {
      animation: bounce 1s ease-in-out infinite;
    }
  </style>
  
  {#if isVisible}
  <div class="absolute bottom-10 left-0 right-0 flex justify-center animate select-none z-10">
    <img class="w-20" src="/helper.svg" alt="">
  </div>
  {/if}
  