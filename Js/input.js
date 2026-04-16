window.InputManager = {
  init() {

    let fullscreenDone = false;

    document.addEventListener("keydown", (e) => {

      // 👉 on ne gère QUE la touche espace
      if (e.code !== "Space") return;

      // 👉 seulement pendant l'intro
      if (!["intro", "wind1", "flash", "intro1"].includes(window.gameState)) return;

      e.preventDefault();

      // 🎬 plein écran (UNE FOIS)
      if (!fullscreenDone) {
        document.documentElement.requestFullscreen?.();
        fullscreenDone = true;
      }

      // 🎵 musique (UNE FOIS)
      if (!window.musicStarted) {
        AudioManager.play();
        window.musicStarted = true;
      }

      // 🎮 passage suivant (TOUJOURS)
      const link = document.querySelector("a.link-internal");
      if (link) link.click();

    });
  }
};