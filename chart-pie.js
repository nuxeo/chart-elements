/**
Pie and doughnut charts are probably the most commonly used chart there are. They are divided into segments, the arc of each segment shows a the proportional value of each piece of data.

They are excellent at showing the relational proportions between data.

Pie and doughnut charts in are effectively the same class in Chart.js, but have one different default value - their percentageInnerCutout. This equates what percentage of the inner should be cut out. This defaults to 0 for pie charts, and 50 for doughnuts.

They are also registered under two aliases in the Chart core. Other than their different default value, and different alias, they are exactly the same.

##### Example

    <chart-pie data="[[data]]"></chart-pie>

    ...

    this.data = {
      labels: [
        "Red",
        "Green",
        "Yellow"
      ],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };

@group Chart Elements
@element chart-pie
@demo demo/chart-pie.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import './chart-js-import.js';
import { ChartPropertyBehavior } from './chart-property-behavior.js';
import { ContextBehavior } from './context-behavior.js';
import { ResizeBehavior } from './resize-behavior.js';
import './chart-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
class ChartPie extends ResizeBehavior(ContextBehavior(ChartPropertyBehavior(mixinBehaviors([IronResizableBehavior], PolymerElement)))) {
  static get template() {
    return html`
    <style include="chart-styles"></style>

    <div>
      <canvas id="canvas"></canvas>
    </div>
`;
  }

  static get is() { return 'chart-pie'; }

  ready() {
    super.ready();
    this.options = Object.assign({
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 12
        }
      },
      animation: {
        duration: 100,
        easing: "easeOutQuart",
        onComplete: this._drawValuesInPie
      }
    }, this.options);
    this._setType('pie');
  }

  _updateData() {
    this.data = {
      labels: this.labels,
      datasets: [{
        data: (this.values && this.values.length && Array.isArray(this.values[0])) ? this.values[0] : this.values,
        backgroundColor: this.colors,
        hoverBackgroundColor: this.colors
      }]
    };
  }

  // Source: https://stackoverflow.com/questions/33363373/how-to-display-pie-chart-data-values-of-each-slice-in-chart-js
  _drawValuesInPie() {
    const {ctx} = this.chart;
    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = '#fff';

    this.data.datasets.forEach((dataset) => {
      for (let i = 0; i < dataset.data.length; i++) {
        const dataSetMeta = dataset._meta;
        const dataSetMetaFirstProp = dataSetMeta[0] || dataSetMeta[Object.keys(dataSetMeta)[0]];

        const model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
        const mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius) / 2;
        const mid_angle = model.startAngle + (model.endAngle - model.startAngle) / 2;
        const total = dataset._meta[Object.keys(dataset._meta)[0]].total;
        const percent = Math.round(dataset.data[i]/ total * 100);
        const percentStr = String(percent) + "%";
        const x = mid_radius * Math.cos(mid_angle);
        const y = mid_radius * Math.sin(mid_angle);
       
        if(dataset.data[i] !== 0 && dataSetMetaFirstProp && !dataSetMetaFirstProp.data[i].hidden && percent > 5) {
          ctx.fillText(dataset.data[i], model.x + x, model.y + y);
        }
      }
    });               
  }

}

window.customElements.define(ChartPie.is, ChartPie);
