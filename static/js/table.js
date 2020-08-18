// from data.js

var tableData = data;

// 1. ADDING TABLE DATA TO HTML STEP 1 TO STEP 5 //

// Get a reference to the table body

var tbody = d3.select("tbody");

// Console.log the UFO data from data.js

console.log(data);

// Step 1: Loop Through `data` and console.log each weather report object

tableData.forEach(function(ufodata) {
    
    console.log(ufodata);

// Step 2:  Use d3 to append one table row `tr` for each ufo report object

var row = tbody.append("tr");

// Step 3:  Use `Object.entries` to console.log each UFO report value

Object.entries(ufodata).forEach(function([key, value]) {
    
    console.log(key, value);

// Step 4: Use d3 to append 1 cell per ufo report value

var cell = row.append("td");

// Step 5: Use d3 to update each cell's text with
      
cell.text(value);

    });

});

