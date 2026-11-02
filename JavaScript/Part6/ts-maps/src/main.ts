navigator.geolocation.getCurrentPosition(function(pos) {
  const p = document.getElementById("coordenadas")!;
  p.textContent = `Latitud: ${pos.coords.latitude}. Longitud: ${pos.coords.longitude} 
  (Precisión: ${pos.coords.accuracy})`;
});