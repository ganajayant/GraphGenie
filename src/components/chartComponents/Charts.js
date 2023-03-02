import Papa from "papaparse";
import React, { useRef, useState } from "react";
import { VictoryArea, VictoryBar, VictoryChart, VictoryContainer, VictoryLine, VictoryPie, VictoryPolarAxis, VictoryScatter, VictoryTheme } from 'victory';
const saveSvgAsPng = require("save-svg-as-png");
const allowedExtensions = ["csv"];

const Charts = () => {

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

	
	let chartref=[]
	chartref.push(useRef(null)); 
	chartref.push(useRef(null)); 
	chartref.push(useRef(null)); 
	chartref.push(useRef(null)); 
	chartref.push(useRef(null)); 
	chartref.push(useRef(null)); 

	const handleExport = (ind) => {
		console.log(chartref[ind].current);
		saveSvgAsPng.saveSvgAsPng(chartref[ind].current.firstChild, "diagram.png", {
			scale: 5,
			encoderOptions: 1,
			backgroundColor: "white"
		});
	}

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
						<div className="chartSpace md-4">
							<VictoryChart
								theme={VictoryTheme.material}
								domainPadding={20}
								containerComponent={
									<VictoryContainer
										containerRef={(ref) => {
											console.log(ref);
											chartref[0].current = ref;
										}}
									/>
								}
							>
								<VictoryBar

									style={{
										data: { fill: "tomato" }

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
							<div>
								<button id="download" onClick={()=>{
									saveSvgAsPng.saveSvgAsPng(chartref[0].current.firstChild, "diagram.png", {
										scale: 5,
										encoderOptions: 1,
										backgroundColor: "white"
									});
								}}>Download</button>
							</div>
						</div>
						<div className="chartSpace md-4">
							<VictoryChart
								theme={VictoryTheme.material}
								domainPadding={20}
								containerComponent={
									<VictoryContainer
										containerRef={(ref) => {
											console.log(ref);
											chartref[1].current = ref;
										}}
									/>
								}
							>
								<VictoryArea
									style={{ data: { fill: "#c43a31" } }}
									data={data}
									x={headers[0]}
									y={headers[1]}
									animate={{
										duration: 2000,
										onLoad: { duration: 1000 }
									}}
								/>
								
							</VictoryChart>
							<div>
								<button id="download" onClick={()=>{
									saveSvgAsPng.saveSvgAsPng(chartref[1].current.firstChild, "diagram.png", {
										scale: 5,
										encoderOptions: 1,
										backgroundColor: "white"
									});
								}}>Download</button>
							</div>
						</div>

						<div className="chartSpace md-4">
							<VictoryChart polar
								theme={VictoryTheme.material}
								domainPadding={20}
								containerComponent={
									<VictoryContainer
										containerRef={(ref) => {
											console.log(ref);
											chartref[2].current = ref;
										}}
									/>
								}
							>
								<VictoryArea
									style={{ data: { fill: "#c43a31" } }}
									data={data}
									x={headers[0]}
									y={headers[1]}
									animate={{
										duration: 2000,
										onLoad: { duration: 1000 }
									}}

								/>
								<VictoryPolarAxis />
							</VictoryChart>
							<div>
								<button id="download" onClick={()=>{
									saveSvgAsPng.saveSvgAsPng(chartref[2].current.firstChild, "diagram.png", {
										scale: 5,
										encoderOptions: 1,
										backgroundColor: "white"
									});
								}}>Download</button>
							</div>
						</div>
						<div className="chartSpace md-4">
							<VictoryChart
								theme={VictoryTheme.material}
								domainPadding={20}
								containerComponent={
									<VictoryContainer
										containerRef={(ref) => {
											console.log(ref);
											chartref[3].current = ref;
										}}
									/>
								}
							>
								<VictoryLine
									style={{
										data: { stroke: "#c43a31" },
										parent: { border: "1px solid #ccc" }

									}}
									x={headers[0]}
									y={headers[1]}
									animate={{
										duration: 2000,
										onLoad: { duration: 1000 }
									}}
									data={data}
								/>
							</VictoryChart>
							<div>
								<button id="download" onClick={()=>{
									saveSvgAsPng.saveSvgAsPng(chartref[3].current.firstChild, "diagram.png", {
										scale: 5,
										encoderOptions: 1,
										backgroundColor: "white"
									});
								}}>Download</button>
							</div>
						</div>

						<div className="chartSpace md-4">
							<VictoryChart
								theme={VictoryTheme.material}
								domainPadding={20}
								containerComponent={
									<VictoryContainer
										containerRef={(ref) => {
											console.log(ref);
											chartref[4].current = ref;
										}}
									/>
								}
							>
							
								<VictoryPie
									data={data}
								/>
							</VictoryChart>
							<button id="download" onClick={()=>{
									saveSvgAsPng.saveSvgAsPng(chartref[4].current.firstChild, "diagram.png", {
										scale: 5,
										encoderOptions: 1,
										backgroundColor: "white"
									});
								}}>Download</button>
						</div>

						<div className="chartSpace md-4">
							<VictoryChart
								theme={VictoryTheme.material}
								domainPadding={20}
								containerComponent={
									<VictoryContainer
										containerRef={(ref) => {
											console.log(ref);
											chartref[5].current = ref;
										}}
									/>
								}

							>
								<VictoryScatter
									style={{ data: { fill: "#c43a31" } }}
									data={data}
								/>
							</VictoryChart>
							<button id="download" onClick={()=>{
									saveSvgAsPng.saveSvgAsPng(chartref[5	].current.firstChild, "diagram.png", {
										scale: 5,
										encoderOptions: 1,
										backgroundColor: "white"
									});
								}}>Download</button>
						</div>




					</div>

					: <div></div>
			}



		</div>
	);
};

export default Charts;
