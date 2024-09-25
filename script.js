
const BASEURL = "https://latest.currency-api.pages.dev/v1/currencies";

let amtVal = document.querySelector("input");
let dropdownVal = document.querySelectorAll("select");
let result = document.querySelector(".result-container p");
let fromCurrency = document.getElementById("from");
let toCurrency = document.getElementById("to");
let btngetRate = document.querySelector("button");
let option = document.querySelector("option");
let exchangeCountry = document.querySelector(".exchangeIcon");


amtVal.style.fontSize = "20px";

for(let option of dropdownVal){
    for(let currencyCode in countryCodeName){
        let newOption = document.createElement("option");
        newOption.innerText = `${currencyCode} - ${countryCodeName[currencyCode]}`;
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


let currSymbols = currencySymbols[fromCurrency.value];
amtVal.value = `${currSymbols} 100`;


const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let imgSrc = element.parentElement.querySelector("img");
    imgSrc.src = `https://flagsapi.com/${countryCode}/shiny/64.png`;    
};


const getData = async () => {

    let numericValue;
    
    if(amtVal.value){
        numericValue = parseFloat(amtVal.value.replace(/[^\d.-]/g, ''));
    }
    else{
        amtVal.value = `${currSymbols} 100`;
        
        let currSymbols = currencySymbols[fromCurrency.value];
        numericValue = parseFloat(amtVal.value.replace(/[^\d.-]/g, ''));     
    }
    
    let URL = `${BASEURL}/${fromCurrency.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    let convertedRate = rate.toFixed(2)*numericValue;
    
    let currencyValue = document.querySelector(".result-container h3");
    let convertedValue = document.querySelector(".result-container h2");
    currencyValue.innerText = `${numericValue} ${fromCurrency.value} =`;
    convertedValue.innerText = `${convertedRate.toFixed(2)} ${countryCodeName[toCurrency.value]}'s`;
    
    result.innerText = `${numericValue} ${fromCurrency.value} = ${convertedRate.toFixed(2)} ${toCurrency.value} as on ${data.date}`;     
    
};

btngetRate.addEventListener("click", getData);
exchangeCountry.addEventListener("click", getData);
window.addEventListener("load", getData);
