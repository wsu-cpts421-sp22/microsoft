import mapboxGl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { Navigation } from '../../Components/FooterNavigation/Navigation';
import { LoadingModal } from '../../Components/LoadingModal/LoadingModal';
import { MapMeta } from '../../Components/MapMeta/MapMeta';
import { useDateRange } from '../../Components/UseDateRange/UseDateRange';
import { SupportedGasses } from '../../Constants/SupportedGasses';

mapboxGl.accessToken = "pk.eyJ1IjoiYXNoZXJoYW5kYWx5IiwiYSI6ImNsMHRyMTFvbzBweGMzY3BrYWdkYXk0bWcifQ.RwV5xSDWOO6aIhmd-LrWrA";

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
  const [initializingMap, setInitializingMap] = useState(true);
  const [loading, setLoading] = useState(true);

  const { 
    startDate,
    endDate,
    granularity,
    dateComponent,
    visualizingDate,
  } = useDateRange();

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
      setInitializingMap(false);

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

  //Simulate data loading on page load
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  //Update the map when the visualized date changes
  useEffect(() => {
    if (!map.current || initializingMap) return;
    map.current.removeLayer('earthquakes');    
    map.current.addLayer({
      id: 'earthquakes',
      source: 'earthquakes',
      type: 'heatmap',
      paint: {
        'heatmap-radius': Math.floor(Math.random() * 60) + 10,
        'heatmap-opacity': 0.75,
        'heatmap-intensity': 0.9
      },
    });

  }, [visualizingDate]);

  //Fetch the required data when the date changes
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [startDate, endDate]);



  return (
    <div style={styles.container}>
      {loading && <LoadingModal />}
      <div style={styles.mapContainer} ref={mapContainer}></div>
      <Navigation gas={gas} setGas={setGas} />
      <MapMeta lat={lat} lng={lng} zoom={zoom} />
      {dateComponent}
    </div>
  );
}

export {MapPage};
