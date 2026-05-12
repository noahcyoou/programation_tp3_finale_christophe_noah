
// --- Initialisation du conteneur principal ---
let formPizza = document.getElementById("formPizza");

// Titre de la page
let titre = document.createElement("h1");
titre.textContent = "Commande de Pizzas";
formPizza.appendChild(titre);

// --- 1. SÉLECTION DES PIZZAS (Dynamique) ---
let nomsPizzas = ["Margherita", "Pepperoni", "Végétarienne", "Sicilienne"];
let garnituresOptions = {
  "Margherita": ["Fromage", "Champignons", "Oignons"],
  "Pepperoni": ["Fromage", "Champignons", "Olive"],
  "Végétarienne": ["Fromage", "Tomates", "Poivrons"],
  "Sicilienne": ["Fromage", "Olives", "Herbes"]
};

for (let i = 0; i < nomsPizzas.length; i++) {
  let nom = nomsPizzas[i];
  let fieldset = document.createElement("fieldset");
  let legend = document.createElement("legend");
  legend.textContent = "Pizza " + nom + " :";
  fieldset.appendChild(legend);

  // Checkbox de sélection et Quantité
  let p1 = document.createElement("p");
  let checkPizza = document.createElement("input");
  checkPizza.type = "checkbox";
  checkPizza.id = "chk" + nom;
  checkPizza.name = "pizzaSelection";
  
  let lblPizza = document.createElement("label");
  lblPizza.textContent = " " + nom + " Quantité : ";
  lblPizza.setAttribute("for", "chk" + nom);

  let qteInput = document.createElement("input");
  qteInput.type = "number";
  qteInput.id = "qte" + nom;
  qteInput.min = 0;
  qteInput.max = 50;
  qteInput.value = 0;

  p1.appendChild(checkPizza);
  p1.appendChild(lblPizza);
  p1.appendChild(qteInput);
  fieldset.appendChild(p1);

  // Garnitures (3 options par pizza)
  let p2 = document.createElement("p");
  p2.textContent = "Garnitures : ";
  let options = garnituresOptions[nom];
  
  for (let j = 0; j < options.length; j++) {
    let gName = options[j];
    let chkG = document.createElement("input");
    chkG.type = "checkbox";
    chkG.id = "g" + nom + j;
    chkG.className = "garniture" + nom;
    chkG.value = gName;

    let lblG = document.createElement("label");
    lblG.textContent = " " + gName + " ";
    lblG.setAttribute("for", "g" + nom + j);

    p2.appendChild(chkG);
    p2.appendChild(lblG);
  }
  fieldset.appendChild(p2);
  formPizza.appendChild(fieldset);
}

// --- 2. MODE DE PAIEMENT (Boutons Radio) ---
let fsPaye = document.createElement("fieldset");
let legPaye = document.createElement("legend");
legPaye.textContent = "Mode de paiement :";
fsPaye.appendChild(legPaye);

let modes = [
  { txt: "Carte de Crédit (En ligne)", val: "enLigne" },
  { txt: "Débit/Crédit (À la porte)", val: "porteCard" },
  { txt: "Espèces (À la porte)", val: "especes" }
];

for (let i = 0; i < modes.length; i++) {
  let rd = document.createElement("input");
  rd.type = "radio";
  rd.name = "modePaiement";
  rd.id = "pay" + i;
  rd.value = modes[i].val;
  
  let lbl = document.createElement("label");
  lbl.textContent = modes[i].txt;
  lbl.setAttribute("for", "pay" + i);
  
  fsPaye.appendChild(rd);
  fsPaye.appendChild(lbl);
  fsPaye.appendChild(document.createElement("br"));
}
formPizza.appendChild(fsPaye);

// --- 3. INFORMATIONS CLIENT ---
function creerChamp(parent, labelTxt, inputId, inputType = "text") {
  let p = document.createElement("p");
  let lbl = document.createElement("label");
  lbl.textContent = labelTxt + " : ";
  let inp = document.createElement("input");
  inp.type = inputType;
  inp.id = inputId;
  p.appendChild(lbl);
  p.appendChild(inp);
  parent.appendChild(p);
}

let fsClient = document.createElement("fieldset");
let legClient = document.createElement("legend");
legClient.textContent = "Informations sur le client :";
fsClient.appendChild(legClient);
creerChamp(fsClient, "Nom", "nomClient");
creerChamp(fsClient, "Prénom", "prenomClient");
creerChamp(fsClient, "Téléphone", "telClient", "tel");
creerChamp(fsClient, "Adresse complète", "adrClient");
formPizza.appendChild(fsClient);

// --- 4. INFORMATIONS LIVRAISON ---
let fsLivraison = document.createElement("fieldset");
let legLivraison = document.createElement("legend");
legLivraison.textContent = "Informations sur la livraison :";
fsLivraison.appendChild(legLivraison);
creerChamp(fsLivraison, "Nom et prénom", "nomLivraison");
creerChamp(fsLivraison, "Téléphone", "telLivraison", "tel");
creerChamp(fsLivraison, "Adresse de livraison", "adrLivraison");
formPizza.appendChild(fsLivraison);

// --- 5. BOUTON COMMANDER ---
let btnCommander = document.createElement("button");
btnCommander.textContent = "Commander";
btnCommander.type = "button";
formPizza.appendChild(btnCommander);

// Zone pour la facture
let zoneFacture = document.createElement("div");
zoneFacture.id = "zoneFacture";
formPizza.appendChild(zoneFacture);

// --- LOGIQUE JAVASCRIPT ---

btnCommander.onclick = function() {
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
    if (document.getElementById("chk" + nomsPizzas[i]).checked) {
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
  for (let r of radios) {
    if (r.checked) {
      modeChoisiAvant = r.value;
    }
  }
  if (modeChoisiAvant == "") {
    alert("Veuillez choisir un mode de paiement !");
    return;
  }

  // Désactiver le bouton commander pour éviter de recommencer
  btnCommander.disabled = true;

  // Génération de la facture (Tableau HTML)
  zoneFacture.innerHTML = "<h2>Facture</h2>";
  let table = document.createElement("table");
  table.border = "1";
  table.innerHTML = "<tr><th>Item</th><th>Prix Unitaire</th><th>Quantité</th><th>Total</th></tr>";
  
  let grandTotal = 0;
  let prixPizza = 15;
  let prixGarniture = 2;

  for (let i = 0; i < nomsPizzas.length; i++) {
    let nom = nomsPizzas[i];
    if (document.getElementById("chk" + nom).checked) {
      let qte = parseInt(document.getElementById("qte" + nom).value);
      let totalP = qte * prixPizza;
      grandTotal += totalP;
      
      let row = table.insertRow();
      row.innerHTML = "<td>Pizza " + nom + "</td><td>" + prixPizza + "$</td><td>" + qte + "</td><td>" + totalP + "$</td>";
      
      // Garnitures cochées pour cette pizza
      let gs = document.getElementsByClassName("garniture" + nom);
      for (let j = 0; j < gs.length; j++) {
        if (gs[j].checked) {
          let totalG = qte * prixGarniture;
          grandTotal += totalG;
          let rowG = table.insertRow();
          rowG.innerHTML = "<td> - " + gs[j].value + "</td><td>" + prixGarniture + "$</td><td>" + qte + "</td><td>" + totalG + "$</td>";
        }
      }
    }
  }

  zoneFacture.appendChild(table);
  let pTotal = document.createElement("p");
  pTotal.innerHTML = "<strong>Montant total : " + grandTotal + "$</strong>";
  zoneFacture.appendChild(pTotal);

  // Apparition dynamique du bouton Payer
  let btnPayer = document.createElement("button");
  btnPayer.textContent = "Payer ma commande";
  zoneFacture.appendChild(btnPayer);

  btnPayer.onclick = function() {
    // Désactiver le bouton payer pour éviter de répéter le paiement
    btnPayer.disabled = true;

    let modeChoisi = "";
    for (let r of radios) {
      if (r.checked) {
        modeChoisi = r.value;
      }
    }

    if (modeChoisi === "enLigne") {
      // Interface de paiement fictive
      let interfacePay = document.createElement("div");
      interfacePay.style.border = "2px solid red";
      interfacePay.style.padding = "10px";
      interfacePay.innerHTML = "<h3>Paiement Sécurisé</h3>";
      creerChamp(interfacePay, "Numéro de carte", "cardNum");
      creerChamp(interfacePay, "Date expiration", "cardDate");

      let btnFinal = document.createElement("button");
      btnFinal.textContent = "Confirmer le paiement de " + grandTotal + "$";

      btnFinal.onclick = function() {
        // Désactiver le bouton confirmer pour éviter de confirmer deux fois
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