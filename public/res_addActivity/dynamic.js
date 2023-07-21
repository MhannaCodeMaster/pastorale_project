var table = document.getElementById("main-table")
var delButton = document.getElementsByClassName("del-icon")
let datarows = document.getElementsByClassName("data-row")
let dateInput = document.getElementById("date-input")
let titleInput = document.getElementById("title-input")
let submit = document.getElementById("submit-btn")



function addNewRow() {
    var datarows = document.getElementsByClassName("data-row")
    let tr = document.createElement("tr")
    let id = Number(datarows.length) + 1
    tr.id = id
    document.getElementById("form-meta").value = id
    tr.classList.add("data-row")
    tr.innerHTML = `
    <td class="id-td"> ${id} </td>
    <td><input type="text" name="descriptionpost" maxlength="254" class="description" oninput="checkForm()"></td>
    <td><input id="debit-${id}" type="number" name="debitpost" placeholder="L.L" oninput="greyInputs(), checkForm()"  class="notFaded debit"></td>
    <td><input id="credit-${id}" type="number" name="creditpost" placeholder="L.L" oninput="greyInputs(), checkForm()"  class="notFaded credit"></td>
    <td><input type="text" name="commentpost" maxlength="254"></td>
    <td><i class="fa-solid fa-trash del-icon" id="${id}" onclick="removeRow(this), checkForm()"></i></td>`

    table.appendChild(tr)

}

function updateIDs() {
    var idtds = document.getElementsByClassName("id-td")

    for (let i = 0; i < delButton.length; i++) {
        for (let i = 0; i < idtds.length; i++) {
            idtds[i].innerText = i + 1
        }
        document.getElementById("form-meta").value = idtds.length
    }
}

function removeRow(e) {
    for (let i = 0; i < datarows.length; i++) {
        if (datarows[i].id == e.id) {
            datarows[i].remove()
        }
    }
    updateIDs()
}

function greyInputs(){
    for(let i=0; i<datarows.length; i++){
        console.log(document.getElementById(`credit-${i+1}`).value)
        if(document.getElementById(`credit-${i+1}`).value != ""){
            document.getElementById(`debit-${i+1}`).value = ""
            document.getElementById(`debit-${i+1}`).classList.replace("notFaded", "faded")
        } else {
            document.getElementById(`debit-${i+1}`).classList.replace("faded", "notFaded")

        }
        if(document.getElementById(`debit-${i+1}`).value != 0){
            document.getElementById(`credit-${i+1}`).value = ""
            document.getElementById(`credit-${i+1}`).classList.replace("notFaded", "faded")
        } else {
            document.getElementById(`credit-${i+1}`).classList.replace("faded", "notFaded")
        }
    }
}

function checkForm(){
    let debit = document.getElementsByClassName("debit")
    let credit = document.getElementsByClassName("credit")
    let description = document.getElementsByClassName("description")

    if(dateInput.value == "" || titleInput.value == ""){
        console.log("bad title or date")
        submit.classList.replace("notFaded", "faded")
        return
    }

    for(let i=0; i<description.length; i++){
        if(!description[i].value){
            console.log("bad desc")
            submit.classList.replace("notFaded", "faded")
            return
        }
    }

    for(let i=0; i<debit.length; i++){
        if(debit[i].value == "" && credit[i].value == ""){
            console.log(debit[i].value)
            console.log(credit[i].value)
            console.log("bad debit and credit")
            submit.classList.replace("notFaded", "faded")
            return
        }
    }

    submit.classList.replace("faded", "notFaded")

}

checkForm()