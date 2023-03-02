import './App.css';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import Charts from "./components/chartComponents/Charts"
import ZoomCharts from './components/chartComponents/ZoomCharts';
export default function App() {
	return (

		<>
			<Router>

				<Routes>
					<Route path="/charts" element={<Charts />}></Route>
					<Route path="/zoomcharts" element={<ZoomCharts />}></Route>
				</Routes>

			</Router>
		</>

	)
}

