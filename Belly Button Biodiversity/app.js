// Creating function for Data plotting (Bar, gauge, bubble)
function getPlot(id) {

  // Use D3 fetch to read the JSON file
  d3.json("samples.json").then((data) => {
      console.log(data)

      var wfreq = data.metadata.map(d => d.wfreq)
      console.log(`Washing Freq: ${wfreq}`)

      // filter the samples by their ID
      var samples = data.samples.filter(s => s.id.toString() === id) [0];

      console.log(samples);

      // Slice the top 10 samples and reverse the array due to Plotly's defautls
      var toptensamples = samples.sample_values.slice (0, 10).reverse();

      // Get the top 10 OTU IDs 
      var toptenids = (samples.otu_ids.slice(0, 10)).reverse();

      // Formulate the OTU IDs for plotting
      var topOTU = toptenids.map(d => "OTU " + d)

      console.log(`OTU IDS: ${topOTU}`)

      // Get the top ten labels
      var toptenlabels = samples.otu_labels.slice(0, 10);

      console.log(`Sample Values: ${toptensamples}`)
      console.log(`Id Values: ${toptenids}`)

      // Create a Trace for plotting a barchart
      var traceA = {
        x: toptensamples,
        y: topOTU,
        text: toptenlabels,
        type: "bar",
        orientation: "h",
      };

      // Create a variable to hold the Data
      var chartData = [traceA];

      // Create a variable to define the plots layout -- bar chart
      var layoutA = {
        title: "Top 10 OTU",
        yaxis:{
            tickmode:"linear",
        },
        margin: {
            l: 100,
            r: 100,
            t: 30,
            b: 20
        }
    };

    // Crete the Bar plot
    Plotly.newPlot("bar", chartData, layoutA);

    console.log('ID: ${samples.otu_ids}')


    // Create a Trace for the plotting the Bubble chart
    var traceB = {
      x: samples.otu_ids,
      y: samples.sample_values,
      mode: "markers",
      marker: {
        size: samples.samples_values,
        color: samples.otu_ids
      },
      text: samples.otu_labels
    };

    // Create a variable to hold the Data
    var BubbleData = [traceB];

    // Create a variable to define the plots layout -- bubble chart
    var layoutB = {
      xaxis:{title: "OTU ID"},
      height: 600,
      width: 1300
    };

    // Create the Bubble Chart
    Plotly.newPlot("bubble", BubbleData, layoutB);
  
});

}

// This is the function to handle a change event
function optionChanged(id) {
    getPlot(id);
}

// This is the function to create render the initial data
function init() {
  var dropdown = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data)

    // Populate the data for the ID into the dropdown menu
    data.names.forEach(function(name) {
      dropdown.append("option").text(name).property("value");
    });
    
    // Call the function so that the data is displayed and the plots are rendered
    getPlot(data.names[0]);

  });

}

init(); 