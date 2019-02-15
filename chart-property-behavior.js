import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
/** @polymerBehavior */
export const ChartPropertyBehavior = dedupingMixin(function(superClass) {
  return class extends superClass {
    static get properties() {
      return {
        type: {
          type: String,
          readOnly: true,
          value: 'bar',
        },

        chart: {
          notify: true
        },

        data: {
          type: Object,
          value: function () {
            return {};
          }
        },

        options: {
          type: Object,
          value: function () {
            return {};
          }
        },

        colors: {
          type: Array,
          value: function () {
            return [
              '#3366cc', '#ff9900', '#dc3912', '#109618', '#990099', '#0099c6', '#dd4477', '#66aa00', '#b82e2e',
              '#316395', '#994499', '#22aa99', '#aaaa11', '#6633cc', '#e67300', '#8b0707', '#651067', '#329262',
              '#5574a6', '#3b3eac', '#b77322', '#16d620', '#b91383', '#f4359e', '#9c5935', '#a9c413', '#2a778d',
              '#668d1c', '#bea413', '#0c5922', '#743411'
            ];
          }
        },

        labels: {
          type: Array,
          value: function () {
            return [];
          }
        },

        values: {
          type: Array,
          value: function () {
            return [];
          }
        },

        series: {
          type: Array,
          value: function() {
            return [];
          }
        }
      };
    }

    static get observers() {
      return [
        '_configurationChanged(data.*, options.*)',
        '_updateData(colors, labels, values, series)'
      ];
    }

    _configurationChanged(dataRecord, optionsRecord) {
      if (dataRecord.base.labels && dataRecord.base.datasets) {
        this.hasData = true;
      } else {
        this.hasData = false;
      }

      if (this.hasData && this.isAttached) {
        this._queue();
      }
    }

  }
});
