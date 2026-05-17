const BASE_URL =
"https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns =
document.querySelectorAll("select");

const btn =
document.querySelector("button");

const fromCurr =
document.querySelector(".from select");

const toCurr =
document.querySelector(".to select");

const msg =
document.querySelector(".msg");

const updatedTime =
document.querySelector(".updated-time");

const swapBtn =
document.querySelector(".swap-icon");

for (let select of dropdowns) {

  for (let currCode in countryList) {

    let newOption =
    document.createElement("option");

    newOption.innerText = currCode;

    newOption.value = currCode;

    if (
      select.name === "from" &&
      currCode === "USD"
    ) {
      newOption.selected = true;
    }

    else if (
      select.name === "to" &&
      currCode === "INR"
    ) {
      newOption.selected = true;
    }

    select.append(newOption);
  }

  select.addEventListener(
    "change",
    (evt) => {

      updateFlag(evt.target);

      updateExchangeRate();

    }
  );
}

const updateExchangeRate = async () => {

  let amount =
  document.querySelector(".amount input");

  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {

    amtVal = 1;

    amount.value = "1";
  }

  msg.innerText = "Loading...";

  const URL =
  `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

  try {

    let response =
    await fetch(URL);

    let data =
    await response.json();

    let rate =
    data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    if (!rate) {

      msg.innerText =
      "Conversion failed!";

      return;
    }

    let finalAmount =
    (amtVal * rate).toFixed(2);

    msg.innerText =
    `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

    const now =
    new Date();

    updatedTime.innerText =
    `Updated: ${now.toLocaleTimeString()}`;

  }

  catch (error) {

    console.log(error);

    msg.innerText =
    "API Error!";

  }

};

const updateFlag = (element) => {

  let currCode =
  element.value;

  let countryCode =
  countryList[currCode];

  let img =
  element.parentElement.querySelector("img");

  img.src =
  `https://flagsapi.com/${countryCode}/flat/64.png`;

};

swapBtn.addEventListener(
  "click",
  () => {

    let temp =
    fromCurr.value;

    fromCurr.value =
    toCurr.value;

    toCurr.value =
    temp;

    updateFlag(fromCurr);

    updateFlag(toCurr);

    updateExchangeRate();

  }
);

btn.addEventListener(
  "click",
  (evt) => {

    evt.preventDefault();

    updateExchangeRate();

  }
);

window.addEventListener(
  "load",
  () => {

    updateExchangeRate();

  }
);