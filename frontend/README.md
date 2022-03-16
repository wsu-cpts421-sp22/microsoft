# Astronomalies React App

## Getting Started

To get started, ensure you have NPM installed. I like to use a package manager such as [NVM](https://github.com/nvm-sh/nvm), but you can also install it directly via the installers found on the [Node.js website](https://nodejs.org/en/download/).

Once these are installed, cd into the project directory and run this command to install required dependencies, such as MapBox and Reactstrap.
### `npm install --save`
<br/>

Once dependencies have been installed, you can run this command in the project directory to begin running the site locally:
### `npm start`

## Demo Explanation
<br/>
For now, we simply render multiple layers to demonstrate the capabilities of the map. In the next sprint, we will aggregate custom GeoJson sources rather than utilizing data sources available through mapbox. 

<br/>

We're rendering three different types of shape layers. The heatmap, which is populated via earthquake data. The pink polygons, which are populated via population density data, and the black dots, which are also populated via population density data. In the next sprint, we could use the heatmap to show gas densities, the polygons to continue showing population density, and the circles can be replaced with custom annotation layers to show important features, such as power plants, farms, etc.