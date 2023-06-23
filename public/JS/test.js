let childCounter = 0;
const childrenFromToClone = document.getElementById("childrenFromToClone");
const addChildButton = document.getElementById("addChildButton");
const childrenForm = document.getElementById("childrenForm");

function generateChildId() {
    childCounter++;
    return `child${childCounter}`;
  }



const addNewChildForm = () =>{
    console.log('button clicked');
    const childId = generateChildId();
    const newChildFormLayout = childrenFromToClone.cloneNode(true);

    const inputField = newChildFormLayout.querySelector("input[name='childName']");
    const labelNameField = newChildFormLayout.querySelector("label[for='childName']");
    const childNumberTitle = newChildFormLayout.querySelector("h5");
    const healthTable = newChildFormLayout.querySelector("table[id = healthTable]");
    const healthRow = newChildFormLayout.querySelector("tr[id=healthRow]");
    const medicationField = newChildFormLayout.querySelector("select[name='medication[]']");
    const diseaseField = newChildFormLayout.querySelector("select[name='disease[]']");
    const startDate = newChildFormLayout.querySelector("input[name='startDate[]']");
    const endDate = newChildFormLayout.querySelector("input[name='endDate[]']");
    const toBuy = newChildFormLayout.querySelector("input[name='toBuy[]']");
    const comment = newChildFormLayout.querySelector("input[name='comment[]']");
    const addRowButton = newChildFormLayout.querySelector("button[class=addRowButton");
    const toggleTable = newChildFormLayout.querySelector("input[class=toggleTable");

    inputField.name = `${childId}_name`;
    inputField.id = childId;
    labelNameField.setAttribute("for", childId);
    labelNameField.innerText = childId
    childNumberTitle.innerText = "Child "+childCounter;
    healthTable.id= childId+"_healthTable";
    healthRow.id = childId+"_healthRow"
    medicationField.name = `${childId}_medication[]`;
    diseaseField.name = `${childId}_disease[]`;
    startDate.name = `${childId}_startDate[]`;
    endDate.name = `${childId}_endDate[]`;
    toBuy.name = `${childId}_toBuy[]`;
    comment.name = `${childId}_comment[]`;
    toggleTable.name = `${childId}_toggleTable[]`;
    addRowButton.setAttribute("data-child", `${childId}`);
    toggleTable.setAttribute("data-child", `${childId}`);

    newChildFormLayout.style.display = "block";
    childrenForm.appendChild(newChildFormLayout);
}

function addRowToTable(childId) {
//     const rowTemplate = `
//     <tr id="healthRow">
//     <td>
//         <select name="${childId}_disease[]">
//             <option value="disease1">disease1</option>
//             <option value="disease2">disease2</option>
//             <option value="disease3">disease3</option>
//             <option value="disease4">disease4</option>
//         </select>
//     </td>
//     <td>
//         <select name="${childId}_medication[]">
//             <option value="medication1">medication1</option>
//             <option value="medication2">medication2</option>
//             <option value="medication3">medication3</option>
//             <option value="medication4">medication4</option>
//         </select>
//     </td>
//     <td>
//         <input type="checkbox" name="${childId}_toBuy[]">
//     </td>
//     <td>
//         <input type="date" name="${childId}_startDate[]">
//     </td>
//     <td>
//         <input type="date" name="${childId}_endDate[]">
//     </td>
//     <td>
//         <input type="text" name="${childId}_comment[]">
//     </td>
// </tr>
//     `;
   
    const row = document.getElementById("healthRow")
    const rowTemplate=row.cloneNode(true)
    rowTemplate.id = `${childId}_healthRow`;
    console.log(rowTemplate)
    const disease=rowTemplate.querySelector("select[name='disease[]']")
    disease.name=`${childId}_disease`
    const medi=rowTemplate.querySelector("select[name='medication[]']")
    medi.name=`${childId}_medication[]`
    disease.name=`${childId}_medication[]`
    const startDate = rowTemplate.querySelector("input[name='startDate[]']");
    const endDate = rowTemplate.querySelector("input[name='endDate[]']");
    startDate.name = `${childId}_startDate[]`;
    endDate.name = `${childId}_endDate[]`;
    const toBuy = rowTemplate.querySelector("input[name='toBuy[]']");
    const comment = rowTemplate.querySelector("input[name='comment[]']");
    toBuy.name = `${childId}_toBuy[]`;
    comment.name = `${childId}_comment[]`;

    const table = document.getElementById(`${childId}_healthTable`);
    console.log(table);
    const tbody = table.querySelector("tbody");
    console.log(tbody);
    tbody.append(rowTemplate);
  }

// Event listener for adding a row in the health situation table
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("addRowButton")) {
      const childId = event.target.getAttribute("data-child");
      addRowToTable(childId);
    }
  });

document.addEventListener("change", (event) => {
    if (event.target.classList.contains("toggleTable")) {
        const childId = event.target.getAttribute("data-child");
        const table = document.getElementById(`${childId}_healthTable`);
        if(event.target.checked){
            table.style.display = "block";
        }else{
            table.style.display = "none";
        }
        
    }
})


addChildButton.addEventListener('click',addNewChildForm);