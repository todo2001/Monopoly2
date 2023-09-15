var numerogiocatore;
function acquistaterreno(posizione, numerogiocatore, schede, giocatore) {
  schede[posizione].proprietario = numerogiocatore;
  giocatore.portafogli = giocatore.portafogli - schede[posizione].costo;
  
  var infoBox = '<div class="risultatoDado">Il giocatore' + turnoGiocatore + ': ha acquistato il terreno: ' + schede[posizione].nome + '</div>';
  document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
  if (schede[posizione].asse == "1") {
    ctx.fillStyle = giocatori[numerogiocatore].colore;
    ctx.fillRect(schede[posizione].x, schede[posizione].y - 2, 70, 5);
  }
  if (schede[posizione].asse == "2") {
    ctx.fillStyle = giocatori[numerogiocatore].colore;
    ctx.fillRect(schede[posizione].x + 98, schede[posizione].y, 5, 70);
  }
  if (schede[posizione].asse == "3") {
    ctx.fillStyle = giocatori[numerogiocatore].colore;
    ctx.fillRect(schede[posizione].x, schede[posizione].y + 98, 70, 5);
  }
  if (schede[posizione].asse == "4") {
    ctx.fillStyle = giocatori[numerogiocatore].colore;
    ctx.fillRect(schede[posizione].x, schede[posizione].y, 5, 70);
  }
  giocatore.territori.push({ numero: schede[posizione].posizione, StatoIpoteca: false,x:schede[posizione].x, y:schede[posizione].y, gruppo: schede[posizione].gruppo, numeroEdifici:0});
  info();
  visulizzaIpoteca(numerogiocatore);
  return schede;
};