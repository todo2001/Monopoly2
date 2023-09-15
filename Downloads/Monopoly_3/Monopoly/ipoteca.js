var territoriIpotecatiPrecedenti = [];

function popupIpoteca(tGiocatore) {
  var popupContainer2 = document.getElementById("popup-container2");
  popupContainer2.style.display = "block";
  const divElement = document.getElementById('popup-content2');
  divElement.innerHTML = '';
  const form = document.createElement("form");
  form.id = "formIpoteca";

  // Crea un div container per i div dei territori
  const territoryContainer = document.createElement("div");
  territoryContainer.style.display = "flex";
  territoryContainer.style.flexWrap = "wrap"; // Per far andare a capo i div quando la larghezza massima viene raggiunta

  giocatori[tGiocatore].territori.forEach(territori => {
    var div = document.createElement("div");
    const imageLink = schede[territori.numero].link;
    const imageElement = document.createElement('img');
    imageElement.src = imageLink;
    imageElement.width = 150;
    imageElement.height = 230;

    var label = document.createElement("label");
    label.textContent = "Ipoteca:";

    const checkbox = document.createElement("input");
    checkbox.type = 'checkbox';
    checkbox.name = territori.numero;
    checkbox.value = territori.numero;
    if (territori.StatoIpoteca == true) {
      checkbox.checked = true;
    }
    checkbox.addEventListener('change', aggiornaRisulatato);

    div.appendChild(imageElement);
    const br = document.createElement("br");
    div.appendChild(br);
    div.appendChild(label);
    div.appendChild(checkbox);
    div.style.marginRight = "20px"; // Aggiungi spazio tra i div

    territoryContainer.appendChild(div);
  });

  form.appendChild(territoryContainer);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Invia';
  form.appendChild(submitButton);

  divElement.style.display = "flex";
  divElement.appendChild(form);

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    ipotecaTerritori();
    popupContainer2.style.display = "none";
  });

  function aggiornaRisulatato() {
    let risultato = 0;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
      const territorio = giocatori[tGiocatore].territori[index];

      if (checkbox.checked && !territoriIpotecatiPrecedenti.includes(territorio.numero)) {
        risultato += schede[territorio.numero].valoreIpoteca;
      } else if (!checkbox.checked && territoriIpotecatiPrecedenti.includes(territorio.numero)) {
        risultato = risultato - schede[territorio.numero].valoreIpoteca - (schede[territorio.numero].valoreIpoteca * 0.10);;
      }
    });
    var risultatoDiv = document.getElementById('risultatoPagamento');
    risultatoDiv.textContent = 'Risulato:' + risultato;
  }
}



function ipotecaTerritori() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkboxes, index) => {
    const territorio = giocatori[turnoGiocatore].territori[index];
    if (checkboxes.checked && !territoriIpotecatiPrecedenti.includes(territorio.numero)) {
      territoriIpotecatiPrecedenti.push(territorio.numero);
      giocatori[turnoGiocatore].portafogli += schede[territorio.numero].valoreIpoteca;
      var infoBox = '<div class="risultatoDado">Il giocatore' + turnoGiocatore + ': ha ipotecato il terreno: ' + schede[territorio.numero].nome + '</div>';
      document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
    }
    if (!checkboxes.checked && territoriIpotecatiPrecedenti.includes(territorio.numero)) {
      territoriIpotecatiPrecedenti.splice(index, 1);
      giocatori[turnoGiocatore].portafogli = giocatori[turnoGiocatore].portafogli - schede[territorio.numero].valoreIpoteca - (schede[territorio.numero].valoreIpoteca * 0.10);
      var infoBox = '<div class="risultatoDado">Il giocatore' + turnoGiocatore + ": ha tolto l'ipoteca al terreno: " + schede[territorio.numero].nome + '</div>';
      document.getElementById("infoBox").insertAdjacentHTML('afterbegin', infoBox); // Aggiunge il div ai risultati
    }
    giocatori[turnoGiocatore].territori[index].StatoIpoteca = checkboxes.checked;
    schede[giocatori[turnoGiocatore].territori[index].numero].ipotecato = checkboxes.checked;
  });
}
