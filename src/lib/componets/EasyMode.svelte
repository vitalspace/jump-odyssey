<script lang="ts">
  import { PhysicsLoader, Project, Scene3D } from "enable3d";
  import { onDestroy, onMount } from "svelte";
  import { Ball } from "../gameComponents/Ball";
  import { Basket } from "../gameComponents/Basket";
  import Helper from "./Helper.svelte";

  import { get } from "svelte/store";
  import {
    addCollection,
    deleteCollection,
    gameState,
    resetGame,
    restartGame,
    score,
    user,
  } from "../../stores/stores";
  import { FakeGround } from "../gameComponents/FakeGround";
  import Score from "./Score.svelte";
  import Top from "./TopEasy.svelte";
  import { AudioManager } from "../gameComponents/Audio";

  let project: Project | null = null;

  // ElevenLabs sounds
  const jumpSound = new AudioManager("/jump.mp3");
  const jumpBouncing = new AudioManager("/jump_bouncing.mp3");

  const submitScore = async () => {
    const sc = get(score);
    const us = get(user);

    window.parent.postMessage(
      {
        type: "updateTop5",
        data: { username: us, score: sc },
      },
      "*"
    );
  };

  class MainScene extends Scene3D {
    collection: Basket[] = [];
    mouseDown: boolean = false;
    mouseMove: boolean = false;
    position: any;
    movement: any;

    id: number = 0;
    initialposition: number = -2.5;
    ball: any;
    fakeGround: any;
    fa: any;
    highestPoint: number = 0;
    globalScore: number = 0;
    lowestAllowedPoint: number = -10;

    constructor() {
      //@ts-ignore
      super("MainScene");
    }

    init() {
      // console.log("init");
      this.renderer.setPixelRatio(1);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    preload() {
      // console.log("preload");
    }

    create() {
      // console.log("create");
      const resize = () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;

        this.renderer.setSize(newWidth, newHeight);
        //@ts-ignore
        this.camera.aspect = newWidth / newHeight;
        this.camera.updateProjectionMatrix();
      };

      window.onresize = resize;
      resize();

      // set up scene (light, ground, grid, sky, orbitControls)
      this.warpSpeed("-orbitControls", "-sky");

      // enable physics debug
      //   this.physics.debug?.enable();

      // position camera
      this.camera.position.set(0, 70, 70);

      this.startGame();

      // gameState.subscribe((value) => {
      //   status = value.status;
      //   if (status === "gameover") {
      //     this.scene.clear();
      //   }
      // });

      restartGame.subscribe((value) => {
        if (value) {
          this.startGame();
          restartGame.set(false);
        }
      });

      resetGame.subscribe((value) => {
        if (value) {
          this.resetGame();
          this.deleteCollection();
          resetGame.set(false);
        }
      });

      deleteCollection.subscribe((value) => {
        if (value) {
          this.deleteCollection();
        }
      });

      addCollection.subscribe((value) => {
        if (value) {
          this.addCollection();
          addCollection.set(false);
        }
      });

      this.mouseDown = false;
      this.mouseMove = false;
      this.position = { x: 0, y: 0 };
      this.movement = { x: 0, y: 0 };

      const handleMouseDown = (x: number, y: number) => {
        this.position = { x, y };
        this.movement = { x, y };
        this.mouseDown = true;
      };

      const handleMouseUp = () => {
        this.position = { x: 0, y: 0 };
        this.movement = { x: 0, y: 0 };
        this.mouseDown = false;
        this.mouseMove = false;
      };

      const handleMouseMove = (x: number, y: number) => {
        if (this.mouseDown) {
          this.mouseMove = true;
          this.movement = { x: x - this.position.x, y: y - this.position.y };
          this.position = { x, y };
        }
      };

      // Event listeners para mouse y touch
      window.addEventListener("mousedown", (e) =>
        handleMouseDown(e.clientX, e.clientY)
      );
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mousemove", (e) =>
        handleMouseMove(e.clientX, e.clientY)
      );

      window.addEventListener("touchstart", (e) =>
        handleMouseDown(e.touches[0].clientX, e.touches[0].clientY)
      );
      window.addEventListener("touchend", handleMouseUp);
      window.addEventListener("touchmove", (e) =>
        handleMouseMove(e.touches[0].clientX, e.touches[0].clientY)
      );
    }

    update() {
      if (!this.physics) return;

      if (this.collection.length > 0) {
        if (this.mouseMove) {
          setTimeout(() => (this.mouseMove = false), 50);
        }

        for (const { body, rotation } of this.collection) {
          if (body) {
            body.needUpdate = true;
            if (this.mouseMove) {
              rotation.y += -0.05 * this.movement.x;
            }
          }
        }
      }

      if (this.ball && this.ball.body) {
        this.camera.position.set(0, this.ball.position.y + 10, 30);
        this.camera.lookAt(0, this.ball.position.y - 5, 0);

        if (this.ball.position.y > this.initialposition + 5) {
          const randomRotation = Math.random() * Math.PI * 3 * 0.01;
          this.addCollection(1, randomRotation);
          this.removeLowBaskets(this.ball.position.y - 20);
        }

        const { y } = this.ball.position;

        if (parseInt(y) > this.highestPoint) {
          this.highestPoint = parseInt(y); // Nuevo punto más alto
          this.globalScore++; // Incrementar el score
          this.updateScoreDisplay(); // Actualizar la UI
        }

        // 2. Penalizar si baja más allá de un cierto punto
        if (parseInt(y) < this.lowestAllowedPoint) {
          this.globalScore--; // Reducir el score
          this.updateScoreDisplay(); // Actualizar la UI
        }
      }
    }

    async startGame() {
      try {
        this.resetGame();
        this.deleteCollection();
        this.addCollection(1, 0);
        this.addCollection(1);

        this.ball = new Ball(this).init();

        this.ball.body.on.collision((obj: any, event: any) => {
          if (/basket/.test(obj.name) && event === "start") {
            jumpSound.play();
            this.ball.body.setVelocity(0, 22, 0);
          }
        });

        this.fakeGround = new FakeGround(this).init();

        this.fakeGround.body.on.collision((obj: any, event: any) => {
          if (obj.name === "ball" && event === "start") {
            jumpBouncing.play();
            submitScore();
            // this.resetGame();
            // this.deleteCollection();
            gameState.set({
              currentMode: "easy",
              currentView: "gameOver",
              status: "gameover",
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    resetGame() {
      this.id = 0;
      this.initialposition = -2.5;
      this.globalScore = 0;

      // Limpieza apropiada de objetos existentes
      if (this.ball) {
        if (this.ball.body) {
          this.physics.destroy(this.ball.body);
        }
        this.scene.remove(this.ball);
        this.ball = null;
      }

      if (this.fakeGround) {
        if (this.fakeGround.body) {
          this.physics.destroy(this.fakeGround.body);
        }
        this.scene.remove(this.fakeGround);
        this.fakeGround = null;
      }
    }

    deleteCollection() {
      if (this.collection.length > 0) {
        this.collection.forEach((basket) => {
          //   console.log(basket.name);
          //@ts-ignore
          this.destroy(basket);
          this.collection = this.collection.filter(
            (obj) => obj.uuid !== basket.uuid
          );
        });
        deleteCollection.set(false);
      }
    }

    addCollection(amount: number = 10, rotation?: number) {
      const timeSeed = Date.now() % 1000;
      for (let i = 0; i < amount; i++) {
        this.initialposition += 5;
        this.id++;

        const randomRotation =
          rotation ?? Math.random() * Math.PI * 2 + (timeSeed % (i + 1)) * 0.01;

        const basket = new Basket(
          this.id,
          { x: 0, y: this.initialposition, z: 0 },
          { x: 0, y: randomRotation, z: 0 },
          this
        ).init();

        this.collection.push(basket);
      }
    }

    removeLowBaskets(minY: number) {
      for (const object of this.collection) {
        if (object.position.y < minY) {
          this.fakeGround.body.needUpdate = true;
          this.fakeGround.position.y = object.position.y;
          //@ts-ignore
          this.destroy(object); // Limpia el Basket
          this.collection = this.collection.filter(
            (obj) => obj.uuid !== object.uuid
          );
        }
      }
    }

    updateScoreDisplay() {
      score.set(this.globalScore);
    }
  }

  function startScene() {
    if (project) {
      cleanupScene();
    }

    PhysicsLoader("lib/ammo/kripken", () => {
      project = new Project({
        scenes: [MainScene],
        antialias: true,
        alpha: true,
        parent: "Game",
      });
    });
  }

  function cleanupScene() {
    if (project) {
      project.scene.children.forEach((obj) => {
        //@ts-ignore
        project?.physics.destroy(obj);
        project?.scene.remove(obj);
      });

      if (project.scene) {
        project.scene.clear();
      }

      // Destruir el proyecto
      if (project.renderer) {
        project.renderer.forceContextLoss();
        project.renderer.dispose();
        //@ts-ignore
        project.renderer = null;
      }

      project = null;
    }
  }

  onMount(() => {
    startScene();
  });

  onDestroy(() => {
    cleanupScene();
  });
</script>

<Top />
<Score />

<div
  class="absolute bg-green-500 px-4 py-1 top-2 right-2 select-none flex place-items-center space-x-2"
>
  <button
    on:click={() => {
      restartGame.set(true);
    }}
  >
    <img width="40px" src="/reload.svg" alt="" />
  </button>

  <button
    on:click={() => {
      restartGame.set(true);
      gameState.set({
        currentMode: "",
        currentView: "welcome",
        status: "",
      });
    }}
  >
    <img width="40px" src="/home.svg" alt="" />
  </button>

  <!-- <button
    on:click={() => {
      addCollection.set(true);
    }}
  >
    <img width="50px" src="/add.svg" alt="" />
  </button>

  <button
    on:click={() => {
      deleteCollection.set(true);
    }}
  >
    <img width="50px" src="/delete.svg" alt="" />
  </button> -->
</div>

<div id="Game" class=" grid h-screen bg-cyan-500"></div>

<Helper />

<div
  class="fixed bottom-2 left-0 right-0 text-center bangers-regular text-white select-none"
>
  <div class="flex justify-center">
    <span class="bg-blue-500 px-2">Mode: {$gameState.currentMode}</span>
    <span class="bg-red-500 px-2">User: {$user}</span>
  </div>
</div>
