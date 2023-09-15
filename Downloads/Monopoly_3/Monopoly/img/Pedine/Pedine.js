function turnoGiocatori() {

    if (contaturno >= numerogiocatori) {
        contaturno = 0;
    }
    turnoGiocatore = turno[contaturno][0];
    contaturno++;
    return turnoGiocatore;
}

function spostaPedina(risultatoDadi, dado1, dado2) {
    tGiocatore = turnoGiocatori();
    visulizzaIpoteca(tGiocatore);
    giocatore3 = giocatori[tGiocatore];
    posizionevecchiaX = giocatore3.posizioneX;
    posizionevecchiaY = giocatore3.posizioneY;
    var infoBox = '<div class="risultatoDado">Il giocatore' + tGiocatore + ': ha ottenuto il risultato: ' + risultatoDadi + ' (' + dado1 + ' - ' + dado2 + ')</div>';
    document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
    if (giocatore3.posizione + risultatoDadi > 39) {
        do {
            giocatore3.posizione++;
            risultatoDadi--;
        } while (giocatore3.posizione <= 39);
        giocatore3.posizione = 0 + risultatoDadi;
        giocatore3.portafogli += 500;
        var infoBox = '<div class="risultatoDado">Il giocatore' + tGiocatore + ': ha ottenuto € 500 per essere transinato dal VIA!</div>';
        document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
    } else
        giocatore3.posizione = giocatore3.posizione + risultatoDadi;
    schede.forEach(schede => {
        if (schede.posizione == giocatore3.posizione) {
            giocatore3.posizioneX = schede.x + 20;
            giocatore3.posizioneY = schede.y + 20;

        }
    });

    
    giocatore3.context.clearRect(posizionevecchiaX, posizionevecchiaY, 15, 15);
    giocatore3.context.fillStyle = giocatore3.colore;
    giocatore3.context.fillRect(giocatore3.posizioneX, giocatore3.posizioneY, 15, 15);
    if (schede[giocatore3.posizione].tipo == "Proprietà" || schede[giocatore3.posizione].tipo == "Stazione" || schede[giocatore3.posizione].tipo == "Società") {
        apripopup(giocatore3.posizione, tGiocatore);
    }
    if (schede[giocatore3.posizione].tipo == "Imprevisti") {
        apriImprevisti(tGiocatore, schede);
    }
    if (schede[giocatore3.posizione].tipo == "Probabilità") {
        apriProbabilità(tGiocatore, schede);
    }
}


function creaPedine() {
    for (var i = 0; i < numerogiocatori; i++) {
        var giocatore2 = giocatori[i];
        var canvas2 = giocatore2.canvas;
        var context2 = giocatore2.context;
        context2.fillStyle = giocatore2.colore;
        context2.fillRect(giocatore2.posizioneX, giocatore2.posizioneX, 15, 15);

        /*var image2 = new Image();
        image2.src = '/img/Pedine/Macchina.png';
        image2.onload = function () {
            context2.imageSmoothingEnabled = true;
            context2.imageSmoothingQuality = 'high';
            context2.drawImage(image2, giocatore2.posizioneX, giocatore2.posizioneX, 40, 35);
        }*/
    }
}









var index = 0;
  var prova;
  function movimento() {
    giocatore3.posizioneX = schede[posizionevecchia].x + 20;
    giocatore3.posizioneY = schede[posizionevecchia].y + 20;
    giocatore3.context.clearRect(0, 0, 850, 850);
    giocatore3.context.fillStyle = giocatore3.colore;
    giocatore3.context.fillRect(giocatore3.posizioneX, giocatore3.posizioneY, 15, 15);
    posizionevecchia++;
    index++;
    if (index >= risultatoTiro) {
      clearInterval(prova);
      if (schede[giocatore3.posizione].tipo == "Proprietà" || schede[giocatore3.posizione].tipo == "Stazione" || schede[giocatore3.posizione].tipo == "Società") {
        apripopup(giocatore3.posizione, tGiocatore);
      }
      if (schede[giocatore3.posizione].tipo == "Imprevisti") {
        apriImprevisti(tGiocatore, schede);
      }
      if (schede[giocatore3.posizione].tipo == "Probabilità") {
        apriProbabilità(tGiocatore, schede);
      }
    }
  }
  prova =setInterval(movimento,300);