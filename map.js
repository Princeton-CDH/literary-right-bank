const colors = [
  "#1b9e77",
  "#d95f02",
  "#7570b3",
  "#e7298a",
  "#66a61e",
  "#e6ab02",
  "#a6761d",
  "#666666",
];

const addMap = async () => {
  data = await d3.csv("./data.csv");
  layerValues = "america aristocrats jewish-16 nomads rich-people valery when-sylvia-met-james".split(" ");

  const map = L.map('map', {
    zoom: 16,
    minZoom: 13,
    maxZoom: 18,
    center: [48.8616, 2.2893],
    maxBounds: L.latLngBounds(
      L.latLng(48.80993843039284,2.42069331467708),
      L.latLng(48.90647632023956, 2.24692255999388)
    )
  });

  const parisTiles = new L.esri.TiledMapLayer({
      url: 'https://tiles.arcgis.com/tiles/4Ko8f1mCWFLyY4NV/arcgis/rest/services/Paris_1943/MapServer',
      attribution: '<a href="https://maps.princeton.edu/catalog/princeton-2r36tz994">Princeton University Library</a>',
  });
  parisTiles.addTo(map);

  const layers = layerValues.map( (group, i) =>
    L.layerGroup(data
      .filter(e => e.group === group)
      .map(element =>
        L.circleMarker([element.latitude, element.longitude], {
          radius: 8,
          fillColor: colors[i],
          tier: element.rank,
          color: "#fff",
          weight: 3,
          opacity: 1,
          fillOpacity: 0.9 })
          .bindPopup(`
            <h2><a href="${element.url}">${element.name}</a></h2>
            <p>${element.address}</p>
          `)
          .bindTooltip(L.tooltip({ 
            opacity: 0.7, 
            permanent: true, 
            interactive: true })
            .setContent(element.tooltipName)
          )
      )
    )
  );

  layers.push(L.layerGroup(data
    .filter(e => e.group === "others")
    .map(element =>
      L.circleMarker([element.latitude, element.longitude], {
        radius: 5,
        fillColor: colors[7],
        tier: element.rank,
        color: "#fff",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.9 })
        .bindPopup(`
          <h2><a href="${element.url}">${element.name}</a></h2>
          <p>${element.address}</p>
        `)
      )
    )
  );

  const layerControl = {
    "U.S. Institutions": layers[0],
    "Aristocrats": layers[1],
    "The Jewish 16th": layers[2],
    "“Nomads”": layers[3],
    "Rich People": layers[4],
    "Valéry": layers[5],
    "“When Sylvia Met James”": layers[6],
    "Other Patrons": layers[7]
  }

  for (const layer of layers.reverse()) {
    layer.addTo(map);
  }


  L.control.layers(null, layerControl).addTo(map);

  const handleTooltips = () => {
    layers.forEach( layer => {
      const features = Object.keys(layer._layers);
      features.forEach(feature => {
        if(map.getZoom() - layer._layers[feature].options.tier >= 13){
          layer._layers[feature].openTooltip();
        } else {
          layer._layers[feature].closeTooltip();
        }
      });
    });
  };

  map.on('zoomend', handleTooltips);
  map.setZoom(15);
}

addMap();
