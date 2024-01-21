const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
for (let select of dropdowns) {

    for (code in countryList) {

        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        select.append(newOption);
        if (select.name === "from" && code === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && code === "INR") {
            newOption.selected = "selected";
        }

    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let code = element.value;
    let countrycode = countryList[code];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;//to read the country code
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}


const updateExchange = async () => {
    let amount = document.querySelector(".amount input");
    let amtvalue = amount.value;
    if (amtvalue === "" || amtvalue < 1) {
        amount.value = 1;
        amtvalue = 1;
    }
    // console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();// json() method for getting the data 
    // console.log(data);
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = amtvalue * rate;
    msg.innerText = `${amtvalue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

btn.addEventListener("click", (event) => {
    event.preventDefault();//to prevent the auto updation on clicking the button as new page is opening on clicking the button
    updateExchange();
});

window.addEventListener("load", () => {
    updateExchange();
})