const markerOptions = ({fillColor, tier}) => ({
  radius: 6,
  fillColor,
  tier,
  color: "#333",
  stroke: 2,
  weight: 1,
  opacity: 1,
  fillOpacity: 0.9 });

const toolTip = name => L.tooltip({ opacity: 0.7, interactive: true }).setContent(name);

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

const additions = L.layerGroup(data.filter(e => e.type === "addition").map(element =>
  L.circleMarker([element.latitude, element.longitude], markerOptions({fillColor: "#c842f5", tier: element.rank})).bindPopup(`
    <h2>${element.name}</h2>
    <p>${element.addresses}</p>
    `).bindTooltip(toolTip(element.tooltipName))
));
additions.addTo(map);

console.log(additions);

const regulars = L.layerGroup(data.filter(e => e.type === "regular").map(element =>
  L.circleMarker([element.latitude, element.longitude], markerOptions({ fillColor: "#eee", tier: element.rank} )).bindPopup(`
    <h2>${element.name}</h2>
    <p>${element.addresses}</p>
    `).bindTooltip(toolTip(element.tooltipName))
));
regulars.addTo(map);

const layers = [additions, regulars];

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
