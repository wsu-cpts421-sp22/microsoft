import mapboxGl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { FooterNavigation } from '../../Components/FooterNavigation/FooterNavigation';

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

  //Temporary heat-map demo using MapBox provided GeoJson
  const [earthquakes, setEarthQuakes] = useState(null);

  //Initialize the map on component load
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxGl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);

  useEffect(() => {
    /* global fetch */
    fetch('https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson')
      .then(resp => resp.json())
      .then(json => {
        // Note: In a real application you would do a validation of JSON data before doing anything with it,
        // but for demonstration purposes we ingore this part here and just trying to select needed data...
        const features = json.features;

        setEarthQuakes(json);
      })
      .catch(err => console.error('Could not load data', err)); // eslint-disable-line
  }, []);


  return (
    <div style={styles.container}>
      <div style={styles.mapContainer} ref={mapContainer}></div>
      <FooterNavigation />
    </div>
  );
}

export {MapPage};
