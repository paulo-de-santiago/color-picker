// @ts-nocheck
let mode = document.getElementById("color-selection");
const formColorScheme = document.querySelector("#color-selection");

const getColorBtn = document.getElementById("get-color");

/* Hex colors  */
const gridColors = document.getElementById("grid-colors");
/* console.log(gridColors); */

getColorBtn.addEventListener("click", function (e) {
  e.preventDefault();
  gridColors.innerHTML = "";
  const scheme = formColorScheme.options[formColorScheme.selectedIndex].value;
  console.log(scheme);

  fetch(`https://www.thecolorapi.com/scheme?hex=FF0&mode=${scheme}&count=5`)
    .then((response) => response.json())
    .then((scheme) => {
      let colorSchemesArray = {};

      const colorSchemes = scheme.colors;
      console.log(colorSchemes);

      colorSchemes.forEach(function (arrayItem) {
        let arrayHex = Object.values(arrayItem.hex);
        console.log(arrayHex[0]);
        gridColors.innerHTML += `<div class="grid-column" id="grid-column" >
        <div class="grid-column-color" id="grid-column-color" style="background-color:${arrayHex[0]}"></div>
    
        <h4 class="grid-column-hex" id="grid-column-hex">${arrayHex[0]}</h4>

      </div>`;
      });
    });
});

/*     function getOption() {
            selectElement = document.querySelector('#select1');
            output = selectElement.options[selectElement.selectedIndex].value;
            document.querySelector('.output').textContent = output;
        } */

/* Fetch schemes, populate form */
fetch("https://www.thecolorapi.com/scheme?hex=FF0&mode=monochrome&count=5")
  .then((response) => response.json())
  .then((color) => {
    /* ›["mode", "count", "colors", "seed", "image", "_links", "_embedded"] */

    let colorSchemes = color._links;

    for (let key in colorSchemes) {
      const schemeObject = colorSchemes[key];
      if (typeof schemeObject === "object") {
        for (let scheme in schemeObject) {
          mode.innerHTML += `<select name="color" class="color-selection" id="color-selection">
          <option value="${scheme}" id="${scheme}" >${scheme}</option>
        </select>`;
        }
      }
    }
  });
