var mapboxAccessToken =
    'pk.eyJ1IjoiZGFpc3kwMjIzIiwiYSI6ImNrYnZmZmt3YzAxM2IycG12cDZoNDBlYWUifQ.oSsci1DmRTqHBU19snkUzA'
var map = L.map('map').setView([37.8, -96], 4)

// Step1: Basic States Map

L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' +
    mapboxAccessToken,
    {
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1
    }
).addTo(map)

L.geoJson(statesData).addTo(map)

// Step2: Adding Some Color

function getColor(d) {
    return d > 0.9  ? '#a50f15':
           d > 0.8  ? '#de2d26':
           d > 0.7  ? '#fb6a4a':
           d > 0.6  ? '#fc9272':
           d > 0.5  ? '#990099':
           d > 0.4  ? '#9ecae1':
           d > 0.3  ? '#6baed6':
           d > 0.2  ? '#4292c6':
           d > 0.1 ? '#2171b5':
                "#084594";
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.Ideology_Score),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    }
}

L.geoJson(statesData, { style: style }).addTo(map)

// Step3: Adding Interaction

function highlightFeature(e) {
    var layer = e.target

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    })

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront()
    }
}

function resetHighlight(e) {
    geojson.resetStyle(e.target)
}

var geojson
// ... our listeners
geojson = L.geoJson(statesData)

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds())
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    })
}

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map)

//Step4: Custom Info control

var info = L.control()

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info') // create a div with a class "info"
    this.update()
    return this._div
}

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML =
        '<h4>State Data</h4>' +
        (props
            ? '<b>' +
            props.name +
            '</b><br/>' +
            'Ideology Score: ' +
            props.Ideology_Score.toFixed(2) +
            '</b><br />' +
            'Poverty Rate: ' +
            props.Poverty_Rate.toFixed(2) +
            '%' +
            '</b><br />' +
            'Homicide Rate: ' +
            props.Homicide_Rate.toFixed(2) +
            '%' +
            '</b><br />'
            : 'Hover over a state')
}

info.addTo(map)

function highlightFeature(e) {
    var layer = e.target

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    })

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront()
    }
    info.update(layer.feature.properties)
}

function resetHighlight(e) {
    geojson.resetStyle(e.target)
    info.update()
}

// Step5: Custom Legend Control

var legend = L.control({ position: 'bottomright' })

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' +
            getColor(grades[i] + 0.1) +
            '"></i> ' +
            grades[i] +
            (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+')
    }

    return div
}

legend.addTo(map)
