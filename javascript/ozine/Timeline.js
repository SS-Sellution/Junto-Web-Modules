var TimelineStatus;
(function (TimelineStatus) {
    TimelineStatus["STOP"] = "STOP";
    TimelineStatus["PLAY"] = "PLAY";
    TimelineStatus["PAUSE"] = "PAUSE";
})(TimelineStatus || (TimelineStatus = {}));
export class Timeline {
    constructor({ duration, onChange, onComplete, }) {
        this.duration = 500;
        this.direction = 1;
        this._position = 0;
        this.startTime = 0;
        this.REQ_ANIMATION = () => { };
        this.timeoutID = 0;
        this.duration = duration;
        this.callbacks = {
            onChange: onChange !== null && onChange !== void 0 ? onChange : function () { },
            onComplete: onComplete !== null && onComplete !== void 0 ? onComplete : function () { },
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
        if ((this.direction == 1 && this._position == this.duration) ||
            (this.direction == -1 && this._position == 0)) {
        }
        else {
            this.startTime = new Date().getTime() - this._position;
            if (this.status != "PLAY") {
                var doAnimation = window.requestAnimationFrame;
                doAnimation(this.REQ_ANIMATION);
            }
            this.status = TimelineStatus.PLAY;
        }
    }
    play(delay) {
        clearTimeout(this.timeoutID);
        if (this.direction === -1 &&
            this.status !== TimelineStatus.PLAY &&
            this._position === 0 &&
            delay &&
            delay > 0) {
            this.timeoutID = setTimeout(() => {
                this.direction = 1;
                this.playInternal();
            }, delay);
            return;
        }
        this.direction = 1;
        this.playInternal();
    }
    reverse(delay) {
        clearTimeout(this.timeoutID);
        if (this.direction === 1 &&
            this.status !== TimelineStatus.PLAY &&
            this._position === this.duration &&
            delay &&
            delay > 0) {
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
        var _a, _b, _c, _d, _e, _f;
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
                (_b = (_a = this.callbacks).onComplete) === null || _b === void 0 ? void 0 : _b.call(_a);
            }
            else if (this.status == TimelineStatus.PLAY) {
                var doAnimation = window.requestAnimationFrame;
                if (doAnimation) {
                    doAnimation(this.REQ_ANIMATION);
                }
            }
        }
        else {
            this._position = Math.max(2 * this._position - (TIME - this.startTime), 0);
            this.startTime = TIME - this._position;
            if (this._position == 0) {
                this.status = TimelineStatus.STOP;
                (_d = (_c = this.callbacks).onComplete) === null || _d === void 0 ? void 0 : _d.call(_c);
            }
            else if (this.status == TimelineStatus.PLAY) {
                var doAnimation = window.requestAnimationFrame;
                if (doAnimation) {
                    doAnimation(this.REQ_ANIMATION);
                }
            }
        }
        (_f = (_e = this.callbacks).onChange) === null || _f === void 0 ? void 0 : _f.call(_e, this._position, this.direction);
        return true;
    }
    getTime(timeOffset, duration, easeFunction) {
        var time = Math.min(Math.max(this._position - timeOffset, 0), duration);
        if (easeFunction != null) {
            return easeFunction(time, 0, 1, duration);
        }
        return this.easeInOut(time, 0, 1, duration);
    }
    easeInOut(t, b, c, d) {
        return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
    }
}
