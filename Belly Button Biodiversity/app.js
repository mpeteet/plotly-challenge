// Create a function that uses D3 to fetch the JSON data and creates a plot for an ID

var jsData;

function init(){
    var selector = d3.select("#selDataset");

    d3.json("static/js/data/samples.json").then((data) =>{
      jsData = data;
        var subjectID = data.names;
        subjectID.forEach((ID) => {
            selector
            .append('option')
            .text(ID)
            .property('value', ID);
        });
    const firstbutton = subjectID[0];
    updateCharts(firstbutton);
    updateMetadata(firstbutton);
    });
}
  
  function updateCharts(sample) {    
    d3.json("static/js/data/samples.json").then((data) => {
    var samples = data.samples;
    var filterArray = samples.filter(sampleObject => sampleObject.id == sample);
    var result = filterArray[0];
    var sample_values = result.sample_values;
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;   
    var trace1 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
        size: sample_values,
        color: otu_ids,
        colorscale:"viridis"
        }
    };
    var data = [trace1];
    var layout = {
        title: 'Bacteria Cultures per Sample',
        showlegend: false,
        hovermode: 'closest',
        xaxis: {title:"OTU (Operational Taxonomic Unit) ID " +sample},
        font: { color: "#49a81d", family: "Arial, Helvetica, sans-serif" },
        margin: {t:30}
    };
    Plotly.newPlot('bubble', data, layout); 
    var trace1 = {
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        name: "Greek",
        type: "bar",
        orientation: "h"
    };
    var data = [trace1];
    var layout = {
        title: "Top Ten OTUs for Individual " +sample,
        margin: {l: 100, r: 100, t: 100, b: 100},
        font: { color: "#49a81d", family: "Arial, Helvetica, sans-serif" }
    };
    Plotly.newPlot("bar", data, layout);  
    });
  }
  
//   function updateMetadata(sample) {
//     d3.json("samples.json").then((data) => {
//         var metadata = data.metadata;
//         var filterArray = metadata.filter(sampleObject => sampleObject.id == sample);
//         var result = filterArray[0];
//         var metaPanel = d3.select("#sample-metadata");
//         metaPanel.html("");
//         Object.entries(result).forEach(([key, value]) => {
//             metaPanel.append("h6").text(`${key.toUpperCase()}: ${value}`)
//         })
    
//     var data = [
//       {
//         domain: { x: [0, 1], y: [0, 1] },
//         marker: {size: 28, color:'850000'},
//         value: result.wfreq,
//         title: 'Belly Button Washing Frequency<br> Scrubs per Week',
//         titlefont: {family: '"Arial, Helvetica, sans-serif'},
//         type: "indicator",
//         gauge: { axis: { visible: true, range: [0, 9] } },
//         mode: "number+gauge"
//       }
//     ];
  
//     var layout = {
//       width: 600,
//        height: 450,
//        margin: { t: 100, r: 100, l: 100, b: 100 },
//        line: {
//        color: '600000'
//        },
//        font: { color: "#49a81d", family: "Arial, Helvetica, sans-serif" }
//      };
  
    
//     Plotly.newPlot("gauge", data, layout);
//     });
//   }
  
  // function optionChanged(newSample) {
  //   updateMetadata(newSample);
  //   updateCharts(newSample);
  // }
  
  // init();