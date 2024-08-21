
const BASEURL = "https://latest.currency-api.pages.dev/v1/currencies";

let amtVal = document.querySelector("input");
let dropdownVal = document.querySelectorAll("select");
let result = document.querySelector(".result-container p");
let fromCurrency = document.querySelector(".country1 select");
let toCurrency = document.querySelector(".country2 select");
let btngetRate = document.querySelector("button");
result.style.fontSize = "17px";
result.style.fontWeight = "700"; 

amtVal.value = 100;

for(let option of dropdownVal){
    for(let currencyCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        if(option.name === "from" && currencyCode === "CAD"){
            newOption.selected = "selected";
        }else if(option.name === "to" && currencyCode === "INR"){
            newOption.selected = "selected";
        }
        option.append(newOption);
    }
    option.addEventListener("change", (evt) => {
        updateFlag(evt.target);
        getData(evt.target);
    });
}

const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let imgSrc = element.parentElement.querySelector("img");
    imgSrc.src = `https://flagsapi.com/${countryCode}/shiny/64.png`;
};

const getData = async () => {
    if(amtVal.value === "" || amtVal.value < 1){
        amtVal.value = 1;
    }

    let URL = `${BASEURL}/${fromCurrency.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    result.innerText = `${amtVal.value} ${fromCurrency.value} = ${rate.toFixed(2)*amtVal.value} ${toCurrency.value} as ${data.date}`;
};

btngetRate.addEventListener("click",getData);
window.addEventListener("load",getData);