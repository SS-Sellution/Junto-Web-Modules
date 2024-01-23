enum TimelineStatus {
  STOP = "STOP",
  PLAY = "PLAY",
  PAUSE = "PAUSE",
}
export class Timeline {
  duration = 500;
  direction = 1;
  _position = 0;
  status: TimelineStatus;
  startTime = 0;
  REQ_ANIMATION = () => {};
  callbacks: {
    onChange?: (position: number, direction: number) => void;
    onComplete: () => void | null;
  };
  timeoutID: number = 0;

  constructor({
    duration,
    onChange,
    onComplete,
  }: {
    duration: number;
    onChange?: (position: number, direction: number) => void;
    onComplete?: () => void;
  }) {
    this.duration = duration;
    this.callbacks = {
      onChange: onChange ?? function () {},
      onComplete: onComplete ?? function () {},
    };
    this.direction = -1;
    this._position = 0;
    this.status = TimelineStatus.STOP;
    this.startTime = 0;

    var self = this;
    this.REQ_ANIMATION = function () {
      self.update();
    };
  }

  playInternal() {
    if (
      (this.direction == 1 && this._position == this.duration) ||
      (this.direction == -1 && this._position == 0)
    ) {
    } else {
      this.startTime = new Date().getTime() - this._position;
      if (this.status != "PLAY") {
        var doAnimation = window.requestAnimationFrame;

        doAnimation(this.REQ_ANIMATION);
      }
      this.status = TimelineStatus.PLAY;
    }
  }

  play(delay?: number) {
    clearTimeout(this.timeoutID);
    if (
      this.direction === -1 &&
      this.status !== TimelineStatus.PLAY &&
      this._position === 0 &&
      delay &&
      delay > 0
    ) {
      this.timeoutID = setTimeout(() => {
        this.direction = 1;
        this.playInternal();
      }, delay);
      return;
    }
    this.direction = 1;
    this.playInternal();
  }
  reverse(delay?: number) {
    clearTimeout(this.timeoutID);
    if (
      this.direction === 1 &&
      this.status !== TimelineStatus.PLAY &&
      this._position === this.duration &&
      delay &&
      delay > 0
    ) {
      this.timeoutID = setTimeout(() => {
        this.direction = -1;
        this.playInternal();
      }, delay);
      return;
    }
    this.direction = -1;
    this.playInternal();
  }
  pause() {
    this.status = TimelineStatus.PAUSE;
  }
  stop() {
    this.status = TimelineStatus.STOP;
  }

  get position() {
    return this._position;
  }
  set position(value) {
    this._position = value;
    this.startTime = new Date().getTime() - this._position;
  }

  update() {
    if (!Date.now) {
      Date.now = function () {
        return new Date().getTime();
      };
    }
    if (this.status != TimelineStatus.PLAY) {
      return false;
    }
    var TIME = Date.now();
    if (this.direction == 1) {
      this._position = TIME - this.startTime;
      this._position = Math.min(this.duration, this._position);
      if (this._position == this.duration) {
        this.status = TimelineStatus.STOP;

        this.callbacks.onComplete?.();
      } else if (this.status == TimelineStatus.PLAY) {
        var doAnimation = window.requestAnimationFrame;

        if (doAnimation) {
          doAnimation(this.REQ_ANIMATION);
        }
      }
    } else {
      this._position = Math.max(
        2 * this._position - (TIME - this.startTime),
        0
      );
      this.startTime = TIME - this._position;
      if (this._position == 0) {
        this.status = TimelineStatus.STOP;

        this.callbacks.onComplete?.();
      } else if (this.status == TimelineStatus.PLAY) {
        var doAnimation = window.requestAnimationFrame;

        if (doAnimation) {
          doAnimation(this.REQ_ANIMATION);
        }
      }
    }

    this.callbacks.onChange?.(this._position, this.direction);
    return true;
  }

  getTime(
    timeOffset: number,
    duration: number,
    easeFunction: (t: number, b: number, c: number, d: number) => number | null
  ) {
    var time = Math.min(Math.max(this._position - timeOffset, 0), duration);
    if (easeFunction != null) {
      return easeFunction(time, 0, 1, duration);
    }
    return this.easeInOut(time, 0, 1, duration);
  }

  easeInOut(t: number, b: number, c: number, d: number) {
    return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
  }
}
