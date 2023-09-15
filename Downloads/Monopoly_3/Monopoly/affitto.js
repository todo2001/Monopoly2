function pagaAffitto(posizione, numerogiocatore, schede, giocatore) {
  var proprietario = schede[posizione].proprietario;
  proprietario = parseInt(proprietario);
  giocatori[proprietario].gruppiCompletati.forEach(gruppiCompletati => {
    if (gruppiCompletati == schede[posizione].gruppo) {
      if (gruppiCompletati == "Società") {
        alert("affitto Società");
      } else {
        var infoBox = '<div class="risultatoDado">Il giocatore' + turnoGiocatore + ': ha pagato: ' + schede[posizione].affitto * 2 + ' al giocatore' + proprietario + '</div>';
        document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
        giocatore[numerogiocatore].portafogli = giocatore[schede[posizione]].portafogli + (schede[posizione].affitto * 2);
        giocatore[schede[posizione].proprietario].portafogli = giocatore[schede[posizione].proprietario].portafogli + (schede[posizione].affitto * 2);
        return;
      }
    }
  });

  var infoBox = '<div class="risultatoDado">Il giocatore' + turnoGiocatore + ': ha pagato: ' + schede[posizione].affitto + ' al giocatore' + proprietario + '</div>';
  document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
  giocatore[numerogiocatore].portafogli -= schede[posizione].affitto;
  giocatore[schede[posizione].proprietario].portafogli += schede[posizione].affitto;

}

function gruppo() {
  giocatori.forEach(giocatore => {
    const territori = giocatore.territori;
    const contaGruppi = {};
    territori.forEach(territori => {
      contaGruppi[territori.gruppo] = (contaGruppi[territori.gruppo] || 0) + 1
      if (contaGruppi[territori.gruppo] >= 2 && !giocatore.gruppiCompletati.includes(territori.gruppo)) {
        if (territori.gruppo == "Marrone" || territori.gruppo == "Blu" || territori.gruppo == "Società") {
          giocatore.gruppiCompletati.push(territori.gruppo);
        }
      }
      if (contaGruppi[territori.gruppo] < 2 && giocatore.gruppiCompletati.includes(territori.gruppo)) {
        // Rimuovi il gruppo dall'array giocatore.gruppiCompletati
        const indiceGruppo = giocatore.gruppiCompletati.indexOf(territori.gruppo);
        if (indiceGruppo !== -1) {
          giocatore.gruppiCompletati.splice(indiceGruppo, 1);
        }
      }

      if (contaGruppi[territori.gruppo] >= 3 && !giocatore.gruppiCompletati.includes(territori.gruppo)) {
        giocatore.gruppiCompletati.push(territori.gruppo);
      }
    })
  });
}

function CaseHotel(turnoGiocatore) {
  var popupContainer2 = document.getElementById("popup-container");
  popupContainer2.style.display = "block";
  const divElement = document.getElementById('popup-content');
  divElement.innerHTML = '';
  var form = document.createElement("form");

  var giocatoreLabel = document.createElement("label");
  giocatoreLabel.textContent = "Costruzione";
  divElement.appendChild(giocatoreLabel);
  var territoryGiocatore1 = document.createElement("div");
  territoryGiocatore1.style.display = "flex";
  territoryGiocatore1.style.flexWrap = "wrap";
  giocatori[turnoGiocatore].gruppiCompletati.forEach(gruppo => {
    giocatori[turnoGiocatore].territori.forEach(territori => {
      var divImage1 = document.createElement("div");
      divImage1.style.display = "inline-block";
      divImage1.style.marginRight = "10px"
      var imageElement = document.createElement("img");
      if (territori.gruppo === gruppo) {
        var valoreVecchio = territori.numeroEdifici;
        var imageLink = schede[territori.numero].link; // Immagine del territorio
        imageElement.src = imageLink;
        imageElement.width = 150;
        imageElement.height = 230;
        divImage1.appendChild(imageElement);


        var edificiSelect = document.createElement("select");
        edificiSelect.id = territori.numero;
        edificiSelect.style.width = "150px";
        edificiSelect.style.marginTop = "3px";
        var casa0 = document.createElement("option");
        var casa1 = document.createElement("option");
        var casa2 = document.createElement("option");
        var casa3 = document.createElement("option");
        var casa4 = document.createElement("option");
        var albergo = document.createElement("option");
        casa0.value = "0";
        casa1.value = "1";
        casa2.value = "2";
        casa3.value = "3";
        casa4.value = "4";
        albergo.value = "5";
        casa0.textContent = "0";
        casa1.textContent = "1";
        casa2.textContent = "2";
        casa3.textContent = "3";
        casa4.textContent = "4";
        albergo.textContent = "Albergo";

        edificiSelect.appendChild(casa0);
        edificiSelect.appendChild(casa1);
        edificiSelect.appendChild(casa2);
        edificiSelect.appendChild(casa3);
        edificiSelect.appendChild(casa4);
        edificiSelect.appendChild(albergo);
        edificiSelect.value = valoreVecchio;

        var br = document.createElement("br");
        divImage1.appendChild(br);
        divImage1.appendChild(edificiSelect);
        territoryGiocatore1.appendChild(divImage1);
        form.appendChild(territoryGiocatore1);
      }
    })
  })

  var conferma = document.createElement("button");
  conferma.textContent = 'Conferma';
  conferma.type = 'submit';
  var annulla = document.createElement("button");
  annulla.textContent = 'Annulla';
  form.appendChild(conferma);
  form.appendChild(annulla);
  form.addEventListener("submit", function (event, giocatoreID) {
    event.preventDefault();
    popupContainer2.style.display = "none";
    aggiornaEdifici();
  })
  annulla.addEventListener("click", function () {
    popupContainer2.style.display = "none";
  })
  divElement.appendChild(form);
}

canvasCont = document.getElementById("canvas-container")
var canvasEdifici = document.createElement('canvas');
canvasEdifici.id = "CanvasEdifici";
canvasEdifici.width = 850;
canvasEdifici.height = 850;
canvasEdifici.style.position = "absolute";
canvasEdifici.style.top = 0;
canvasEdifici.style.left = 0;
canvasEdifici.style.border = '2px solid black';
canvasCont.appendChild(canvasEdifici);
var contextEdifici = canvasEdifici.getContext('2d')

function aggiornaEdifici() {

  giocatori[turnoGiocatore].gruppiCompletati.forEach(gruppo => {
    giocatori[turnoGiocatore].territori.forEach(territori => {

      if (territori.gruppo === gruppo) {
        var valoreVecchio = territori.numeroEdifici;

        // Ottieni l'elemento select tramite il suo name
        var selectElement = document.getElementById(territori.numero);
        // Ottieni il valore selezionato
        var valoreSelezionato = selectElement.value;
        if (valoreVecchio != valoreSelezionato) {
          territori.numeroEdifici = valoreSelezionato;
          console.log("Valore Selezionato per Territorio " + territori.numero + ":", valoreSelezionato);
          if (valoreVecchio < valoreSelezionato) {
            var valore = valoreSelezionato - valoreVecchio;

            if (territori.asse == 3) {
              if (valoreSelezionato == 5) {
                contextEdifici.clearRect(territori.x, 742, 70, 40);
                var imgHotel = new Image();
                imgHotel.src = 'img/Hotel.png';
                imgHotel.onload = function () {
                  contextEdifici.drawImage(imgHotel, territori.x + 5, 742, 13, 16);

                }
              }
              if (valoreSelezionato == 4) {
                contextEdifici.clearRect(territori.x, 742, 70, 40);
                var img = new Image();
                img.src = 'img/Casa4.png';
                img.onload = function () {

                  contextEdifici.drawImage(img, territori.x + 5, 742, 64, 16);
                }
              }
              if (valoreSelezionato == 3) {
                contextEdifici.clearRect(territori.x, 742, 70, 40);
                var img = new Image();
                img.src = 'img/Casa3.png';
                img.onload = function () {

                  contextEdifici.drawImage(img, territori.x + 5, 742, 47, 16);
                }
              }
              if (valoreSelezionato == 2) {
                contextEdifici.clearRect(territori.x, 742, 70, 40);
                var img = new Image();
                img.src = 'img/Casa2.png';
                img.onload = function () {


                  contextEdifici.drawImage(img, territori.x + 5, 742, 30, 16);
                }
              }
              if (valoreSelezionato == 1) {
                contextEdifici.clearRect(territori.x + 5, 742, 70, 40);
                var img = new Image();
                img.src = 'img/Casa.png';
                img.onload = function () {
                  contextEdifici.drawImage(img, territori.x + 5, 742, 13, 16);
                }
              }
            }
            if (territori.asse == 2) {
              if (valoreSelezionato == 5) {
                contextEdifici.clearRect(742, territori.y+5, 40, 70);
                var imgHotel = new Image();
                imgHotel.src = 'img/Hotel(asse2).png';
                imgHotel.onload = function () {
                  contextEdifici.drawImage(imgHotel, 660, territori.y+5, 16, 13);

                }
              }
              if (valoreSelezionato == 4) {
                contextEdifici.clearRect(660, territori.y + 5, 40, 70);
                var img = new Image();
                img.src = 'img/Casa4(asse2).png';
                img.onload = function () {

                  contextEdifici.drawImage(img, 660, territori.y + 5, 16, 64);
                }
              }
              if (valoreSelezionato == 3) {
                contextEdifici.clearRect(660, territori.y + 5, 40, 70);
                var img = new Image();
                img.src = 'img/Casa3(asse2).png';
                img.onload = function () {

                  contextEdifici.drawImage(img, 660, territori.y + 5, 16, 47);
                }
              }
              if (valoreSelezionato == 2) {
                contextEdifici.clearRect(660, territori.y + 5, 40, 70);
                var img = new Image();
                img.src = 'img/Casa2(asse2).png';
                img.onload = function () {


                  contextEdifici.drawImage(img, 660, territori.y + 5, 16, 30);
                }
              }
              if (valoreSelezionato == 1) {
                contextEdifici.clearRect(territori.x + 5, 742, 40, 70);
                var img = new Image();
                img.src = 'img/Casa(asse2).png';
                img.onload = function () {
                  contextEdifici.drawImage(img, territori.x + 5, 742, 16, 13);
                }
              }
            }


          }
          if (valoreVecchio > valoreSelezionato) {
            var valore = valoreVecchio - valoreSelezionato;
            if (valoreSelezionato == 0) {
              alert("cancella");
              contextEdifici.clearRect(territori.x + 5, 742, 70, 40);
            }
          }
        }
      }
    });
  });
}