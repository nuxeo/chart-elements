import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
var ChartBehaviors = ChartBehaviors || {};
/** @polymerBehavior */
ChartBehaviors.ResizeBehavior = dedupingMixin(function(superClass) {
  return class extends superClass {

    connectedCallback() {
      super.connectedCallback();
      this._boundOnIronResize = this._onIronResize.bind(this);
      this.addEventListener('iron-resize', this._boundOnIronResize);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener('iron-resize', this._boundOnIronResize);
    }

    // If an iron-resizer changes our size and notifies us
    // check to see if we have a height and if so, recreate
    // the chart
    _onIronResize() {
      this._queue();
    }

    // This is a public method the user can call if they've
    // changed our dimensions with CSS.
    resize() {
      if (this.chart) {
        this.chart.resize();
        this.chart.render(true);
      }
    }
  }
});
