import { D3CloudTs } from 'd3-cloud-ts';
import * as d3 from 'd3';
export declare class D3TsWordcloud {
    protected targetElement: HTMLDivElement;
    protected tags: D3CloudTs.Word[];
    protected ratio: number;
    protected fontFamily: string;
    protected fontSizeRange: number[];
    protected svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
    protected vis: any;
    protected fill: d3.ScaleOrdinal<string, string, never>;
    protected cloud: D3CloudTs.Cloud;
    protected fontSize: d3.ScalePower<number, number, never>;
    constructor(targetElement: HTMLDivElement, tags: D3CloudTs.Word[], ratio?: number, fontFamily?: string, fontSizeRange?: number[]);
    update(): void;
    protected init(): void;
    protected draw(data: D3CloudTs.Word[], bounds: {
        x: number;
        y: number;
    }[]): void;
}
