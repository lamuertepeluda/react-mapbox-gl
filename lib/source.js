"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Source = (function (_super) {
    __extends(Source, _super);
    function Source() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = _this.props.id;
        _this.onData = function (event) {
            var map = _this.context.map;
            console.debug('onData', event.isSourceLoaded, event);
            var source = map.getSource(_this.props.id);
            var onSourceLoaded = _this.props.onSourceLoaded;
            if (onSourceLoaded) {
                onSourceLoaded(source);
            }
            if (_this.props.geoJsonSource && _this.props.geoJsonSource.data) {
                source.setData(_this.props.geoJsonSource.data);
            }
            map.off('load', _this.onData);
        };
        return _this;
    }
    Source.prototype.componentWillMount = function () {
        var map = this.context.map;
        var _a = this.props, geoJsonSource = _a.geoJsonSource, tileJsonSource = _a.tileJsonSource, onSourceAdded = _a.onSourceAdded;
        if (!map.getSource(this.id) && (geoJsonSource || tileJsonSource)) {
            map.addSource(this.id, (geoJsonSource || tileJsonSource));
            map.on('load', this.onData);
            if (onSourceAdded) {
                onSourceAdded(map.getSource(this.id));
            }
        }
    };
    Source.prototype.componentWillUnmount = function () {
        var map = this.context.map;
        if (map.getSource(this.id)) {
            map.removeSource(this.id);
        }
    };
    Source.prototype.componentWillReceiveProps = function (props) {
        var id = this.id;
        var _a = this.props, geoJsonSource = _a.geoJsonSource, tileJsonSource = _a.tileJsonSource;
        var map = this.context.map;
        if (tileJsonSource && props.tileJsonSource) {
            var hasNewTilesSource = (tileJsonSource.url !== props.tileJsonSource.url ||
                tileJsonSource.tiles !== props.tileJsonSource.tiles ||
                tileJsonSource.minzoom !== props.tileJsonSource.minzoom ||
                tileJsonSource.maxzoom !== props.tileJsonSource.maxzoom);
            if (hasNewTilesSource) {
                map.removeSource(id);
                map.addSource(id, props.tileJsonSource);
            }
        }
        if ((geoJsonSource && props.geoJsonSource) && props.geoJsonSource.data !== geoJsonSource.data) {
            var source = map.getSource(id);
            source.setData(props.geoJsonSource.data);
        }
    };
    Source.prototype.render = function () {
        return null;
    };
    return Source;
}(React.Component));
Source.contextTypes = {
    map: React.PropTypes.object
};
exports.default = Source;
//# sourceMappingURL=source.js.map