// Create a function that uses D3 to fetch the JSON data and creates a plot for an ID
// function getPlot(id) {
    // getting data from the json file
    d3.json("samples.json").then((data)=> {
      console.log(data)