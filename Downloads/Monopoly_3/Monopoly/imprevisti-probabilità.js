function ritirare(numeroImprevisto, tGiocatore) {
    giocatori[tGiocatore].portafogli += imprevisti[numeroImprevisto].caratteristica;
    var infoBox = '<div class="risultatoDado">Il giocatore' + tGiocatore + ': ha ritirato: € ' + imprevisti[numeroImprevisto].caratteristica + '</div>';
    document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
}

function pagare(numeroImprevisto, tGiocatore) {
    giocatori[tGiocatore].portafogli -= imprevisti[numeroImprevisto].caratteristica;
    var infoBox = '<div class="risultatoDado">Il giocatore' + tGiocatore + ': ha pagato: € ' + imprevisti[numeroImprevisto].caratteristica + '</div>';
    document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
}


function spostare(numeroImprevisto, tGiocatore, schede) {
    giocatore3 = giocatori[tGiocatore];
    posizionevecchiaX = giocatore3.posizioneX;
    posizionevecchiaY = giocatore3.posizioneY;
    posizionevecchia = giocatore3.posizione;


    if (numeroImprevisto == 2) {
        giocatore3.posizione = 0;
    } else {
        giocatori[turnoGiocatore].posizione = imprevisti[numeroImprevisto].caratteristica;
    }
    if(imprevisti[numeroImprevisto].caratteristica> posizionevecchia){
    risultatoTiro = imprevisti[numeroImprevisto].caratteristica - posizionevecchia;}
    else {
        risultatoTiro = (40 - posizionevecchia) + imprevisti[numeroImprevisto].caratteristica;
        giocatori[turnoGiocatore].portafogli += 500;
        var infoBox = '<div class="risultatoDado">Il giocatore' + turnoGiocatore + ': ha ottenuto € 500 per essere transinato dal VIA!</div>';
        document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
    }

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
                giocatore3.posizioneX = schede[giocatore3.posizione].x;
                giocatore3.posizioneY = schede[giocatore3.posizione].y;
                if(numeroImprevisto == 2){
                var infoBox = '<div class="risultatoDado">Il giocatore' + turnoGiocatore + ': ha ottenuto € 500 per essere transinato dal VIA!</div>';
                document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
                giocatore3.portafogli += 500;}
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

function spostare3(tGiocatore, schede) {
    giocatore3 = giocatori[tGiocatore];
    posizionevecchiaX = giocatore3.posizioneX;
    posizionevecchiaY = giocatore3.posizioneY;
    posizionevecchia = giocatore3.posizione;
    giocatori[turnoGiocatore].posizione = giocatore3.posizione - 3;
    risultatoTiro = 3;

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
        posizionevecchia2 = posizionevecchia - 1;
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
            posizionevecchia--;
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


function ritirareProbabilità(numeroCarta, tGiocatore) {
    giocatori[tGiocatore].portafogli += probabilità[numeroCarta].caratteristica;
    var infoBox = '<div class="risultatoDado">Il giocatore' + tGiocatore + ': ha ritirato: € ' + probabilità[numeroCarta].caratteristica + '</div>';
    document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
}

function pagareProbabilità(numeroCarta, tGiocatore) {
    giocatori[tGiocatore].portafogli -= probabilità[numeroCarta].caratteristica;
    var infoBox = '<div class="risultatoDado">Il giocatore' + tGiocatore + ': ha pagato: € ' + probabilità[numeroCarta].caratteristica + '</div>';
    document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
}

function compleanno(turnoGiocatore) {
    giocatori[turnoGiocatore].portafogli = giocatori[turnoGiocatore].portafogli + (25 * numerogiocatori);
    for (var i = 0; i < numerogiocatori; i++) {
        giocatori[i].portafogli -= 25;
    }
    var infoBox = '<div class="risultatoDadoIniziale">Il Giocatore' + turnoGiocatore + ': ha ottenuto € 25 da ogni giocatore ovvero: € ' + [(25 * numerogiocatori) - 25] + '</div>';
    document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
}

function andareVia(tGiocatore, schede) {
    giocatore3 = giocatori[tGiocatore];
    posizionevecchiaX = giocatore3.posizioneX;
    posizionevecchiaY = giocatore3.posizioneY;
    posizionevecchia = giocatore3.posizione;
    giocatori[turnoGiocatore].posizione = 0;
    risultatoTiro = 40 - posizionevecchia;

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
                giocatore3.posizioneX = schede[giocatore3.posizione].x;
                giocatore3.posizioneY = schede[giocatore3.posizione].y;
                var infoBox = '<div class="risultatoDado">Il giocatore' + turnoGiocatore + ': ha ottenuto € 500 per essere transinato dal VIA!</div>';
                document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
                giocatore3.portafogli += 500;
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

function andareVicoloCorto(tGiocatore, schede) {
    giocatore3 = giocatori[tGiocatore];
    posizionevecchiaX = giocatore3.posizioneX;
    posizionevecchiaY = giocatore3.posizioneY;
    posizionevecchia = giocatore3.posizione;
    giocatori[turnoGiocatore].posizione = 1;
    risultatoTiro = posizionevecchia - 1;

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
        posizionevecchia2 = posizionevecchia - 1;
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
            posizionevecchia--;
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
