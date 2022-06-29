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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        (_d = (_b = (_a = this.cloud.config).font) === null || _b === void 0 ? void 0 : (_c = _b.call(_a, this.fontFamily)).spiral) === null || _d === void 0 ? void 0 : _d.call(_c, 'archimedean');
        this.fontSize = d3.scaleSqrt().range(this.fontSizeRange);
        if (this.tags.length) {
            this.fontSize.domain([+this.tags[this.tags.length - 1].value || 1, +this.tags[0].value]);
        }
        (_k = (_h = (_f = (_e = this.cloud.config).stop) === null || _f === void 0 ? void 0 : (_g = _f.call(_e)).words) === null || _h === void 0 ? void 0 : (_j = _h.call(_g, this.tags)).start) === null || _k === void 0 ? void 0 : _k.call(_j);
    }
    init() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.fill = d3.scaleOrdinal(d3.schemeSet1);
        const w = 360; //this.targetElement.parentElement.offsetWidth;
        const h = 200; //this.targetElement.parentElement.offsetWidth * this.ratio;
        this.cloud = new D3CloudTs.Cloud();
        (_k = (_h = (_f = (_d = (_b = (_a = this.cloud.config).timeInterval) === null || _b === void 0 ? void 0 : (_c = _b.call(_a, Infinity)).size) === null || _d === void 0 ? void 0 : (_e = _d.call(_c, [w, h])).fontSize) === null || _f === void 0 ? void 0 : (_g = _f.call(_e, (_, d, i) => this.fontSize(+d.value))).text) === null || _h === void 0 ? void 0 : (_j = _h.call(_g, (_, d, i) => d.key)).on) === null || _k === void 0 ? void 0 : _k.call(_j, ['end', this.draw.bind(this)]);
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
