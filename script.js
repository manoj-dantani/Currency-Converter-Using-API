
const BASEURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let val1=document.getElementById("val1");
let val2=document.getElementById("val2");
let btn=document.getElementById("btn_crt");
let result = document.getElementById("res");


const getData = async () => {

    let URL = `${BASEURL}/${val1.value}/${val2.value}.json`;
    let response = await fetch(URL);
    console.log(response.status); 
    let data = await response.json();
    console.log(data);

};

btn.addEventListener("click",getData);