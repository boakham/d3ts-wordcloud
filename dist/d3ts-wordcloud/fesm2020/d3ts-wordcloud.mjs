import { D3CloudTs } from 'd3-cloud-ts';
import * as d3 from 'd3';

class D3TsWordcloud {
    constructor(targetElement, tags, ratio = 0.5625, fontFamily = 'impact', fontSizeRange = [10, 80]) {
        this.targetElement = targetElement;
        this.tags = tags;
        this.ratio = ratio;
        this.fontFamily = fontFamily;
        this.fontSizeRange = fontSizeRange;
        this.init();
    }
    update() {
        this.cloud.config.font?.(this.fontFamily).spiral?.('archimedean');
        this.fontSize = d3.scaleSqrt().range(this.fontSizeRange);
        if (this.tags.length) {
            this.fontSize.domain([+this.tags[this.tags.length - 1].value || 1, +this.tags[0].value]);
        }
        this.cloud.config.stop?.().words?.(this.tags).start?.();
    }
    init() {
        this.fill = d3.scaleOrdinal(d3.schemeSet1);
        const w = 360; //this.targetElement.parentElement.offsetWidth;
        const h = 200; //this.targetElement.parentElement.offsetWidth * this.ratio;
        this.cloud = new D3CloudTs.Cloud();
        this.cloud.config
            .timeInterval?.(Infinity)
            .size?.([w, h])
            .fontSize?.((_, d, i) => this.fontSize(+d.value))
            .text?.((_, d, i) => d.key)
            .on?.(['end', this.draw.bind(this)]);
        this.svg = d3.select(this.targetElement).append('svg')
            .attr('width', w)
            .attr('height', h);
        this.vis = this.svg.append('g');
        this.vis = this.vis.attr('transform', 'translate(' + [w >> 1, h >> 1] + ')');
        this.update();
        if (window.attachEvent) {
            window.attachEvent('onresize', this.update.bind(this));
        }
        else if (window.addEventListener) {
            window.addEventListener('resize', this.update.bind(this));
        }
    }
    draw(data, bounds) {
        const w = 360; //this.targetElement.parentElement.offsetWidth;
        const h = 200; //this.targetElement.parentElement.offsetWidth * this.ratio;
        this.svg.attr('width', w).attr('height', h);
        const scale = bounds ? Math.min(w / Math.abs(bounds[1].x - w / 2), w / Math.abs(bounds[0].x - w / 2), h / Math.abs(bounds[1].y - h / 2), h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;
        const text = this.vis.selectAll('text').data(data, (d) => d.text.toLowerCase());
        text.transition()
            .duration(1000)
            .attr('transform', (d) => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
            .style('font-size', (d) => d.size + 'px');
        text.enter()
            .append('text')
            .style('opacity', 1e-6)
            .transition()
            .duration(1000)
            .attr('text-anchor', 'middle')
            .attr('transform', (d) => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
            .style('font-size', (d) => d.size + 'px')
            .style('opacity', 1)
            .text((d) => d.text)
            .style('font-family', (d) => d.font)
            .style('fill', (d) => this.fill(d.text.toLowerCase()));
        this.vis.transition()
            .attr('transform', 'translate(' + [w >> 1, h >> 1] + ')scale(' + scale + ')');
    }
}

/*
 * Public API Surface of d3ts-wordcloud
 */

/**
 * Generated bundle index. Do not edit.
 */

export { D3TsWordcloud };
//# sourceMappingURL=d3ts-wordcloud.mjs.map
