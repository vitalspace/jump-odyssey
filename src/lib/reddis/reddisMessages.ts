import { user, globalTopEasy, globalTopMid } from "../../stores/stores";

window.addEventListener("message", (event) => {
  const { type, data } = event.data;

  // console.log("Mesanjes del backend: ", type, data);

  if (type === "devvit-message") {
    const { message } = data;
    switch (message.type) {
      case "initialData": {
        const { username, top } = message.data;
        user.set(username);
        // console.log(username);
        // console.log(top);
        break;
      }
      case "updateLeaderboard": {
        const { top } = message.data;
        globalTopEasy.set(top);

        // console.log("svelte easy", top);
        break;
      }

      case "updateLeaderboardMidMode": {
        const { top } = message.data; 
        globalTopMid.set(top);

        // console.log("svelte mid", top);
        break;
      }
    }
  }
});
