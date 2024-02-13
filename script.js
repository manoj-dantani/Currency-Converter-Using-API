
const BASEURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let amtVal = document.getElementById("amtVal");
let dropdownVal = document.querySelectorAll("select");
let result = document.querySelector(".result-container p");
let btngetRate = document.querySelector("button");

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
    });
}

const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let imgSrc = element.parentElement.querySelector("img");
    imgSrc.src = `https://flagsapi.com/${countryCode}/shiny/64.png`;g
};

const getData = async () => {

    let URL = `${BASEURL}/${val1.value}/${val2.value}.json`;
    let response = await fetch(URL);
    console.log(response.status); 
    let data = await response.json();
    console.log(data);

};

btngetRate.addEventListener("click",getData);