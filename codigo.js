if ("vibrate" in navigator) {
    // Solicita una vibración de 1000 milisegundos (1 segundo).
    navigator.vibrate(1000);
  } else {
    console.log("La API de Vibración no está disponible en este navegador.");
  }