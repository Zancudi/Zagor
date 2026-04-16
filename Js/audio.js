window.AudioManager = {
  tracks: {},
  current: null,

  init() {
    // Déclarez ici toutes vos musiques
    this.tracks = {
      intro: new Audio("MusicSet/harp.mp3"),
      intro1:  new Audio("MusicSet/ballad.mp3"),
      rablaix: new Audio("MusicSet/winds.mp3"),
      anvar: new Audio("MusicSet/call.mp3"),
      braxus: new Audio("MusicSet/forgotten.mp3"),
      sallazar: new Audio("MusicSet/quiet.mp3"),
      wind1: new Audio("MusicSet/wind1.mp3"),
      flash: new Audio("MusicSet/flash.mp3"),
      // Ajoutez autant de pistes que vous voulez
      // combat: new Audio("MusicSet/Battle.mp3"),
      // village: new Audio("MusicSet/Peaceful.mp3"),
    };

    // Par défaut, toutes les pistes tournent en boucle
    for (const key in this.tracks) {
      this.tracks[key].loop = true;
    }
  },

  play(trackName) {
    const track = this.tracks[trackName];
    if (!track) return;

    // Si c'est déjà la piste en cours, on ne fait rien
    if (this.current === track && !track.paused) return;

    // On arrête la piste en cours
    this.stop();

    // On lance la nouvelle piste
    this.current = track;
    track.currentTime = 0;
    track.volume = 1;
    track.play().catch(() => {});
  },

  stop() {
    if (this.current) {
      this.current.pause();
      this.current.currentTime = 0;
    }
  },

  // Version avec fondu enchaîné (fade out → fade in)
  crossFadeTo(trackName, duration = 2000) {
    const newTrack = this.tracks[trackName];
    if (!newTrack) return;

    const oldTrack = this.current;
    const steps = 20;
    const interval = duration / steps;

    // Prépare la nouvelle piste
    newTrack.currentTime = 0;
    newTrack.volume = 0;
    newTrack.play().catch(() => {});
    this.current = newTrack;

    let step = 0;

    const fade = setInterval(() => {
      step++;
      const progress = step / steps;

      // Fondu sortant sur l'ancienne piste
      if (oldTrack) {
        oldTrack.volume = Math.max(0, 1 - progress);
      }

      // Fondu entrant sur la nouvelle piste
      newTrack.volume = Math.min(1, progress);

      // Fin du fondu
      if (step >= steps) {
        clearInterval(fade);
        if (oldTrack) {
          oldTrack.pause();
          oldTrack.currentTime = 0;
          oldTrack.volume = 1;
        }
      }
    }, interval);
  }
};