var table = document.getElementById("main-table")
var delButton = document.getElementsByClassName("del-icon")
let personNameInput = document.getElementById("personNameInput")
let datarows = document.getElementsByClassName("data-row")
let submit = document.getElementById("submit-btn")
const data = JSON.parse(document.getElementById("hidden-data").innerText)

document.getElementById("form-meta").value = Number(datarows.length)

function addNewRow() {
    var datarows = document.getElementsByClassName("data-row")

    let tr = document.createElement("tr")
    let id = Number(datarows.length) + 1
    tr.id = id
    document.getElementById("form-meta").value = id
    tr.classList.add("data-row")

    let sourceArray = ""
    for (let i = 0; i < data.sourceCodes.length; i++) {
        sourceArray += `<option value=${data.sourceCodes[i].sourceCode}> ${data.sourceCodes[i].sourceName}</option>`
    }

    let medicationArray = ""
    for (let i = 0; i < data.medications.length; i++) {
        medicationArray += `<option value=${data.medications[i].id_medicine}> ${data.medications[i].description_medicine}</option>`
    }

    tr.innerHTML = `
    
        <tr class="data-row" id="${id}">

            <td class="id-td">
                <%=j+1%>
            </td>


            <td><select name="medicationpost" class="table-select medicine" onchange="checkForm()">
                        <option></option>
                        ${medicationArray}
                        </select>
            </td>



            <td><select name="sourcepost" class="table-select source" onchange="checkForm()">
                
                        <option selected></option>
                        ${sourceArray}
                        </select>
            </td>


            <td>
                <input type="number" name="pricepost" placeholder="L.L" class="table-input price" min="0" oninput="checkForm()">
            </td>

            <td>
                <input type="text" name="commentpost" maxlength="254" class="table-input">
            </td>

            <td><i class="fa-solid fa-trash del-icon" id="${id}" onclick="removeRow(this), checkForm()""></i></td>`

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

function newRedirect() {
    window.location.replace(`/api/medicine/addMedicationReceipt/?patientid=${personNameInput.value}`)
}

function removeRow(e) {
    let datarows = document.getElementsByClassName("data-row")
    for (let i = 0; i < datarows.length; i++) {
        if (datarows[i].id == e.id) {
            datarows[i].remove()
        }
    }
    updateIDs()
}

function checkForm(){
    let medicine = document.getElementsByClassName("medicine")
    let prices = document.getElementsByClassName("price")
    let sources = document.getElementsByClassName("source")

    if(!personNameInput){
        submit.classList.replace("notFaded", "faded")
        return
    }

    for(let i=0; i<medicine.length; i++){
        if(!medicine[i].value){
            submit.classList.replace("notFaded", "faded")
            return
        }
    }
    for(let i=0; i<prices.length; i++){
        console.log(prices[i].value)
        if(prices[i].value == ""){
            submit.classList.replace("notFaded", "faded")
            return
        }
        
    }
    for(let i=0; i<sources.length; i++){
        if(!sources[i].value){
            submit.classList.replace("notFaded", "faded")
            return
        }
    }

    submit.classList.replace("faded", "notFaded")

}