declare type FAFunc = (progress: number) => void;
declare class FlameAnimation {
    private requestId;
    private startTime;
    private duration;
    private loopFrame;
    start(duration: number, frameFunc: FAFunc): Promise<void>;
    stop(): void;
}
declare const _default: FlameAnimation;
export default _default;
