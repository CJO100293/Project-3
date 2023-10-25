// Store our API endpoint as constant.
const URL_ENDPOINTS = '/api/endpoints';

// Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

// Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

// Creating layergroups for each datapoint
  let CAEthanol = new L.LayerGroup()
  let NYEthanol = new L.LayerGroup()
  let TXEthanol = new L.LayerGroup()
  let CAElectric = new L.LayerGroup()
  let NYElectric = new L.LayerGroup()
  let TXElectric = new L.LayerGroup()
  let CAPropane = new L.LayerGroup()
  let NYPropane = new L.LayerGroup()
  let TXPropane = new L.LayerGroup()
  let Top3AltFuels = new L.LayerGroup()
  let Top3AltFuelsCA = new L.LayerGroup()
  let Top3AltFuelsNY = new L.LayerGroup()
  let Top3AltFuelsTX = new L.LayerGroup()

// Create our map, giving it the streetmap layers to display on load.
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street]
  });

// Creating map overlays
  let overlays = {'Ethanol California':CAEthanol, 'Ethanol New York':NYEthanol, 'Ethanol Texas':TXEthanol,
                  'Electric California':CAElectric, 'Electric New York':NYElectric, 'Electric Texas':TXElectric,
                  'Propane California':CAPropane, 'Propane New York':NYPropane, 'Propane Texas':TXPropane,
                  'Top 3 Alternative Fuels': Top3AltFuels, 'California Top 3 Alternative Fuels':Top3AltFuelsCA,
                  'New York Top 3 Alternative Fuels': Top3AltFuelsNY, 'Texas Top 3 Alternative Fuels':Top3AltFuelsTX}

// Adding baseMaps objects and overlays to the map
  L.control.layers(baseMaps, overlays, {collapsed: false}).addTo(myMap);

// Adding checkbox option to show California Ethanol Data layer
  d3.json('http://127.0.0.1:5000/api/ETL_E85_CA').then(function(data) {
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      function onEachFeature(data, layer) {
      // Creating popup on markers
      {
        layer.bindPopup(`${data.properties.Fuel_Type}<br>${data.geometry.coordinates}</br>`);
      }
    }
      var geojsonFeature = {
        "type": "Feature",
        "properties": {
            "Location": data[i].State,
            "Fuel_Type": data[i]["Fuel Type"],
        },
        "geometry": {
            "type": "Point",
            "coordinates": [data[i]["Longitude"], data[i]["Latitude"]]
        }
    };
    L.geoJSON(geojsonFeature, {onEachFeature: onEachFeature}).addTo(CAEthanol);
    }
  });

// Adding checkbox option to show New York Ethanol Data layer
d3.json('http://127.0.0.1:5000/api/ETL_E85_NY').then(function(data) {
  console.log(data)
  for (let i = 0; i < data.length; i++) {
    function onEachFeature(data, layer) {
    // Creating popup on markers
    {
      layer.bindPopup(`${data.properties.Fuel_Type}<br>${data.geometry.coordinates}</br>`);
    }
  }
    var geojsonFeature = {
      "type": "Feature",
      "properties": {
          "Location": data[i].State,
          "Fuel_Type": data[i]["Fuel Type"],
      },
      "geometry": {
          "type": "Point",
          "coordinates": [data[i]["Longitude"], data[i]["Latitude"]]
      }
  };
  L.geoJSON(geojsonFeature, {onEachFeature: onEachFeature}).addTo(NYEthanol);
  }
});

// Adding checkbox option to show Texas Ethanol Data layer
d3.json('http://127.0.0.1:5000/api/ETL_E85_TX').then(function(data) {
  console.log(data)
  for (let i = 0; i < data.length; i++) {
    function onEachFeature(data, layer) {
    // Creating popup on markers
    {
      layer.bindPopup(`${data.properties.Fuel_Type}<br>${data.geometry.coordinates}</br>`);
    }
  }
    var geojsonFeature = {
      "type": "Feature",
      "properties": {
          "Location": data[i].State,
          "Fuel_Type": data[i]["Fuel Type"],
      },
      "geometry": {
          "type": "Point",
          "coordinates": [data[i]["Longitude"], data[i]["Latitude"]]
      }
  };
  L.geoJSON(geojsonFeature, {onEachFeature: onEachFeature}).addTo(TXEthanol);
  }
});

// Adding checkbox option to show California Electric Data layer
d3.json('http://127.0.0.1:5000/api/ETL_ELEC_CA').then(function(data) {
  console.log(data)
  for (let i = 0; i < data.length; i++) {
    function onEachFeature(data, layer) {
    // Creating popup on markers
    {
      layer.bindPopup(`${data.properties.Fuel_Type}<br>${data.geometry.coordinates}</br>`);
    }
  }
    var geojsonFeature = {
      "type": "Feature",
      "properties": {
          "Location": data[i].State,
          "Fuel_Type": data[i]["Fuel Type"],
      },
      "geometry": {
          "type": "Point",
          "coordinates": [data[i]["Longitude"], data[i]["Latitude"]]
      }
  };
  L.geoJSON(geojsonFeature, {onEachFeature: onEachFeature}).addTo(CAElectric);
  }
});

// Adding checkbox option to show New York Electric Data layer
d3.json('http://127.0.0.1:5000/api/ETL_ELEC_NY').then(function(data) {
  console.log(data)
  for (let i = 0; i < data.length; i++) {
    function onEachFeature(data, layer) {
    // Creating popup on markers
    {
      layer.bindPopup(`${data.properties.Fuel_Type}<br>${data.geometry.coordinates}</br>`);
    }
  }
    var geojsonFeature = {
      "type": "Feature",
      "properties": {
          "Location": data[i].State,
          "Fuel_Type": data[i]["Fuel Type"],
      },
      "geometry": {
          "type": "Point",
          "coordinates": [data[i]["Longitude"], data[i]["Latitude"]]
      }
  };
  L.geoJSON(geojsonFeature, {onEachFeature: onEachFeature}).addTo(NYElectric);
  }
});

// Adding checkbox option to show Texas Electric Data layer
d3.json('http://127.0.0.1:5000/api/ETL_ELEC_TX').then(function(data) {
  console.log(data)
  for (let i = 0; i < data.length; i++) {
    function onEachFeature(data, layer) {
    // Creating popup on markers
    {
      layer.bindPopup(`${data.properties.Fuel_Type}<br>${data.geometry.coordinates}</br>`);
    }
  }
    var geojsonFeature = {
      "type": "Feature",
      "properties": {
          "Location": data[i].State,
          "Fuel_Type": data[i]["Fuel Type"],
      },
      "geometry": {
          "type": "Point",
          "coordinates": [data[i]["Longitude"], data[i]["Latitude"]]
      }
  };
  L.geoJSON(geojsonFeature, {onEachFeature: onEachFeature}).addTo(TXElectric);
  }
});

// Adding checkbox option to show California Propane Data layer
d3.json('http://127.0.0.1:5000/api/ETL_LPG_CA').then(function(data) {
  console.log(data)
  for (let i = 0; i < data.length; i++) {
    function onEachFeature(data, layer) {
    // Creating popup on markers
    {
      layer.bindPopup(`${data.properties.Fuel_Type}<br>${data.geometry.coordinates}</br>`);
    }
  }
    var geojsonFeature = {
      "type": "Feature",
      "properties": {
          "Location": data[i].State,
          "Fuel_Type": data[i]["Fuel Type"],
      },
      "geometry": {
          "type": "Point",
          "coordinates": [data[i]["Longitude"], data[i]["Latitude"]]
      }
  };
  L.geoJSON(geojsonFeature, {onEachFeature: onEachFeature}).addTo(CAPropane);
  }
});

// Adding checkbox option to show New York Propane Data layer
d3.json('http://127.0.0.1:5000/api/ETL_LPG_NY').then(function(data) {
  console.log(data)
  for (let i = 0; i < data.length; i++) {
    function onEachFeature(data, layer) {
    // Creating popup on markers
    {
      layer.bindPopup(`${data.properties.Fuel_Type}<br>${data.geometry.coordinates}</br>`);
    }
  }
    var geojsonFeature = {
      "type": "Feature",
      "properties": {
          "Location": data[i].State,
          "Fuel_Type": data[i]["Fuel Type"],
      },
      "geometry": {
          "type": "Point",
          "coordinates": [data[i]["Longitude"], data[i]["Latitude"]]
      }
  };
  L.geoJSON(geojsonFeature, {onEachFeature: onEachFeature}).addTo(NYPropane);
  }
});

// Adding checkbox option to show Texas Propane Data layer
d3.json('http://127.0.0.1:5000/api/ETL_LPG_TX').then(function(data) {
  console.log(data)
  for (let i = 0; i < data.length; i++) {
    function onEachFeature(data, layer) {
    // Creating popup on markers
    {
      layer.bindPopup(`${data.properties.Fuel_Type}<br>${data.geometry.coordinates}</br>`);
    }
  }
    var geojsonFeature = {
      "type": "Feature",
      "properties": {
          "Location": data[i].State,
          "Fuel_Type": data[i]["Fuel Type"],
      },
      "geometry": {
          "type": "Point",
          "coordinates": [data[i]["Longitude"], data[i]["Latitude"]]
      }
  };
  L.geoJSON(geojsonFeature, {onEachFeature: onEachFeature}).addTo(TXPropane);
  }
});

// Adding checkbox option to show Top 3 Alt Fuels Data layer
d3.json('http://127.0.0.1:5000/api/ETL_top3_alt_fuels').then(function(data) {
  console.log(data)
  for (let i = 0; i < data.length; i++) {
    function onEachFeature(data, layer) {
    // Creating popup on markers
    {
      layer.bindPopup(`${data.properties.Fuel_Type}<br>${data.geometry.coordinates}</br>`);
    }
  }
    var geojsonFeature = {
      "type": "Feature",
      "properties": {
          "Location": data[i].State,
          "Fuel_Type": data[i]["Fuel Type"],
      },
      "geometry": {
          "type": "Point",
          "coordinates": [data[i]["Longitude"], data[i]["Latitude"]]
      }
  };
  L.geoJSON(geojsonFeature, {onEachFeature: onEachFeature}).addTo(Top3AltFuels);
  }
});

// Adding checkbox option to show California Top 3 Alt Fuels Data layer
d3.json('http://127.0.0.1:5000/api/ETL_top3_alt_fuels_CA').then(function(data) {
  console.log(data)
  for (let i = 0; i < data.length; i++) {
    function onEachFeature(data, layer) {
    // Creating popup on markers
    {
      layer.bindPopup(`${data.properties.Fuel_Type}<br>${data.geometry.coordinates}</br>`);
    }
  }
    var geojsonFeature = {
      "type": "Feature",
      "properties": {
          "Location": data[i].State,
          "Fuel_Type": data[i]["Fuel Type"],
      },
      "geometry": {
          "type": "Point",
          "coordinates": [data[i]["Longitude"], data[i]["Latitude"]]
      }
  };
  L.geoJSON(geojsonFeature, {onEachFeature: onEachFeature}).addTo(Top3AltFuelsCA);
  }
});

// Adding checkbox option to show New York Top 3 Alt Fuels Data layer
d3.json('http://127.0.0.1:5000/api/ETL_top3_alt_fuels_NY').then(function(data) {
  console.log(data)
  for (let i = 0; i < data.length; i++) {
    function onEachFeature(data, layer) {
    // Creating popup on markers
    {
      layer.bindPopup(`${data.properties.Fuel_Type}<br>${data.geometry.coordinates}</br>`);
    }
  }
    var geojsonFeature = {
      "type": "Feature",
      "properties": {
          "Location": data[i].State,
          "Fuel_Type": data[i]["Fuel Type"],
      },
      "geometry": {
          "type": "Point",
          "coordinates": [data[i]["Longitude"], data[i]["Latitude"]]
      }
  };
  L.geoJSON(geojsonFeature, {onEachFeature: onEachFeature}).addTo(Top3AltFuelsNY);
  }
});

// Adding checkbox option to show Texas Top 3 Alt Fuels Data layer
d3.json('http://127.0.0.1:5000/api/ETL_top3_alt_fuels_TX').then(function(data) {
  console.log(data)
  for (let i = 0; i < data.length; i++) {
    function onEachFeature(data, layer) {
    // Creating popup on markers
    {
      layer.bindPopup(`${data.properties.Fuel_Type}<br>${data.geometry.coordinates}</br>`);
    }
  }
    var geojsonFeature = {
      "type": "Feature",
      "properties": {
          "Location": data[i].State,
          "Fuel_Type": data[i]["Fuel Type"],
      },
      "geometry": {
          "type": "Point",
          "coordinates": [data[i]["Longitude"], data[i]["Latitude"]]
      }
  };
  L.geoJSON(geojsonFeature, {onEachFeature: onEachFeature}).addTo(Top3AltFuelsTX);
  }
});