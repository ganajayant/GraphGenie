import React, {useRef, useState } from "react";
import Papa from "papaparse";
import {
	VictoryBar, VictoryChart, VictoryAxis,
	VictoryTheme, VictoryArea, VictoryPolarAxis,VictoryContainer, VictoryLine, VictoryPie, VictoryScatter, VictoryZoomContainer, VictoryBrushContainer
} from 'victory';
const saveSvgAsPng = require("save-svg-as-png");
const allowedExtensions = ["csv"];




const ZoomCharts = () => {

	const [headers, setHeaders] = useState([]);
	const [error, setError] = useState("");
	const [file, setFile] = useState("");
	const [data, setData] = useState([]);
	const [flag, setFlag] = useState(false);
	const handleFileChange = (e) => {
		setError("");
		if (e.target.files.length) {
			const inputFile = e.target.files[0];
			const fileExtension = inputFile?.type.split("/")[1];
			if (!allowedExtensions.includes(fileExtension)) {
				setError("Please input a csv file");
				return;
			}
			setFile(inputFile);
		}
	};

	let chartref=[]
	chartref.push(useRef(null)); 
	chartref.push(useRef(null)); 
	chartref.push(useRef(null)); 
	chartref.push(useRef(null)); 
	chartref.push(useRef(null)); 
	chartref.push(useRef(null)); 

	const handleParse = () => {

		if (!file) return setError("Enter a valid file");
		const reader = new FileReader();
		reader.onload = async ({ target }) => {
			const csv = Papa.parse(target.result, { header: true });
			const parsedData = csv?.data;
			const columns = Object.keys(parsedData[0]);
			console.log(parsedData.length)

			console.log(columns);
			const val = columns[0];
			parsedData.map((a) => {
				console.log(a[val]);
				for (let i = 0; i < columns.length; i++) {
					a[columns[i]] = parseInt(a[columns[i]]);
				}


			})

			setHeaders(columns);
			setData(parsedData);
			setFlag(true);

			console.log(data);
		};
		reader.readAsText(file);

	};


	return (
		<div>
			<input
				onChange={handleFileChange}
				id="csvInput"
				name="file"
				type="File"
			/>
			<div>
				<button id="visualize" onClick={handleParse}>Visualize</button>
			</div>
			{

				(flag) ?
					<div className="row">
						<div className="zoomChartSpace md-6">
							<VictoryChart
								domain={{ y: [0, 100] }}
								// containerComponent={}
								domainPadding={20}
								containerComponent={
									// <VictoryZoomContainer zoomDomain={{ x: [5, 35], y: [0, 100] }} />
									<VictoryContainer
										containerRef={(ref) => {
											console.log(ref);
											chartref[0].current = ref;
										}}
									/>
								}
							>
								<VictoryScatter
									data={data}
									style={{
										data: {
											opacity: ({ datum }) => datum.y % 5 === 0 ? 1 : 0.7,
											fill: ({ datum }) => datum.y % 5 === 0 ? "tomato" : "black"
										}
									}}
								/>
							</VictoryChart>
						</div>

						<div className="zoomChartSpace md-6">
							<VictoryChart
								theme={VictoryTheme.material}
								domain={{ y: [0, 100] }}
								containerComponent={<VictoryZoomContainer zoomDomain={{ x: [5, 35], y: [0, 100] }} />}
							>
								<VictoryBar

									style={{
										data: {
											opacity: 1,
											fill: "tomato"
										}

									}}
									barRatio={0.6}
									data={data}
									x={headers[0]}
									y={headers[1]}
									animate={{
										duration: 2000,
										onLoad: { duration: 1000 }
									}}
								/>
							</VictoryChart>
						</div>


						<div className="zoomChartSpace md-6">

							<VictoryChart
								theme={VictoryTheme.material}
								domain={{ y: [0, 100] }}
								containerComponent={<VictoryZoomContainer zoomDomain={{ x: [5, 35], y: [0, 100] }} />}
							>
								<VictoryArea
									style={{ data: { opacity: 1, fill: "#c43a31" } }}
									data={data}
									x={headers[0]}
									y={headers[1]}
									animate={{
										duration: 2000,
										onLoad: { duration: 1000 }
									}}
								/>
							</VictoryChart>

						</div>

					</div>






					: <div></div>
			}



		</div>
	);
};

export default ZoomCharts;
