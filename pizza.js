let formPizza = document.getElementById("formPizza");

let titre = document.createElement("h1");
titre.textContent = "Commande de pizza";
formPizza.appendChild(titre);

let pizzas = {
  Pepperoni: ["Fromage", "Champignons", "Oignons"],
  Margherita: ["Fromage", "Tomates", "Oignons"],
  Végétarienne: ["Tomates", "Salade", "Poivrons"],
  Siciliene: ["Fromage", "Olives", "Herbes"],
};

Object.keys(pizzas).forEach((pizza) => {
  // Fieldset par pizza
  let fieldset = document.createElement("fieldset");

  let legend = document.createElement("legend");
  legend.textContent = "Pizza " + pizza + " :";
  fieldset.appendChild(legend);

  // Ligne 1 : checkbox pizza + label + quantité
  let ligne1 = document.createElement("div");

  let check = document.createElement("input");
  check.type = "checkbox";
  check.id = pizza;

  let label = document.createElement("label");
  label.htmlFor = pizza;
  label.textContent = " " + pizza + " Quantité : ";

  let quantite = document.createElement("input");
  quantite.type = "number";
  quantite.min = 0;
  quantite.max = 50;
  quantite.value = 0;
  quantite.id = "quantite" + pizza;

  ligne1.appendChild(check);
  ligne1.appendChild(label);
  ligne1.appendChild(quantite);
  fieldset.appendChild(ligne1);

  // Ligne 2 : garnitures
  let ligne2 = document.createElement("div");

  let labelGarnitures = document.createElement("label");
  labelGarnitures.textContent = "Garnitures : ";
  ligne2.appendChild(labelGarnitures);

  pizzas[pizza].forEach((garniture) => {
    let garniture = document.createElement("input");
    garniture.type = "checkbox";
    garniture.id = pizza + " " + garniture;
    garniture.value = garniture;

    let garniturelabel = document.createElement("label");
    garniturelabel.htmlFor = pizza + " " + garniture;
    garniturelabel.textContent = " " + garniture + " ";

    ligne2.appendChild(garniture);
    ligne2.appendChild(garniturelabel);
  });

  fieldset.appendChild(ligne2);
  formPizza.appendChild(fieldset);
});
