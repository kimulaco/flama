import { Styles } from '../types';
interface AnimateOption {
    duration?: number;
    delay?: number;
    easing?: string;
}
declare class FlamaAnimate {
    private option;
    private createDiffStyles;
    start(element: HTMLElement, styles: Styles, option?: AnimateOption): Promise<void>;
}
declare const flamaAnimate: FlamaAnimate;
export default flamaAnimate;
