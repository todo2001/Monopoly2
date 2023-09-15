function prigione(turnoGiocatore) {
    var popupContainer = document.getElementById("popup-container");
    popupContainer.style.display = "block";
    const divElement = document.getElementById('popup-content');
    divElement.innerHTML = '';
    var testo = document.createElement("p");
    var riga1 = "Per uscire di prigione puoi:";
    var riga2 = "1) Mediante il pagamento di € 125 , prima di lanciare i dadi";
    var riga3 = "2) Ottenendo un punteggio doppio con i dadi. In questo caso deve muovere la pedina di un numero di caselle pari al punteggio ottenuto "
    var riga4 = "3) Utilizzando  USCITE GRATIS DI PRIGIONE se posseduta";
    testo.innerHTML = riga1 + "<br>" + riga2 + "<br>" + riga3 + "<br>" + riga4 + "<br>";
    divElement.appendChild(testo);
    var dadi = document.createElement("button");
    divElement.appendChild(dadi);
    dadi.innerText = "Tira Dadi";
    dadi.addEventListener("click", function () {
      var dadoPrigione1 = Math.floor(Math.random() * 6) + 1;
      var dadoPrigione2 = Math.floor(Math.random() * 6) + 1;
      if (dadoPrigione1 == dadoPrigione2) {
        giocatori[turnoGiocatore].prigione = false;
        var risultato = dadoPrigione1 + dadoPrigione2;
        giocatori[turnoGiocatore].contaturniPrigione = 0;
        var infoBox = '<div class="risultatoDado">Il giocatore' + turnoGiocatore + " è uscito di prigione per aver ottenuto il risultato doppio </div>";
        document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
        spostaPedina(turnoGiocatore, risultato, dadoPrigione1, dadoPrigione2, schede);
        popupContainer.style.display = "none";
  
  
      } else {
        var risultato = dadoPrigione1 + dadoPrigione2;
        giocatori[turnoGiocatore].contaturniPrigione++;
        var infoBox = '<div class="risultatoDado">Il giocatore' + turnoGiocatore + ': ha ottenuto il risultato: ' + risultato + ' (' + dadoPrigione1 + ' - ' + dadoPrigione2 + '), resta in prigione</div>';
        document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
        var infoBox = '<div class="risultatoDado">Questo è il turno ' + giocatori[turnoGiocatore].contaturniPrigione + ' che il giocatore' + turnoGiocatore + ' sta passando in prigione</div>';
        document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
        popupContainer.style.display = "none";
      }
      if (giocatori[turnoGiocatore].contaturniPrigione == 3) {
        giocatori[turnoGiocatore].portafogli -= 125;
        giocatori[turnoGiocatore].prigione = false;
        var infoBox = '<div class="risultatoDado">Il giocatore' + turnoGiocatore + ": è uscito di prigione per aver pagato la cauzione di €125 in automatico dopo aver passato 3 turni in prigione</div>";
        document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox);
        popupContainer.style.display = "none";
        var risultato = dadoPrigione1 + dadoPrigione2;
        spostaPedina(turnoGiocatore, risultato, dadoPrigione1, dadoPrigione2, schede);
      }
    });
    var pagare = document.createElement("button");
    divElement.appendChild(pagare);
    pagare.innerText = "Pagare € 125 ";
    pagare.addEventListener("click", function () {
      giocatori[turnoGiocatore].prigione = false;
      giocatori[turnoGiocatore].portafogli -= 125;
      var infoBox = '<div class="risultatoDado">Il giocatore' + turnoGiocatore + ": è uscito di prigione per aver pagato la cauzione di €125</div>";
      document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox);
      dadiBottone.style.display = "block";
      passaturnoBottone.style.display = "none";
      popupContainer.style.display = "none";
    });
    if (giocatori[turnoGiocatore].uscitaGratisImprevisto == true || giocatori[turnoGiocatore].uscitaGratisProbabilità == true) {
      var uscitaGratis = document.createElement("button");
      divElement.appendChild(uscitaGratis);
      uscitaGratis.innerText = "Uscita gratis";
      uscitaGratis.addEventListener("click", function () {
        if (giocatori[turnoGiocatore].uscitaGratisImprevisto == true) {
          giocatori[turnoGiocatore].uscitaGratisImprevisto = false;
        } else {
          giocatori[turnoGiocatore].uscitaGratisProbabilità = false;
        };
        giocatori[turnoGiocatore].prigione = false;
        var infoBox = '<div class="risultatoDado">Il giocatore' + turnoGiocatore + ": è uscito di prigione per aver utilizzato l'uscita gratis di prigione </div>";
        document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox);
        dadiBottone.style.display = "block";
        passaturnoBottone.style.display = "none";
        popupContainer.style.display = "none";
      });
    }
  
  }