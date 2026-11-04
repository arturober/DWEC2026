import { Point } from "ol/geom";
import { MapService } from "./classes/map-service";
import { MyGeolocation } from "./classes/my-geolocation";
import type { Coordinates } from "./interfaces/coordinates";
import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";
import type { GeolocationResult } from "./interfaces/geolocation-result";

function showMap(coords: Coordinates): void {
  const mapService = new MapService(coords, "map");
  const marker = mapService.createMarker(coords);

  const autocomplete = new GeocoderAutocomplete(
    document.getElementById("autocomplete")!,
    "42c7710f83bc41698b841fec7a3b5d2d",
    { lang: "es", debounceDelay: 600 }
  );

  autocomplete.on("select", (location: GeolocationResult) => {
  marker.setGeometry(new Point(location.geometry.coordinates));
  mapService.view.setCenter(location.geometry.coordinates);
});
}

MyGeolocation.getLocation().then(coords => showMap(coords));
