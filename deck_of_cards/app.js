const BASEURL = "https://deckofcardsapi.com/api/deck";
let global_deck_id;

async function set_deck() {
  let deck = await axios.get(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  return deck;
}

async function getCard(deck_id) {
  let card = await axios.get(`${BASEURL}/${deck_id}/draw/?count=1`);
  return card;
}

async function extract_card_info(deck_id) {
  let card = await getCard(deck_id);
  console.log(card.data.remaining);
  if (card.data.remaining === 0) {
    alert("Last card in the deck!");
    let button = document.querySelector("button");
    button.parentNode.removeChild(button);
  }
  return card.data.cards[0];
}

function render_img(src, alt) {

  let image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  return image;
}

function element_and_text(element, text) {

  let el = document.createElement(element);
  el.innerText = text;
  return el;
}

async function render_card(deck_id) {
  let card = await extract_card_info(deck_id);
  let card_label = document.querySelector("#card-label");
  card_label.innerText = `${card.value} of ${card.suit}`;
  let image = render_img(card.image);
  let container = document.querySelector("#cards-container");
  container.appendChild(image);
}


let button = document.querySelector("button");
button.addEventListener("click", () => {
  render_card(global_deck_id);
});

set_deck().then((deck) => {
  global_deck_id = deck.data.deck_id;
  return;
});