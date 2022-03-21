import mapboxGl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { Navigation } from '../../Components/FooterNavigation/Navigation';
import { MapMeta } from '../../Components/MapMeta/MapMeta';
import { SupportedGasses } from '../../Constants/SupportedGasses';

mapboxGl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  mapContainer: {
    width: '100%',
    height: '100%',
  },
};

const MapPage = (props) => {

  //References
  const mapContainer = useRef(null);
  const map = useRef(null);

  //Default coordinates for Redmond WA
  const [lng, setLng] = useState(-122.121013);
  const [lat, setLat] = useState(47.671947);
  const [zoom, setZoom] = useState(12);

  //Visualize the selected gas
  const [gas, setGas] = useState(SupportedGasses[0].key);

  //Initialize the map on component load
  useEffect(() => {
    if (map.current) return; // initialize map only once

    //Initialize the map
    map.current = new mapboxGl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    //Update coordinates and zoom level when the map is changed
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    //Add demo heatmap once the map is loaded
    map.current.on('load', () => {
      map.current.addSource('earthquakes', {
        type: 'geojson',
        data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
      });

      map.current.addLayer({
        id: 'earthquakes',
        source: 'earthquakes',
        type: 'heatmap',
        paint: {
          'heatmap-radius': 30,
          'heatmap-opacity': 0.75,
          'heatmap-intensity': 0.9
        },
      });

      const layers = map.current.getStyle().layers;
      // Find the index of the first symbol layer in the map style.
      let firstSymbolId;
      for (const layer of layers) {
        if (layer.type === 'symbol') {
          firstSymbolId = layer.id;
          break;
        }
      }

      map.current.addSource('urban-areas', {
        'type': 'geojson',
        'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/ne_50m_urban_areas.geojson'
      });
        
      map.current.addLayer({
        'id': 'urban-areas-fill',
        'type': 'fill',
        'source': 'urban-areas',
        'layout': {},
        'paint': {
          'fill-color': '#f08',
          'fill-opacity': 0.4
        }
      }, firstSymbolId);
      
      map.current.addLayer({
        'id': 'population',
        'type': 'circle',
        'source': 'urban-areas',
        'paint': {
          // Make circles larger as the user zooms from z12 to z22.
          'circle-radius': {
            'base': 1.75,
            'stops': [
              [12, 6],
              [22, 30]
            ]
          },
        }
      });

    });
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.mapContainer} ref={mapContainer}></div>
      <Navigation gas={gas} setGas={setGas} />
      <MapMeta lat={lat} lng={lng} zoom={zoom} />
    </div>
  );
}

export {MapPage};
