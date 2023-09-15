


var NimprevistiAperti = 0;
function apriImprevisti(tGiocatore, schede) {
  var nImprevisto = 0;
  if (NimprevistiAperti == 16) {
    imprevistiAperti.splice(0, imprevistiAperti.length);
    NimprevistiAperti = 0;
  }
  while (true) {
    nImprevisto = Math.floor(Math.random() * 16);
    if (!imprevistiAperti.includes(nImprevisto)) {
      imprevistiAperti.push(nImprevisto);
      NimprevistiAperti++;
      break;
    }
  }
  apripopupImprevisto(nImprevisto, tGiocatore, schede);
}

function apripopupImprevisto(numeroImprevisto, tGiocatore, schede) {
  var popupContainer = document.getElementById("popup-container");
  popupContainer.style.display = "block";
  const imageLink2 = imprevisti[numeroImprevisto].link;
  const imageElement2 = document.createElement('img');
  imageElement2.src = imageLink2;
  imageElement2.width = 434;
  imageElement2.height = 227;
  const divElement = document.getElementById('popup-content');
  divElement.innerHTML = '';
  divElement.appendChild(imageElement2);
  var bottoneImprevisto = document.createElement("button");
  divElement.appendChild(bottoneImprevisto);
  if (imprevisti[numeroImprevisto].tipo == "ritirare") {
    bottoneImprevisto.innerText = "Chiudi";
    bottoneImprevisto.addEventListener("click", function () {
      popupContainer.style.display = "none"
      ritirare(numeroImprevisto, tGiocatore);
    })
  } if (imprevisti[numeroImprevisto].tipo == "pagare") {
    bottoneImprevisto.innerText = "Pagare";
    bottoneImprevisto.addEventListener("click", function () {
      popupContainer.style.display = "none"
      pagare(numeroImprevisto, tGiocatore);
    })
  } if (imprevisti[numeroImprevisto].tipo == "andare") {
    bottoneImprevisto.innerText = "Chiudi";
    bottoneImprevisto.addEventListener("click", function () {
      popupContainer.style.display = "none"
      spostare(numeroImprevisto, tGiocatore, schede);
    })
  } if (imprevisti[numeroImprevisto].tipo == "uscire") {
    bottoneImprevisto.innerText = "Chiudi";
    bottoneImprevisto.addEventListener("click", function () {
      popupContainer.style.display = "none";
      giocatori[tGiocatore].uscitaGratisImprevisto = true;
    })
  }
  if (imprevisti[numeroImprevisto].tipo == "andare3") {
    bottoneImprevisto.innerText = "Chiudi";
    bottoneImprevisto.addEventListener("click", function () {
      popupContainer.style.display = "none"
      spostare3(tGiocatore, schede);
    })
  }
  if (imprevisti[numeroImprevisto].tipo == "prigione") {
    bottoneImprevisto.innerText = "Chiudi";
    bottoneImprevisto.addEventListener("click", function () {
      popupContainer.style.display = "none"
      spostamentoPrigione(tGiocatore);
    })
  }


}


var NProbaabilitàAperti = 0;
function apriProbabilità(tGiocatore, schede) {
  var numeroCarta = 0;
  if (NProbaabilitàAperti == 15) { // verifica se sono state estratte tutte le carte
    probabilitàAperti.splice(0, probabilitàAperti.length);//svuota l'array della probabilità aperte
    NProbaabilitàAperti = 0;
  }
  while (true) {
    numeroCarta = Math.floor(Math.random() * 15); //Estrae un carta Probabilità in maniera casuale
    if (!probabilitàAperti.includes(numeroCarta)) { //verifica che la carta estratta non si già estratta in precedenza, garantendo così che ogni carta estratta in precedenza sia messa sotto alla pila
      probabilitàAperti.push(numeroCarta);
      NProbaabilitàAperti++;
      break;
    }
  }
  apriPopupProbabilità(numeroCarta, tGiocatore, schede);
}

function apriPopupProbabilità(numeroCarta, tGiocatore, schede) {
  var popupContainer = document.getElementById("popup-container");
  popupContainer.style.display = "block";
  const imageLink3 = probabilità[numeroCarta].link;
  const imageElement3 = document.createElement('img');
  imageElement3.src = imageLink3;
  imageElement3.width = 434;
  imageElement3.height = 227;
  const divElement = document.getElementById('popup-content');
  divElement.innerHTML = '';
  divElement.appendChild(imageElement3);
  var br = document.createElement('br');
  divElement.appendChild(br);
  var bottoneProbabilità = document.createElement("button");
  divElement.appendChild(bottoneProbabilità);
  if (probabilità[numeroCarta].tipo == "ritirare") {
    bottoneProbabilità.innerText = "Chiudi";
    bottoneProbabilità.addEventListener("click", function () {
      popupContainer.style.display = "none"
      ritirareProbabilità(numeroCarta, tGiocatore);
    })
  } if (probabilità[numeroCarta].tipo == "pagare") {
    bottoneProbabilità.innerText = "Pagare";
    bottoneProbabilità.addEventListener("click", function () {
      popupContainer.style.display = "none"
      pagareProbabilità(numeroCarta, tGiocatore);
    })
  } if (probabilità[numeroCarta].tipo == "andareVia") {
    bottoneProbabilità.innerText = "Chiudi";
    bottoneProbabilità.addEventListener("click", function () {
      popupContainer.style.display = "none"
      andareVia(tGiocatore, schede);
    })
  } if (probabilità[numeroCarta].tipo == "uscire") {
    bottoneProbabilità.innerText = "Chiudi";
    bottoneProbabilità.addEventListener("click", function () {
      popupContainer.style.display = "none";
      giocatori[tGiocatore].uscitaGratisProbabilità = true;
    })
  } if (probabilità[numeroCarta].tipo == "prigione") {
    bottoneProbabilità.innerText = "Chiudi";
    bottoneProbabilità.addEventListener("click", function () {
      popupContainer.style.display = "none";
      spostamentoPrigione(tGiocatore);
    })
  }
  if (probabilità[numeroCarta].tipo == "compleanno") {
    bottoneProbabilità.innerText = "Chiudi";
    bottoneProbabilità.addEventListener("click", function () {
      popupContainer.style.display = "none";
      compleanno(tGiocatore);
    })
  }
  if (probabilità[numeroCarta].tipo == "25/imprevisto") {
    bottoneProbabilità.innerText = "Pagare € 25";
    bottoneProbabilità.addEventListener("click", function () {
      popupContainer.style.display = "none";
      pagareProbabilità(numeroCarta, tGiocatore);
    })
    var bottoneImpre = document.createElement("button");
    divElement.appendChild(bottoneImpre);
    bottoneImpre.innerText = "Aprire Imprevisto";
    bottoneImpre.addEventListener("click", function () {
      popupContainer.style.display = "none";
      apriImprevisti(tGiocatore, schede);
    });

  }
  if (probabilità[numeroCarta].tipo == "andareVicoloCorto") {
    bottoneProbabilità.innerText = "Chiudi";
    bottoneProbabilità.addEventListener("click", function () {
      popupContainer.style.display = "none"
      andareVicoloCorto(tGiocatore, schede);
    });
  }
}



function scambio(turnoGiocatore) {
  var territoriGiocatore1 = [];
  var territoriGiocatore2 = [];
  var soldiGiocatore1 = 0;
  var soldiGiocatore2 = 0;
  var popupContainer2 = document.getElementById("popup-container");
  popupContainer2.style.display = "block";
  const divElement = document.getElementById('popup-content');
  divElement.innerHTML = '';
  var form = document.createElement("form");
  form.id = scambio;
  var divGiocatore1 = document.createElement("div");
  var giocatoreLabel = document.createElement("label");
  giocatoreLabel.textContent = "Seleziona i territori da scambiare:";
  divGiocatore1.appendChild(giocatoreLabel);
  var territoryGiocatore1 = document.createElement("div");
  territoryGiocatore1.style.display = "flex";
  territoryGiocatore1.style.flexWrap = "wrap";

  giocatori[turnoGiocatore].territori.forEach(territori => {
    var divImage1 = document.createElement("div");
    divImage1.style.display = "inline-block"; 
    divImage1.style.marginRight = "10px"
    var imageElement = document.createElement("img");
    var imageLink = schede[territori.numero].link; // Immagine del territorio
    imageElement.src = imageLink;
    imageElement.width = 150;
    imageElement.height = 230;
    divImage1.appendChild(imageElement);

    var checkboxGiocatore1 = document.createElement("input");
    checkboxGiocatore1.setAttribute("type", "checkbox");
    checkboxGiocatore1.setAttribute("id", schede[territori.numero].posizione);
    checkboxGiocatore1.value = territori.numero;
    checkboxGiocatore1.addEventListener("change", function (event) {
      var territorio = event.target.value;
      if (event.target.checked) {
        territoriGiocatore1.push(territorio);
      } else {
        var io = territoriGiocatore1.indexOf(territorio);
        if (io > -1) {
          territoriGiocatore1.splice(io, 1);
        }
      }
    })
    var territoriLabel = document.createElement("label");
    territoriLabel.textContent = schede[territori.numero].nome;
    var br = document.createElement('br');
    divImage1.appendChild(br);
    divImage1.appendChild(territoriLabel);
    divImage1.appendChild(checkboxGiocatore1);
    territoryGiocatore1.appendChild(divImage1);
    divGiocatore1.appendChild(territoryGiocatore1);
  });
  

  var soldiLabel = document.createElement("label");
  soldiLabel.textContent = "Inserisci € da scambiare:";
  divGiocatore1.appendChild(soldiLabel);

  var soldiInput = document.createElement("input");
  soldiInput.type = "text";
  soldiInput.id = "soldiGiocatore1";
  soldiInput.value = 0;
  soldiInput.style.width = "50px";
  divGiocatore1.appendChild(soldiInput);

  var br = document.createElement('br');
  divGiocatore1.appendChild(br);
  divGiocatore1.id = "divGiocatore1";
  divGiocatore1.style.overflow = 'auto';
  divGiocatore1.style.height=250;
  divGiocatore1.style.width=300;
  form.appendChild(divGiocatore1);
  var giocatoreLabel = document.createElement("label");
  var br = document.createElement('br');
  divGiocatore1.appendChild(br);
  giocatoreLabel.textContent = "Seleziona il giocatore:";
  form.appendChild(giocatoreLabel);



  var giocatoreSelect = document.createElement("select");
  giocatoreSelect.id = "giocatoreSelect";
  var emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.textContent = "-";
  giocatoreSelect.appendChild(emptyOption);

  giocatori.forEach(function (giocatore, indice) {
    if (giocatore.numero != turnoGiocatore) {
      var option = document.createElement("option");
      option.value = indice.toString();
      option.textContent = "Giocatore" + giocatore.numero;
      giocatoreSelect.appendChild(option);
    }
  });

  form.appendChild(giocatoreSelect);
  var divGiocatore2 = document.createElement("div");
   
  giocatoreSelect.addEventListener("change", function () {
    var giocatoreIndex = parseInt(giocatoreSelect.value);
    divGiocatore2.innerHTML = "";
    var divImage2 = document.createElement("div");
    var territoryGiocatore2 = document.createElement("div");
    territoryGiocatore2.style.display = "flex";
    territoryGiocatore2.style.flexWrap = "wrap";
    giocatori[giocatoreIndex].territori.forEach(territori => {
      var divImage2 = document.createElement("div");
      divImage2.style.display = "inline-block"; 
      divImage2.style.marginRight = "10px"
      var imageElement = document.createElement("img");
      var imageLink = schede[territori.numero].link; // Immagine del territorio
      imageElement.src = imageLink;
      imageElement.width = 150;
      imageElement.height = 230;
      divImage2.appendChild(imageElement);

      var checkboxGiocatore2 = document.createElement("input");
      checkboxGiocatore2.setAttribute("type", "checkbox");
      checkboxGiocatore2.setAttribute("id", schede[territori.numero].posizione);
      checkboxGiocatore2.value = territori.numero;
      checkboxGiocatore2.addEventListener("change", function (event) {
        var territorio = event.target.value;
        if (event.target.checked) {
          territoriGiocatore2.push(territorio);
        } else {
          var io = territoriGiocatore2.indexOf(territorio);
          if (io > -1) {
            territoriGiocatore2.splice(io, 1);
          }
        }
      })
      var territoriLabel2 = document.createElement("label");
      territoriLabel2.textContent = schede[territori.numero].nome;
      var br = document.createElement('br');
      divImage2.appendChild(br);
      divImage2.appendChild(territoriLabel2);
      divImage2.appendChild(checkboxGiocatore2);
      territoryGiocatore2.appendChild(divImage2);
      divGiocatore2.appendChild(territoryGiocatore2);
    })
  });

  var br = document.createElement('br');
  divGiocatore2.appendChild(br);
  form.appendChild(divGiocatore2);
  var soldiLabel2 = document.createElement("label");
  soldiLabel2.textContent = "Inserisci € da ricevere dall'altro giocatore:";
  form.appendChild(soldiLabel2);

  var soldiInput2 = document.createElement("input");
  soldiInput2.type = "text";
  soldiInput2.id = "soldiGiocatore2";
  soldiInput2.value = 0;
  soldiInput2.style.width = "50px";
  
  form.appendChild(soldiInput2);
 
  var submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Proponi Scambio';
  form.appendChild(br);
  form.appendChild(submitButton);
  divElement.appendChild(form);
  var annulla = document.createElement("button");
  annulla.textContent = 'Annulla Scambio';
  divElement.appendChild(annulla);
  annulla.addEventListener("click", function () {
    popupContainer2.style.display = "none";
  })

  form.addEventListener("submit", function (event, giocatoreID) {
    event.preventDefault();
    var giocatoreSelect = document.getElementById("giocatoreSelect");
    var giocatoreID = giocatoreSelect.value;
    popupContainer2.style.display = "none";
    var popupContainer3 = document.getElementById("popup-container3");
    popupContainer3.style.display = "block";
    var divElement = document.getElementById('popup-content3');
    divElement.innerHTML = "";
    var titolo = document.createElement("div");
    titolo.textContent = "Giocatore" + giocatoreID + ": ti è stato proposto uno scambio dal giocatore" + turnoGiocatore;
    divElement.appendChild(titolo);
    var div1 = document.createElement("div");
    div1.textContent = "Il giocatore" + turnoGiocatore + " offre:";
    divElement.appendChild(div1);
    console.log(territoriGiocatore1);
    territoriGiocatore1.forEach(territorio => {
      var imageElement = document.createElement("img");
      var imageLink = schede[territorio].link; // Immagine del territorio
      imageElement.src = imageLink;
      imageElement.width = 150;
      imageElement.height = 230;
      divElement.appendChild(imageElement);
    });
    var soldiInput1 = document.getElementById("soldiGiocatore1");
    soldiGiocatore1 = parseInt(soldiInput1.value, 10);
    var div1 = document.createElement("div");
    div1.textContent = "E € " + soldiGiocatore1;
    divElement.appendChild(div1);

    var div2 = document.createElement("div");
    div2.textContent = "In cambio di:";
    divElement.appendChild(div2);
    territoriGiocatore2.forEach(territorio => {
      var imageElement = document.createElement("img");
      var imageLink = schede[territorio].link; // Immagine del territorio
      imageElement.src = imageLink;
      imageElement.width = 150;
      imageElement.height = 230;
      divElement.appendChild(imageElement);

    });
    var soldiInput2 = document.getElementById("soldiGiocatore2");
    soldiGiocatore2 = parseInt(soldiInput2.value, 10);
    var div2 = document.createElement("div");
    div2.textContent = "E € " + soldiGiocatore2;
    divElement.appendChild(div2);
    var conferma = document.createElement("button");
    conferma.textContent = 'Accetta Scambio';
    var rifiuta = document.createElement("button");
    rifiuta.textContent = 'Rifiuta Scambio';
    divElement.appendChild(conferma);
    divElement.appendChild(rifiuta);
    conferma.addEventListener("click", function () {
      popupContainer3.style.display = "none";
      var infoBox = '<div class="risultatoDado">Il giocatore' + giocatoreID + ": ha accettato lo scambio</div>";
      document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
      giocatori[giocatoreID].portafogli = giocatori[giocatoreID].portafogli - soldiGiocatore2;
      giocatori[giocatoreID].portafogli = giocatori[giocatoreID].portafogli + soldiGiocatore1;
      giocatori[turnoGiocatore].portafogli = giocatori[turnoGiocatore].portafogli + soldiGiocatore2;
      giocatori[turnoGiocatore].portafogli = giocatori[turnoGiocatore].portafogli - soldiGiocatore1;
      territoriGiocatore1.forEach(territorio => {
        var territoriGiocatore = giocatori[turnoGiocatore].territori
        var indice = territoriGiocatore.findIndex(function (elemento) {
          return elemento.numero == territorio;
        });

        var ipoteca = giocatori[turnoGiocatore].territori[indice].StatoIpoteca;
        var gruppo = giocatori[turnoGiocatore].territori[indice].gruppo
        var nEdifici = giocatori[turnoGiocatore].territori[indice].numeroEdifici
        var x = giocatori[turnoGiocatore].territori[indice].x;
        var y = giocatori[turnoGiocatore].territori[indice].y;
        var asse = giocatori[turnoGiocatore].territori[indice].asse;
        giocatori[turnoGiocatore].territori.splice(indice, 1);
        giocatori[giocatoreID].territori.push({ numero: territorio, StatoIpoteca: ipoteca,x: x, y:y, gruppo: gruppo, numeroEdifici: nEdifici, asse: asse});
        schede[territorio].proprietario = giocatoreID;

        if (schede[territorio].asse == "1") {
          ctx.fillStyle = giocatori[giocatoreID].colore;
          ctx.fillRect(schede[territorio].x, schede[territorio].y - 2, 70, 5);
        }
        if (schede[territorio].asse == "2") {
          ctx.fillStyle = giocatori[giocatoreID].colore;
          ctx.fillRect(schede[territorio].x + 98, schede[territorio].y, 5, 70);
        }
        if (schede[territorio].asse == "3") {
          ctx.fillStyle = giocatori[giocatoreID].colore;
          ctx.fillRect(schede[territorio].x, schede[territorio].y + 98, 70, 5);
        }
        if (schede[territorio].asse == "4") {
          ctx.fillStyle = giocatori[giocatoreID].colore;
          ctx.fillRect(schede[territorio].x, schede[territorio].y, 5, 70);
        }
      })
      territoriGiocatore2.forEach(territorio => {
        var territoriGiocatore = giocatori[giocatoreID].territori

        var indice = territoriGiocatore.findIndex(function (elemento) {
          return elemento.numero == territorio;
        });
        var ipoteca = giocatori[giocatoreID].territori[indice].StatoIpoteca;
        var gruppo = giocatori[giocatoreID].territori[indice].gruppo;
        var nEdifici = giocatori[giocatoreID].territori[indice].numeroEdifici;
        var x = giocatori[giocatoreID].territori[indice].x;
        var y = giocatori[giocatoreID].territori[indice].y;
        var asse = giocatori[giocatoreID].territori[indice].asse;
        giocatori[giocatoreID].territori.splice(indice, 1);
        giocatori[turnoGiocatore].territori.push({ numero: territorio, StatoIpoteca: ipoteca,x: x, y:y, gruppo: gruppo, numeroEdifici: nEdifici,asse:asse });
        schede[territorio].proprietario = turnoGiocatore;

        if (schede[territorio].asse == "1") {
          ctx.fillStyle = giocatori[turnoGiocatore].colore;
          ctx.fillRect(schede[territorio].x, schede[territorio].y - 2, 70, 5);
        }
        if (schede[territorio].asse == "2") {
          ctx.fillStyle = giocatori[turnoGiocatore].colore;
          ctx.fillRect(schede[territorio].x + 98, schede[territorio].y, 5, 70);
        }
        if (schede[territorio].asse == "3") {
          ctx.fillStyle = giocatori[turnoGiocatore].colore;
          ctx.fillRect(schede[territorio].x, schede[territorio].y + 98, 70, 5);
        }
        if (schede[territorio].asse == "4") {
          ctx.fillStyle = giocatori[turnoGiocatore].colore;
          ctx.fillRect(schede[territorio].x, schede[territorio].y, 5, 70);
        }
      })
      info();
    });
    rifiuta.addEventListener("click", function () {
      popupContainer3.style.display = "none";
      var infoBox = '<div class="risultatoDado">Il giocatore' + giocatoreID + ": ha rifiutato lo scambio</div>";
      document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
    });






  });

}
