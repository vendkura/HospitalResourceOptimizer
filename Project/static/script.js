document.getElementById('predictionForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Collecter les données du formulaire
    const data = [{
        AGE: parseFloat(document.getElementById('age').value),
        "TYPE OF ADMISSION-EMERGENCY/OPD": parseInt(document.getElementById('type').value),
        ADMISSION_MONTH: parseFloat(document.getElementById('month').value),
        ADMISSION_SEASON: parseInt(document.getElementById('season').value),
        GENDER: parseInt(document.getElementById('gender').value)
    }];

    // Envoyer une requête POST à l'API Flask
    const response = await fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    // Traiter la réponse
    const result = await response.json();
    // Display prediction as text
    document.getElementById('result').innerText = `Predicted Stay Duration: ${result.predictions[0]} days`;

    // Create a bar chart with the prediction
    createBarChart(result.predictions[0]);
});

// Fuction to create a bar chart with D3.js
function createBarChart(prediction) {
    // Clear any existing chart
    d3.select("#chart").selectAll("*").remove();

    // Set dimensions and margins
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    // Create SVG container
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define the scale
    const xScale = d3.scaleBand()
        .domain(["Prediction"])
        .range([0, width])
        .padding(0.4);

    const yScale = d3.scaleLinear()
        .domain([0, Math.ceil(prediction)]) // Extend to the nearest whole number
        .range([height, 0]);

    // Add X axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("text-anchor", "middle");

    // Add Y axis
    svg.append("g")
        .call(d3.axisLeft(yScale));

    // Add bars
    svg.selectAll(".bar")
        .data([prediction]) // Data is the prediction
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale("Prediction"))
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(d))
        .attr("fill", "#69b3a2");
}


async function fetchHistoricalData() {
    const response = await fetch('/historical');
    const data = await response.json();

    // Visualize the data
    createLineChart(data);
}

function createLineChart(data) {
    // Clear existing chart
    d3.select("#chart").selectAll("*").remove();

    // Set dimensions and margins
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    // Create SVG container
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse data
    const months = data.map(d => d.ADMISSION_MONTH);
    const durations = data.map(d => d.STAY_DURATION);

    // Define scales
    const xScale = d3.scaleBand()
        .domain(months)
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(durations)])
        .range([height, 0]);

    // Add X axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("text-anchor", "middle");

    // Add Y axis
    svg.append("g")
        .call(d3.axisLeft(yScale));

    // Add line
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", d3.line()
            .x(d => xScale(d.ADMISSION_MONTH) + xScale.bandwidth() / 2)
            .y(d => yScale(d.STAY_DURATION))
        );
}

document.getElementById('historicalButton').addEventListener('click', function() {
    fetchHistoricalData();
});
