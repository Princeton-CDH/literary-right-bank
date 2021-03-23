const handlePopup = element => {
  let popup = "<h2>";
  if(element.url !== "") {
    popup = popup + `<a href="${element.url}" rel="noreferrer noopener" target="_blank">${element.name}</a>`;
  } else {
    popup = popup + element.name;
  }

  return `${popup}</h2><p>${element.address}</p>`;
};

const addMap = async () => {
  // load data relative to current location, so it will work for local dev or embed
  data = await d3.csv(window.location.origin + window.location.pathname + "data.csv");

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

  const essaySubjects = L.layerGroup(data
    .filter(e => e.group !== "others")
    .map(element =>
      L.circleMarker([element.latitude, element.longitude], {
        radius: 10,
        fillColor: "#7570b3",
        tier: element.rank,
        color: "#fff",
        weight: 3,
        opacity: 1,
        fillOpacity: 0.9 })
        .bindPopup(handlePopup(element))
        .bindTooltip(L.tooltip({
          opacity: 0.7,
          permanent: true,
          interactive: true })
          .setContent(element.tooltipName)
        )
    )
  );

  const otherPatrons = L.layerGroup(data
    .filter(e => e.group === "others")
    .map(element =>
      L.circleMarker([element.latitude, element.longitude], {
        radius: 5,
        fillColor: "#e6ab02",
        tier: element.rank,
        color: "#666",
        weight: 1.5,
        opacity: 1,
        fillOpacity: 0.9 })
        .bindPopup(handlePopup(element))
      )
  );

  otherPatrons.addTo(map);
  essaySubjects.addTo(map);

  const layers = [essaySubjects];

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
