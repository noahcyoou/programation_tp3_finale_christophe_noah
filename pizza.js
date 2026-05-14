// conteneur principal
let formPizza = document.getElementById("formPizza");

// Titre de la page
let titre = document.createElement("h1");
titre.textContent = "Commande de Pizzas";
formPizza.appendChild(titre);

// selection pizza
let nomsPizzas = ["Margherita", "Pepperoni", "Végétarienne", "Sicilienne"];
let garnituresOptions = {
  Margherita: ["Fromage", "Champignons", "Oignons"],
  Pepperoni: ["Fromage", "Champignons", "Olive"],
  Végétarienne: ["Fromage", "Tomates", "Poivrons"],
  Sicilienne: ["Fromage", "Olives", "Herbes"],
};

for (let i = 0; i < nomsPizzas.length; i++) {
  let nom = nomsPizzas[i];
  let fieldset = document.createElement("fieldset");
  let legend = document.createElement("legend");
  legend.textContent = "Pizza " + nom + " :";
  fieldset.appendChild(legend);

  // checkbox et quantité
  let paragraphe1 = document.createElement("p");
  let checkPizza = document.createElement("input");
  checkPizza.type = "checkbox";
  checkPizza.id = "check" + nom;
  checkPizza.name = "pizzaSelection";

  let labelPizza = document.createElement("label");
  labelPizza.textContent = " " + nom + " Quantité : ";
  labelPizza.setAttribute("for", "check" + nom);

  let qtnInput = document.createElement("input");
  qtnInput.type = "number";
  qtnInput.id = "qtn" + nom;
  qtnInput.min = 0;
  qtnInput.max = 50;
  qtnInput.value = 0;

  paragraphe1.appendChild(checkPizza);
  paragraphe1.appendChild(labelPizza);
  paragraphe1.appendChild(qtnInput);
  fieldset.appendChild(paragraphe1);

  // Garnitures (3 options par pizza)
  let paragraphe2 = document.createElement("p");
  paragraphe2.textContent = "Garnitures : ";
  let options = garnituresOptions[nom];

  for (let j = 0; j < options.length; j++) {
    let nomGarniture = options[j];
    let check = document.createElement("input");
    check.type = "checkbox";
    check.id = "g" + nom + j;
    check.className = "garniture" + nom;
    check.value = nomGarniture;

    let labelGarniture = document.createElement("label");
    labelGarniture.textContent = " " + nomGarniture + " ";
    labelGarniture.setAttribute("for", "g" + nom + j);

    paragraphe2.appendChild(check);
    paragraphe2.appendChild(labelGarniture);
  }
  fieldset.appendChild(paragraphe2);
  formPizza.appendChild(fieldset);
}

// mode de paiment (boutons radio)
let fsPaye = document.createElement("fieldset");
let legendPaye = document.createElement("legend");
legendPaye.textContent = "Mode de paiement :";
fsPaye.appendChild(legendPaye);

let modePaye = [
  { txt: "Carte de Crédit (En ligne)", val: "enLigne" },
  { txt: "Débit/Crédit (À la porte)", val: "porteCard" },
  { txt: "Espèces (À la porte)", val: "especes" },
];

for (let i = 0; i < modePaye.length; i++) {
  let radio = document.createElement("input");
  radio.type = "radio";
  radio.name = "modePaiement";
  radio.id = "pay" + i;
  radio.value = modePaye[i].val;

  let label = document.createElement("label");
  label.textContent = modePaye[i].txt;
  label.setAttribute("for", "pay" + i);

  fsPaye.appendChild(radio);
  fsPaye.appendChild(label);
  fsPaye.appendChild(document.createElement("br"));
}
formPizza.appendChild(fsPaye);

// information clients
function creerChamp(parent, labelTxt, inputId, inputType = "text") {
  let paragraphe = document.createElement("p");
  let label = document.createElement("label");
  label.textContent = labelTxt + " : ";
  let input = document.createElement("input");
  input.type = inputType;
  input.id = inputId;
  paragraphe.appendChild(label);
  paragraphe.appendChild(input);
  parent.appendChild(paragraphe);
}

let fsClient = document.createElement("fieldset");
let legendClient = document.createElement("legend");
legendClient.textContent = "Informations sur le client :";
fsClient.appendChild(legendClient);
creerChamp(fsClient, "Nom", "nomClient");
creerChamp(fsClient, "Prénom", "prenomClient");
creerChamp(fsClient, "Téléphone", "telClient", "tel");
creerChamp(fsClient, "Adresse complète", "adrClient");
formPizza.appendChild(fsClient);

//  info livraison
let fsLivraison = document.createElement("fieldset");
let legendLivraison = document.createElement("legend");
legendLivraison.textContent = "Informations sur la livraison :";
fsLivraison.appendChild(legendLivraison);
creerChamp(fsLivraison, "Nom et prénom", "nomLivraison");
creerChamp(fsLivraison, "Téléphone", "telLivraison", "tel");
creerChamp(fsLivraison, "Adresse de livraison", "adrLivraison");
formPizza.appendChild(fsLivraison);

// boutton commander ---
let btnCommander = document.createElement("button");
btnCommander.textContent = "Commander";
btnCommander.type = "button";
formPizza.appendChild(btnCommander);

// Zone pour la facture
let zoneFacture = document.createElement("div");
zoneFacture.id = "zoneFacture";
formPizza.appendChild(zoneFacture);

// fonction on click

btnCommander.onclick = function () {
  // Validation des champs obligatoires
  if (document.getElementById("nomClient").value == "") {
    alert("Le nom est obligatoire !");
    return;
  }
  if (document.getElementById("prenomClient").value == "") {
    alert("Le prénom est obligatoire !");
    return;
  }
  if (document.getElementById("telClient").value == "") {
    alert("Le téléphone est obligatoire !");
    return;
  }
  if (document.getElementById("adrClient").value == "") {
    alert("L'adresse est obligatoire !");
    return;
  }
  if (document.getElementById("nomLivraison").value == "") {
    alert("Le nom de livraison est obligatoire !");
    return;
  }
  if (document.getElementById("telLivraison").value == "") {
    alert("Le téléphone de livraison est obligatoire !");
    return;
  }
  if (document.getElementById("adrLivraison").value == "") {
    alert("L'adresse de livraison est obligatoire !");
    return;
  }

  // Vérifier qu'au moins une pizza est cochée
  let unePizzaChoisie = false;
  for (let i = 0; i < nomsPizzas.length; i++) {
    if (document.getElementById("check" + nomsPizzas[i]).checked) {
      unePizzaChoisie = true;
    }
  }
  if (unePizzaChoisie == false) {
    alert("Veuillez sélectionner au moins une pizza !");
    return;
  }

  // Vérifier qu'un mode de paiement est choisi
  let modeChoisiAvant = "";
  let radios = document.getElementsByName("modePaiement");

  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      modeChoisiAvant = radios[i].value;
    }
  }
  if (modeChoisiAvant == "") {
    alert("Veuillez choisir un mode de paiement !");
    return;
  }

  // Désactiver le bouton commander pour pas recommencer
  btnCommander.disabled = true;

  // facture
  zoneFacture.innerHTML = "<h2>Facture</h2>";
  let table = document.createElement("table");
  table.border = "1";
  table.innerHTML =
    "<tr><th>Item</th><th>Prix Unitaire</th><th>Quantité</th><th>Total</th></tr>";

  let grandTotal = 0;
  let prixPizza = 15;
  let prixGarniture = 2;

  for (let i = 0; i < nomsPizzas.length; i++) {
    let nom = nomsPizzas[i];
    if (document.getElementById("check" + nom).checked) {
      let qtn = parseInt(document.getElementById("qtn" + nom).value);
      let totalP = qtn * prixPizza;
      grandTotal += totalP;

      let row = table.insertRow();
      row.innerHTML =
        "<td>Pizza " +
        nom +
        "</td><td>" +
        prixPizza +
        "$</td><td>" +
        qtn +
        "</td><td>" +
        totalP +
        "$</td>";

      // Garnitures cochées pour cette pizza
      let garniture = document.getElementsByClassName("garniture" + nom);
      for (let j = 0; j < garniture.length; j++) {
        if (garniture[j].checked) {
          let totalGarniture = qtn * prixGarniture;
          grandTotal += totalGarniture;
          let rowGarniture = table.insertRow();
          rowGarniture.innerHTML =
            "<td> - " +
            garniture[j].value +
            "</td><td>" +
            prixGarniture +
            "$</td><td>" +
            qtn +
            "</td><td>" +
            totalGarniture +
            "$</td>";
        }
      }
    }
  }

  zoneFacture.appendChild(table);
  let prixTotal = document.createElement("p");
  prixTotal.innerHTML = "<strong>Montant total : " + grandTotal + "$</strong>";
  zoneFacture.appendChild(prixTotal);

  // Apparitionu bouton payer
  let btnPayer = document.createElement("button");
  btnPayer.textContent = "Payer ma commande";
  zoneFacture.appendChild(btnPayer);

  btnPayer.onclick = function () {
    // Désactiver le bouton payer pour éviter de répéter le paiement
    btnPayer.disabled = true;

    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        modeChoisi = radios[i].value;
      }
    }

    if (modeChoisi === "enLigne") {
      // Interface de paiement
      let interfacePay = document.createElement("div");
      interfacePay.style.border = "2px solid red";
      interfacePay.style.padding = "10px";
      interfacePay.innerHTML = "<h3>Paiement Sécurisé</h3>";
      creerChamp(interfacePay, "Numéro de carte", "cardNum");
      creerChamp(interfacePay, "Date expiration", "cardDate");

      let btnFinal = document.createElement("button");
      btnFinal.textContent = "Confirmer le paiement de " + grandTotal + "$";

      btnFinal.onclick = function () {
        // Désactiver le bouton confirmer
        btnFinal.disabled = true;
        alert("Paiement réussi ! Merci.");
      };

      interfacePay.appendChild(btnFinal);
      zoneFacture.appendChild(interfacePay);
    } else {
      alert("Merci ! Le paiement se fera à la porte.");
    }
  };
};
