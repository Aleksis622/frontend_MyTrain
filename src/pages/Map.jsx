import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import Echo from "laravel-echo";
import api from "../api/api";
import "./Map.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function Map() {
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const routeRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "train-map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [24.1, 56.95], 
      zoom: 8,
    });

    mapRef.current = map;

    map.on("load", () => {
      loadInitialPositions();
      subscribeToReverb();
    });

    return () => map.remove();
  }, []);

  const loadInitialPositions = async () => {
    const res = await api.get("/map/trains");

    res.data.forEach(async (pos) => {
      await loadRouteLine(pos.trip_id);
      addOrUpdateMarker(pos);
    });
  };

  const loadRouteLine = async (tripId) => {
    if (!tripId) return;

    const res = await api.get(`/map/train-route/${tripId}`);
    const coords = res.data;

    routeRef.current = coords;

    if (mapRef.current.getSource("train-route")) {
      mapRef.current.removeLayer("train-route-line");
      mapRef.current.removeSource("train-route");
    }

    mapRef.current.addSource("train-route", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: coords,
        },
      },
    });

    mapRef.current.addLayer({
      id: "train-route-line",
      type: "line",
      source: "train-route",
      paint: {
        "line-color": "#0077ff",
        "line-width": 4,
      },
    });
  };

  const addOrUpdateMarker = (pos) => {
    const id = pos.train_id;
    const lngLat = [pos.longitude, pos.latitude];

    if (markersRef.current[id]) {
      animateMarker(markersRef.current[id], lngLat);
      return;
    }

    const el = document.createElement("div");
    el.className = "train-marker";

    const marker = new mapboxgl.Marker(el)
      .setLngLat(lngLat)
      .setPopup(
        new mapboxgl.Popup().setHTML(`
          <b>${pos.train?.name || "Train"}</b><br/>
          Speed: ${pos.speed || 0} km/h<br/>
          Heading: ${pos.heading || 0}°
        `)
      )
      .addTo(mapRef.current);

    markersRef.current[id] = marker;
  };

  const animateMarker = (marker, targetLngLat) => {
    const start = marker.getLngLat();
    const end = targetLngLat;

    let frame = 0;
    const frames = 30;

    const animate = () => {
      frame++;
      const lng = start.lng + ((end[0] - start.lng) * frame) / frames;
      const lat = start.lat + ((end[1] - start.lat) * frame) / frames;

      marker.setLngLat([lng, lat]);

      if (frame < frames) requestAnimationFrame(animate);
    };

    animate();
  };

  const subscribeToReverb = () => {
    window.Echo = new Echo({
      broadcaster: "reverb",
      key: import.meta.env.VITE_REVERB_APP_KEY,
      wsHost: import.meta.env.VITE_REVERB_HOST,
      wsPort: import.meta.env.VITE_REVERB_PORT,
      scheme: import.meta.env.VITE_REVERB_SCHEME,
      forceTLS: false,
    });

    window.Echo.channel("map-trains").listen("TrainPositionUpdated", (pos) => {
      addOrUpdateMarker(pos);
    });
  };

  return <div id="train-map" className="map-container"></div>;
}

export default Map;
