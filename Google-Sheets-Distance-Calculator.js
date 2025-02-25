// Este proyecto se basa en el artículo "[Convertir direcciones a coordenadas de latitud y longitud con Google Sheets y Google Maps (Geocoding)](https://tesel.mx/convertir-direcciones-a-coordenadas-de-latitud-y-longitud-con-google-sheets-y-google-maps-geocoding-7928/)", que proporciona una guía detallada sobre cómo convertir direcciones en coordenadas utilizando Google Sheets y Google Maps.

function calcularDistancia() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var dataRangeAll = sheet.getDataRange();
  var ultimaFila = dataRangeAll.getLastRow();

  // Recorremos todas las filas a partir de la 2da
  for (var i = 2; i <= ultimaFila; i++) {
    var latitud = sheet.getRange(i, 27).getValue(); // Columna AA (índice 27)
    var longitud = sheet.getRange(i, 28).getValue(); // Columna AB (índice 28)

    // Verificar si las coordenadas no están vacías
    if (!latitud || !longitud || isNaN(latitud) || isNaN(longitud)) {
      sheet.getRange(i, 29).setValue(""); // Columna AC (índice 29)
      continue;
    }

    // Calcular la distancia horizontal (en metros)
    var distancia = calcularDistanciaHaversine(latitud, longitud);

    // Escribir la distancia en la columna AC
    sheet.getRange(i, 29).setValue(distancia);
  }
}

function calcularDistanciaHaversine(lat1, lon1) {
  // Coordenadas de referencia (puedes ajustarlas según tus necesidades)
  var lat2 = 0; // Latitud de referencia
  var lon2 = 0; // Longitud de referencia

  var R = 6371e3; // Radio de la Tierra en metros
  var φ1 = lat1 * Math.PI / 180; // φ, λ en radianes
  var φ2 = lat2 * Math.PI / 180;
  var Δφ = (lat2 - lat1) * Math.PI / 180;
  var Δλ = (lon2 - lon1) * Math.PI / 180;

  var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var distancia = R * c; // En metros
  return distancia;
}
