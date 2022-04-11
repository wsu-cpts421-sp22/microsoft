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

<br/>

## Sprint 2 - Loading Notes
For sprint 2 I also added a loading overlay component. When the page first appears, this component will be visible for 2 seconds as the map loads and to simulate the data fetch, which will be added in a future sprint. 

## Sprint 2 - Time Range Notes
During sprint 2 I made a number of changes to the frontend application centered around visualizing a time range. Since most of the time was dedicated to R&D for implementing this feature, I'm adding the results of the research here for later use. First, the time scale feature is made up of a few new UI components, all housed within the useDateRange React hook. I'm using a react hook here rather than a component so the data housed in the hook can also be propegated to the parent component. For example, all date range state is stored in the hook rather than the parent in order to keep the primary page as clean as possible. These objects are then passed and destructured in the parent for use there. This would not be possible with a plain react component. Additionally, the UI component for all date manipulation is returned from the hook and rendered in the parent, keeping all date-related UI code to the custom hook, again, keeping the parent clean. The UI is made up of a few components, a start date picker, end date picker, and a range visualization slider. The slider will allow the user to view the change in the gas over the time range provided. The main complexity here will be querying the data and updating the map as things change, so I have set the project up with this consideration in mind. When the start or end date changes, a useEffect hook in the parent will be called, which will present the loading modal and allowing the range of data to be queried in the future. Once the data has been fetched, the loader will be hidden, the slider is initialized to the 0 position, and the map will be updated. From there, we will have all the data for the range stored locally, so another fetch is not required when the slider changes, allowing a better UX than requiring a separate query for every change. You'll notice we also destructure a visualizedDate variable from the useDateRange hook. This is the currently visualized date based on the slider position, 0 being the startDate and n being the endDate. Whenever the visualizedDate variable changes, another useEffect hook in the parent is triggered, which will allow us to update the map for the newly visualized date. For now, this simply generates a random new radius for the heatmap, which simulates the data change. Ultimately, we should be ready to implement data fetching in the next sprint as we make more progress on the backend. 
