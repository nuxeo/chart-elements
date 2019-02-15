/**
A line chart is a way of plotting data points on a line.

Often, it is used to show trend data, and the comparison of two data sets.

##### Example

    <chart-line data="[[data]]"></chart-line>

    ...

    this.data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(220,220,220,0.2)",
          borderColor: "rgba(220,220,220,1)",
          borderWidth: 1,
          pointBackgroundColor: "rgba(220,220,220,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "My Second dataset",
          backgroundColor: "rgba(151,187,205,0.2)",
          borderColor: "rgba(151,187,205,1)",
          borderWidth: 1,
          pointBackgroundColor: "rgba(151,187,205,1)",
          pointBorderColor: "#fff",
          pointHighlightFill: "#fff",
          pointHoverBorderColor: "rgba(151,187,205,1)",
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

@group Chart Elements
@element chart-line
@demo demo/chart-line.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import './chart-js-import.js';
import './chart-property-behavior.js';
import './context-behavior.js';
import './resize-behavior.js';
import './chart-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
class ChartLine extends ChartBehaviors.ResizeBehavior(ChartBehaviors.ContextBehavior(ChartBehaviors.ChartPropertyBehavior(mixinBehaviors([IronResizableBehavior], PolymerElement)))) {
  static get template() {
    return html`
    <style include="chart-styles"></style>

    <div>
      <canvas id="canvas"></canvas>
    </div>
`;
  }

  static get is() { return 'chart-line'; }

  ready() {
    super.ready();
    this._setType('line');
  }

  _updateData() {
    this.data = {
      labels: this.labels,
      datasets: this.values.map((val, i) => ({
        data: this.values[i],
        label: this.series[i],
        fill: false,
        lineTension: 0,
        fillColor: this.colors[i],
        strokeColor: this.colors[i],
        pointColor: this.colors[i],
        borderWidth: 2,
        pointHitRadius: 20,
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 1,
        pointHoverBorderWidth: 1,
        pointBorderColor: '#fff',
        pointStrokeColor: this.colors[i],
        pointBackgroundColor: this.colors[i],
        borderColor: this.colors[i]
      }))
    };
  }
}

window.customElements.define(ChartLine.is, ChartLine);
