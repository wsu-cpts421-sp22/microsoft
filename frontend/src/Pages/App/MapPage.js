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
