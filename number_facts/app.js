const BASEURL = "http://numbersapi.com";

function element_and_text(element, text) {
  let el = document.createElement(element);
  el.innerText = text;
  return el;
}

let response = axios.get(`${BASEURL}/27..30?json`);
response
  .then((res) => {
    for (let v of Object.values(res.data)) {
      let li = element_and_text("li", v);
      let ul = document.querySelector("#number-facts");
      ul.appendChild(li);
    }
  })
  .catch((err) => console.log(err));

let factsAbout6 = [];
let ul = document.querySelector("#facts-about-6");
for (let i = 0; i < 4; i++) {
  factsAbout6.push(axios.get(`${BASEURL}/6?json`));
}

Promise.all(factsAbout6).then((factsArr) => {
  factsArr.forEach((fact) => {
    let li = element_and_text("li", fact.data.text);
    ul.appendChild(li);
  });
});