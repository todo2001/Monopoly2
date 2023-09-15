function turnoGiocatori() {
  contaturno++;
  if (contaturno >= numerogiocatori) {
    contaturno = 0;
  }
  turnoGiocatore = turno[contaturno][0];
  
  return turnoGiocatore;
}


var currentFrame = 0;
var totalFrames = 60; // Durata totale dell'animazione (numero di frame)
var animationSpeed = 5; // Velocità di animazione (numero di posizioni per frame)
function spostaPedina(turnoGiocatore,risultatoDadi, dado1, dado2, schede) {

  gruppo();
  visulizzaIpoteca(turnoGiocatore);
  visualizzaCase(turnoGiocatore);
  var risultatoTiro = risultatoDadi;
  var infoBox = '<div class="risultatoDado">Il giocatore' + turnoGiocatore + ': ha ottenuto il risultato: ' + risultatoDadi + ' (' + dado1 + ' - ' + dado2 + ')</div>';
  document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
  giocatore3 = giocatori[turnoGiocatore];
  posizionevecchiaX = giocatore3.posizioneX;
  posizionevecchiaY = giocatore3.posizioneY;
  posizionevecchia = giocatore3.posizione;

  if (giocatori[turnoGiocatore].posizione + risultatoDadi > 39) {
    do {
      giocatori[turnoGiocatore].posizione++;
      risultatoDadi--;
    } while (giocatore3.posizione <= 39);
    giocatori[turnoGiocatore].posizione = 0 + risultatoDadi;
    giocatori[turnoGiocatore].portafogli += 500;
    var infoBox = '<div class="risultatoDado">Il giocatore' + turnoGiocatore + ': ha ottenuto € 500 per essere transinato dal VIA!</div>';
    document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
  } else
    giocatori[turnoGiocatore].posizione = giocatori[turnoGiocatore].posizione + risultatoDadi;
  movimento()

  /*schede.forEach(schede => {
    if (schede.posizione == giocatore3.posizione) {
        giocatore3.posizioneX = schede.x + 20;
        giocatore3.posizioneY = schede.y + 20;
    }
});*/

  var duration = 200; // Durata totale dell'animazione in millisecondi
  var frameRate = 60; // Frame rate dell'animazione (frame al secondo)
  var frameDuration = 1000 / frameRate; // Durata di ogni frame in millisecondi
  var startX, startY;
  var targetX, targetY;
  var currentX, currentY;
  var startTime;
  var prova = 0;
  var index = 0;
  var posizionevecchia2 = 0;
  function movimento() {
    
    if (posizionevecchia == 40) {
      posizionevecchia = 0;
    }
    posizionevecchia2 = posizionevecchia + 1;
    if (posizionevecchia2 == 40) {
      posizionevecchia2 = 0;
    }
    if (!startTime) {
      startTime = Date.now();
      startX = schede[posizionevecchia].x + 20;
      startY = schede[posizionevecchia].y + 20;
      targetX = schede[posizionevecchia2].x + 20;
      targetY = schede[posizionevecchia2].y + 20;
    }


    var elapsed = Date.now() - startTime;
    var progress = Math.min(elapsed / duration, 1); // Progresso dell'animazione da 0 a 1
    currentX = interpolate(startX, targetX, progress);
    currentY = interpolate(startY, targetY, progress);

    giocatore3.context.clearRect(0, 0, 850, 850);
    giocatore3.context.fillStyle = giocatore3.colore;
    giocatore3.context.fillRect(currentX, currentY, 15, 15);

    if (progress >= 1) {
      clearInterval(prova);
      posizionevecchia++;
      index++
      if (index < risultatoTiro) {

        startTime = null;
        prova = setInterval(movimento, frameDuration);
      } else {


      function haGruppiCompleti(giocatoreID){
        const contagruppi = {};
          for(let i = 0; i <giocatori[giocatoreID].territori.length; i++){
            const elemento = giocatori[giocatoreID].territori[i];
            if(contagruppi[elemento.gruppo]){
              contagruppi[elemento.gruppo]++;
            }else{
              contagruppi[elemento.gruppo] = 1;
            }
          }
         return contagruppi;
      }
      const haGruppi = haGruppiCompleti(turnoGiocatore);
      console.log(haGruppi);
      



        giocatore3.posizioneX = schede[giocatore3.posizione].x;
        giocatore3.posizioneY = schede[giocatore3.posizione].y;
        var passaturnoBottone = document.getElementById("PassaTurno");
        passaturnoBottone.style.display = "block";
        // Codice per gestire il raggiungimento dell'ultima posizione e altre logiche di gioco
        if (schede[giocatore3.posizione].tipo == "Proprietà" || schede[giocatore3.posizione].tipo == "Stazione" || schede[giocatore3.posizione].tipo == "Società") {
          apripopup(giocatore3.posizione, turnoGiocatore);
        }
        if (schede[giocatore3.posizione].tipo == "Imprevisti") {
          apriImprevisti(turnoGiocatore, schede);
        }
        if (schede[giocatore3.posizione].tipo == "Probabilità") {
          apriProbabilità(turnoGiocatore, schede);
        }
        if (schede[giocatore3.posizione].tipo == "Tassa1") {
          giocatore3.portafogli -= 500;
          var infoBox = '<div class="risultatoDado">Il giocatore' + turnoGiocatore + ': ha pagato: € 500</div>';
          document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
        }
        if (schede[giocatore3.posizione].tipo == "Tassa2") {
          giocatore3.portafogli -= 250;
          var infoBox = '<div class="risultatoDado">Il giocatore' + turnoGiocatore + ': ha pagato: € 250</div>';
          document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
        }
        if (schede[giocatore3.posizione].tipo == "Prigione") {
          spostamentoPrigione(turnoGiocatore);
        }
      }
    }
    
  }

  // Funzione di interpolazione per ottenere il valore intermedio tra due posizioni
  function interpolate(start, end, progress) {
    return start + (end - start) * progress;
  };

  // Avvia l'animazione
  prova = setInterval(movimento, duration);
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

function spostamentoPrigione(turnoGiocatore){
  var infoBox = '<div class="risultatoDado">Il giocatore' + turnoGiocatore + ': va in prigione</div>';
  document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
  giocatori[turnoGiocatore].prigione = true;
  giocatore3 = giocatori[turnoGiocatore];
  var maggiore = false;
        posizionevecchiaX = giocatore3.posizioneX;
        posizionevecchiaY = giocatore3.posizioneY;
        posizionevecchia = giocatore3.posizione;
        if(giocatore3.posizione > 10){
          risultatoTiro = posizionevecchia - 10
          maggiore = true;
        }else{
          risultatoTiro = 10 - posizionevecchia;

        }
        giocatori[turnoGiocatore].posizione = 10;
    
        var duration = 200; // Durata totale dell'animazione in millisecondi
        var frameRate = 500; // Frame rate dell'animazione (frame al secondo)
        var frameDuration = 1000 / frameRate; // Durata di ogni frame in millisecondi
        var startX, startY;
        var targetX, targetY;
        var currentX, currentY;
        var startTime;
        var prova = 0;
        var index = 0;
        
        var posizionevecchia2 = 0;
        function movimento() {
    
            if (posizionevecchia == 40) {
                posizionevecchia = 0;
            }
            if(maggiore ==true){
            posizionevecchia2 = posizionevecchia - 1;}
            else{
              posizionevecchia2 = posizionevecchia + 1;
            }
            if (posizionevecchia2 == 40) {
                posizionevecchia2 = 0;
            }
            if (!startTime) {
                startTime = Date.now();
                startX = schede[posizionevecchia].x + 40;
                startY = schede[posizionevecchia].y + 40;
                targetX = schede[posizionevecchia2].x + 40;
                targetY = schede[posizionevecchia2].y + 40;
            }
    
    
            var elapsed = Date.now() - startTime;
            var progress = Math.min(elapsed / duration, 1); // Progresso dell'animazione da 0 a 1
            currentX = interpolate(startX, targetX, progress);
            currentY = interpolate(startY, targetY, progress);
    
            giocatore3.context.clearRect(0, 0, 850, 850);
            giocatore3.context.fillStyle = giocatore3.colore;
            giocatore3.context.fillRect(currentX, currentY, 15, 15);
    
    
            if (progress >= 1) {
                clearInterval(prova);
                if(maggiore == true){
                posizionevecchia--;}else{
                  posizionevecchia++;
                }
                index++
                if (index < risultatoTiro) {
    
                    startTime = null;
                    prova = setInterval(movimento, frameDuration);
                } else {
                    giocatore3.posizioneX = schede[giocatore3.posizione].x;
                    giocatore3.posizioneY = schede[giocatore3.posizione].y;
    
                    // Codice per gestire il raggiungimento dell'ultima posizione e altre logiche di gioco
                    if (schede[giocatore3.posizione].tipo == "Proprietà" || schede[giocatore3.posizione].tipo == "Stazione" || schede[giocatore3.posizione].tipo == "Società") {
                        apripopup(giocatore3.posizione, turnoGiocatore);
                    }
                    if (schede[giocatore3.posizione].tipo == "Imprevisti") {
                        apriImprevisti(turnoGiocatore, schede);
                    }
                    if (schede[giocatore3.posizione].tipo == "Probabilità") {
                        apriProbabilità(turnoGiocatore, schede);
                    }
                }
            }
        }
    
        // Funzione di interpolazione per ottenere il valore intermedio tra due posizioni
        function interpolate(start, end, progress) {
            return start + (end - start) * progress;
        };
    
        // Avvia l'animazione
        prova = setInterval(movimento, duration);
}

