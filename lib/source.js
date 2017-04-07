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
        _this.onSourceData = function (e) {
            var map = _this.context.map;
            var _a = _this, id = _a.id, props = _a.props;
            if (e.isSourceLoaded && e.sourceId === _this.props.id) {
                var source = map.getSource(id);
                if (source && props.geoJsonSource && props.geoJsonSource.data) {
                    source.setData(props.geoJsonSource.data);
                }
                if (source && props.onSourceLoaded) {
                    props.onSourceLoaded(source);
                }
                map.off('sourcedata', _this.onSourceData);
            }
        };
        _this.onMapLoaded = function () {
            var _a = _this, id = _a.id, props = _a.props;
            var map = _this.context.map;
            var geoJsonSource = props.geoJsonSource, tileJsonSource = props.tileJsonSource, onSourceAdded = props.onSourceAdded;
            if (tileJsonSource) {
                var source = map.getSource(id);
                if (!source) {
                    map.addSource(id, tileJsonSource);
                    map.on('sourcedata', _this.onSourceData);
                    if (onSourceAdded) {
                        onSourceAdded(map.getSource(id));
                    }
                }
            }
            if (geoJsonSource) {
                var source = map.getSource(id);
                if (!source) {
                    map.addSource(id, geoJsonSource);
                    map.on('sourcedata', _this.onSourceData);
                    if (onSourceAdded) {
                        onSourceAdded(map.getSource(id));
                    }
                }
            }
        };
        return _this;
    }
    Source.prototype.componentWillReceiveProps = function (nextProps) {
        var map = this.context.map;
        if (map.loaded()) {
            var _a = this.props, geoJsonSource = _a.geoJsonSource, tileJsonSource = _a.tileJsonSource, id = _a.id;
            if (tileJsonSource && nextProps.tileJsonSource) {
                var hasNewTilesSource = (tileJsonSource.url !== nextProps.tileJsonSource.url ||
                    tileJsonSource.tiles !== nextProps.tileJsonSource.tiles ||
                    tileJsonSource.minzoom !== nextProps.tileJsonSource.minzoom ||
                    tileJsonSource.maxzoom !== nextProps.tileJsonSource.maxzoom);
                if (hasNewTilesSource) {
                    map.removeSource(id);
                    map.addSource(id, nextProps.tileJsonSource);
                }
            }
            if ((geoJsonSource && nextProps.geoJsonSource) && nextProps.geoJsonSource.data !== geoJsonSource.data) {
                var source = map.getSource(id);
                source.setData(nextProps.geoJsonSource.data);
            }
        }
    };
    Source.prototype.componentWillUnmount = function () {
        var map = this.context.map;
        if (map && map.getStyle()) {
            if (this.id && map.getSource(this.id)) {
                map.removeSource(this.id);
            }
            map.off('load', this.onMapLoaded);
        }
    };
    Source.prototype.componentDidMount = function () {
        var map = this.context.map;
        if (map.loaded()) {
            this.onMapLoaded();
        }
        else {
            map.on('load', this.onMapLoaded);
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