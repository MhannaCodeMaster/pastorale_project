let inp1 = document.getElementById("name_currency")
let inp2 = document.getElementById("symbol_currency")
let inp3 = document.getElementById("precisionindex")
let example = document.getElementById("example")
let submit = document.getElementsByClassName("submit-btn")[0]

function checkForm() {
    if (inp1.value != "" && inp2.value != "" && inp3.value != "" && inp3.value >= 0 && inp3.value <= 7) {
        submit.classList.replace("faded", "notFaded")
    } else {
        submit.classList.replace("notFaded", "faded")
    }
}

function updateExample(){
    let value = inp3.value
    if(inp1.value != "" && inp2.value != "" && inp3.value != ""){
        if(value >= 7){
            value = 7
            inp3.value = 7
            checkForm()
        }
        example.innerText = String("Example: " + inp2.value + " " + String(Number(1.01234567).toFixed(value)))
    }
}