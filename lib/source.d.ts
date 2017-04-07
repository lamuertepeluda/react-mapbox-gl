/// <reference types="mapbox-gl" />
/// <reference types="react" />
import * as React from 'react';
import { Map, GeoJSONSource, GeoJSONSourceRaw } from 'mapbox-gl';
import { TilesJson } from './util/types';
export interface Context {
    map: Map;
}
export interface Props {
    id: string;
    geoJsonSource?: GeoJSONSourceRaw;
    tileJsonSource?: TilesJson;
    onSourceAdded?: (source: GeoJSONSource | TilesJson) => any;
    onSourceLoaded?: (source: GeoJSONSource | TilesJson) => any;
}
export default class Source extends React.Component<Props, void> {
    context: Context;
    static contextTypes: {
        map: React.Requireable<any>;
    };
    private id;
    private onSourceData;
    private onMapLoaded;
    componentWillReceiveProps(nextProps: Props): void;
    componentWillUnmount(): void;
    componentDidMount(): void;
    render(): null;
}
