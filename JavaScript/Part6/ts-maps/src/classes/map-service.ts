import { Feature, Map, View } from "ol";
import { type Geometry, Point } from "ol/geom";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { useGeographic } from "ol/proj";
import { OSM, Vector as VectorSource } from "ol/source";
import { Icon, Style } from "ol/style";
import type { Coordinates } from "../interfaces/coordinates";

export class MapService {
  #map;
  #view;
  #vectorLayer;

  constructor(
    { latitude, longitude }: Coordinates,
    divMapId: string,
    zoom = 14,
  ) {
    useGeographic();

    this.#view = new View({
      center: [longitude, latitude],
      zoom,
    });

    this.#map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: divMapId,
      view: this.#view,
    });

    this.#vectorLayer = new VectorLayer<VectorSource>({
      map: this.#map,
      source: new VectorSource<Feature<Geometry>>({
        features: [],
      }),
    });
  }

  get view(): View {
    return this.#view;
  }

  createMarker(
    { latitude, longitude }: Coordinates,
    color = "#3399CC",
    borderColor = "#fff",
  ): Feature {
    const svgPin = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 48" width="32" height="48">
        <!-- Cuerpo del pin en forma de gota -->
        <path d="M16 1 C7.7 1 1 7.7 1 16 C1 27.5 16 47 16 47 C16 47 31 27.5 31 16 C31 7.7 24.3 1 16 1 Z" 
              fill="${color}" 
              stroke="${borderColor}" 
              stroke-width="2"/>
        <!-- Círculo interior -->
        <circle cx="16" cy="16" r="5.5" fill="${borderColor}"/>
      </svg>
    `;

    const positionFeature = new Feature({
      geometry: new Point([longitude, latitude]),
    });
    positionFeature.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          src: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgPin),
          scale: 1,
        }),
      }),
    );

    this.#vectorLayer.getSource()?.addFeature(positionFeature);

    return positionFeature;
  }
}
