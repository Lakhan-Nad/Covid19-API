import React from "react";
import GoogleMapReact from "google-map-react";
import Supercluster from "supercluster";

import { reduceClusters, makeGeoJSONFeature } from "./format";
import Marker from "./marker";
import { Container } from "semantic-ui-react";

const GOOGLE_API_KEY = "AIzaSyDRV_Ibr7waeScMy2fUPuQrxHlQiYC5ZaM";
const INDIA_LAT = 24.193684;
const INDIA_LOT = 78.96288;
const RADIUS = 90;
const DEFAULT_ZOOM = 4;
const REGION = "IN";
const MAX_ZOOM = 18;

const distanceToMouse = (markerPos, mousePos, markerProps) => {
  if (markerPos && mousePos) {
    if (markerProps) {
      if (!markerProps.properties.cluster) {
        return RADIUS;
      }
    }
    return Math.sqrt(
      (markerPos.x - mousePos.x) * (markerPos.x - mousePos.x) +
        (markerPos.y - mousePos.y) * (markerPos.y - mousePos.y)
    );
  }
};

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.updateOnChange = this.updateOnChange.bind(this);
    this.onChildClick = this.onChildClick.bind(this);
    this.state = {
      center: [INDIA_LAT, INDIA_LOT],
      zoom: DEFAULT_ZOOM,
      bounds: [-180, -85, 180, 85],
    };
    this.supercluster = new Supercluster({
      reduce: reduceClusters,
      maxZoom: MAX_ZOOM,
      radius: RADIUS,
    });
    this.supercluster.load(
      this.props.data.map((val) => {
        return makeGeoJSONFeature(val.lng, val.lat, val.status);
      })
    );
  }

  updateOnChange({ center, zoom, bounds }) {
    this.setState({
      bounds: [bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat],
      center: center,
      zoom: zoom,
    });
  }

  onChildClick(key, props) {
    if (props.properties.cluster) {
      this.setState({
        center: [props.lat, props.lng],
        zoom: this.state.zoom + 1,
      });
    }
  }

  render() {
    return (
      <Container textAlign="center" style={{ height: "600px", width: "800px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ region: REGION, key: GOOGLE_API_KEY }}
          yesIWantToUseGoogleMapApiInternals
          center={this.state.center}
          zoom={this.state.zoom}
          onChange={this.updateOnChange}
          distanceToMouse={distanceToMouse}
          hoverDistance={RADIUS / 2}
          onChildClick={this.onChildClick}
        >
          {this.supercluster
            .getClusters(this.state.bounds, this.state.zoom)
            .map((val, id) => (
              <Marker
                key={id}
                properties={val.properties}
                lat={val.geometry.coordinates[1]}
                lng={val.geometry.coordinates[0]}
              />
            ))}
        </GoogleMapReact>
      </Container>
    );
  }
}
