class AudioManager {
  audio: HTMLAudioElement;
  volume: number;

  constructor(src: string) {
    this.audio = new Audio(src);
    this.volume = 0.1;
  }

  play() {
    this.audio.volume = this.volume;
    this.audio.play();
    this.audio.currentTime = 0;
  }
}

export { AudioManager };
