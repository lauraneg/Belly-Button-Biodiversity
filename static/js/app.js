function buildMetadata(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      let metadata = data.metadata;
      let ansArray = metadata.filter(sampleObj => sampleObj.id == sample);
      let ans = ansArray[0];
      let PANEL = d3.select("#sample-metadata");
      PANEL.html("");
      Object.entries(ans).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    });
  }

  //build drop down 
  function init() {
    let selector = d3.select("#selDataset");
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      let sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
    });
  }

  function buildCharts(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      let samples = data.samples;
      let ansArray = samples.filter(sampleObj => sampleObj.id == sample);
      let ans = ansArray[0];
  
      let otu_ids = ans.otu_ids;
      let otu_labels = ans.otu_labels;
      let sample_values = ans.sample_values;

      //build bar 
      let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      let barData = [
        {
          type: "bar",
          y: yticks,
          x: sample_values.slice(0, 10).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          }
        ];
    
        let barLayout = {
          title: "Top 10 Bacteria Cultures Found",
          margin: { t: 20, l: 100 }
        };
    
        Plotly.newPlot("bar", barData, barLayout);
      });

      // Build Bubble Chart
      let bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30}
      };

      let bubbleData = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
          }
        }
      ];
  
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    };
    
    function optionChanged(newSample) {
      buildCharts(newSample);
      buildMetadata(newSample);
    }

      init();