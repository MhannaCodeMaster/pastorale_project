let inp1 = document.getElementById("name_type")
let inp2 = document.getElementById("gain")
let inp3 = document.getElementById("hasTo")
let inp4 = document.getElementById("hasFrom")
let example = document.getElementById("example")
let submit = document.getElementsByClassName("submit-btn")[0]

function checkForm() {
    console.log("sda")
    if (inp1.value != "" && inp2.value != "" && inp3.value != "" && inp4.value != "") {
        submit.classList.replace("faded", "notFaded")
    } else {
        submit.classList.replace("notFaded", "faded")
    }
}