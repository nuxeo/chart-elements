/**
A bar chart is a way of showing data as bars.

It is sometimes used to show trend data, and the comparison of multiple data sets side by side.

##### Example

    <chart-horizontal-bar data="[[data]]"></chart-horizontal-bar>

    ...

    this.data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(220,220,220,0.2)",
          borderColor: "rgba(220,220,220,1)",
          borderWidth: 1,
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "My Second dataset",
          backgroundColor: "rgba(151,187,205,0.2)",
          borderColor: "rgba(151,187,205,1)",
          borderWidth: 1,
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

@group Chart Elements
@element chart-bar
@demo demo/chart-bar.html
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
class ChartHorizontalBar extends ChartBehaviors.ResizeBehavior(ChartBehaviors.ContextBehavior(ChartBehaviors.ChartPropertyBehavior(mixinBehaviors([IronResizableBehavior], PolymerElement)))) {
  static get template() {
    return html`
    <style include="chart-styles"></style>

    <div>
      <canvas id="canvas"></canvas>
    </div>
`;
  }

  static get is() { return 'chart-horizontal-bar'; }

  ready() {
    super.ready();
    this._setType('horizontalBar');
  }

  _updateData() {
    this.data = {
      labels: this.labels,
      datasets: this.values.map((val, i) => ({
        data: this.values[i],
        label: this.series[i],
        fill: true,
        backgroundColor: this.colors[i],
        borderColor: this.colors[i],
        borderWidth: 1
      }))
    };
  }
}

window.customElements.define(ChartHorizontalBar.is, ChartHorizontalBar);
