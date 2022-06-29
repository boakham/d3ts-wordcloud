import {D3CloudTs} from 'd3-cloud-ts';

import * as d3 from 'd3';



export class D3TsWordcloud {

    protected svg!: d3.Selection<SVGSVGElement, unknown, null, undefined>;
    protected vis!: any;
  
    protected fill!: d3.ScaleOrdinal<string, string, never>;
  
    protected cloud!: D3CloudTs.Cloud;
  
    protected fontSize!: d3.ScalePower<number, number, never>;
  
    constructor(
      protected targetElement: HTMLDivElement,
      protected tags: D3CloudTs.Word[],
      protected ratio: number = 0.5625,
      protected fontFamily: string = 'impact',
      protected fontSizeRange: number[] = [10, 80],
    ) {
      this.init();
    }
  
    update(): void {
      this.cloud.config.font?.(this.fontFamily).spiral?.('archimedean');
      this.fontSize = d3.scaleSqrt().range(this.fontSizeRange);
  
      if (this.tags.length) {
        this.fontSize.domain([+this.tags[this.tags.length - 1].value || 1, +this.tags[0].value]);
      }
      this.cloud.config.stop?.().words?.(this.tags).start?.();
    }
  
    protected init(): void {
      this.fill = d3.scaleOrdinal(d3.schemeSet1);
      const w = 360;//this.targetElement.parentElement.offsetWidth;
      const h = 200;//this.targetElement.parentElement.offsetWidth * this.ratio;
  
      this.cloud = new D3CloudTs.Cloud();
      this.cloud.config
        .timeInterval?.(Infinity)
        .size?.([w, h])
        .fontSize?.((_: any, d: D3CloudTs.Word, i: number) => this.fontSize(+d.value))
        .text?.((_: any, d: D3CloudTs.Word, i: number) => d.key)
        .on?.(['end', this.draw.bind(this)]);
  
      this.svg = d3.select(this.targetElement).append('svg')
        .attr('width', w)
        .attr('height', h);
      this.vis = this.svg.append('g')
      this.vis = this.vis.attr('transform', 'translate(' + [w >> 1, h >> 1] + ')');
  
      this.update();
  
      if ((<any>window).attachEvent) {
        (<any>window).attachEvent('onresize', this.update.bind(this));
      } else if (window.addEventListener) {
        window.addEventListener('resize', this.update.bind(this));
      }
    }
  
    protected draw(data: D3CloudTs.Word[], bounds: { x: number, y: number }[]): void {
  
      const w = 360;//this.targetElement.parentElement.offsetWidth;
      const h = 200;//this.targetElement.parentElement.offsetWidth * this.ratio;
      this.svg.attr('width', w).attr('height', h);
  
      const scale = bounds ? Math.min(
        w / Math.abs(bounds[1].x - w / 2),
        w / Math.abs(bounds[0].x - w / 2),
        h / Math.abs(bounds[1].y - h / 2),
        h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;
  
  
      const text = this.vis.selectAll('text').data(data, (d: any) => d.text.toLowerCase());
  
      text.transition()
        .duration(1000)
        .attr('transform', (d: any) => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
        .style('font-size', (d: any) => d.size + 'px');
  
      text.enter()
        .append('text')
        .style('opacity', 1e-6)
        .transition()
        .duration(1000)
        .attr('text-anchor', 'middle')
        .attr('transform', (d: any) => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
        .style('font-size', (d: any) => d.size + 'px')
        .style('opacity', 1)
        .text((d: any) => d.text)
        .style('font-family', (d: any) => d.font)
        .style('fill', (d: any) => this.fill(d.text.toLowerCase()));
  
      this.vis.transition()
        .attr('transform', 'translate(' + [w >> 1, h >> 1] + ')scale(' + scale + ')');
    }
  }
  