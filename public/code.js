var radioBtn1 =document.getElementById('rent');
var form1=document.getElementById('myform1');
radioBtn1.addEventListener('click',function(){
  if(this.checked){
    form1.style.display='block'
  }else{
    form1.style.display='none'
  }
})
var radioBtn2 =document.getElementById('owner');
var form1=document.getElementById('myform1');
radioBtn2.addEventListener('click',function(){
  if(this.checked){
    form1.style.display='none'
  }else{
    form1.style.display='block'
  }
})
var radioBtn3 =document.getElementById('job');
var form2=document.getElementById('myform2');
radioBtn3.addEventListener('click',function(){
  if(this.checked){
    form2.style.display='block'
  }else{
    form2.style.display='none'
  }
})
var radioBtn4 =document.getElementById('no job');
var form2=document.getElementById('myform2');
radioBtn4.addEventListener('click',function(){
  if(this.checked){
    form2.style.display='none'
  }else{
    form2.style.display='block'
  }
})
var radioBtn5 =document.getElementById('other');
var form2=document.getElementById('myform2');
radioBtn5.addEventListener('click',function(){
  if(this.checked){
    form2.style.display='none'
  }else{
    form2.style.display='block'
  }
})
var checkbox =document.getElementById('checks');
var table=document.getElementById('mytable');
checkbox.addEventListener('click',function(){
  if(this.checked){
    table.style.display='none'
  }else{
    table.style.display='block'
  }
})
var checks =document.getElementById('divorced');
var joint=document.getElementById('joint');
checks.addEventListener('click',function(){
  if(this.checked){
    joint.style.display='none'
  }else{
    joint.style.display='block'
  }
})

function addRow() {
  var table = document.getElementById("mytable");
  var row = document.getElementById("row1");
  var newRow = table.insertRow(-1); // Insert a new row at the end of the table

  for (var i = 0; i < row.cells.length; i++) {
    var cell = row.cells[i];
    var newCell = newRow.insertCell(i); // Insert a new cell at the specified index in the new row
    newCell.innerHTML = cell.innerHTML; // Copy the content of the corresponding cell from the original row
  }
}
var checkbox1 =document.getElementById('checks1');
var table1=document.getElementById('mytable1');
checkbox1.addEventListener('click',function(){
  if(this.checked){
    table1.style.display='none'
  }else{
    table1.style.display='block'
  }
})
var checkbox2 =document.getElementById('checks3');
var table2=document.getElementById('mytable3');
checkbox2.addEventListener('click',function(){
  if(this.checked){
    table2.style.display='none'
  }else{
    table2.style.display='block'
  }
})

function addRow1() {
  var table1 = document.getElementById("mytable1");
  var row1 = document.getElementById("row2");
  var newRow = table1.insertRow(-1); // Insert a new row at the end of the table

  for (var i = 0; i < row1.cells.length; i++) {
    var cell = row1.cells[i];
    var newCell = newRow.insertCell(i); // Insert a new cell at the specified index in the new row
    newCell.innerHTML = cell.innerHTML; // Copy the content of the corresponding cell from the original row
  }
}
const form5=document.getElementById('myform4');
const profesional_status1 = document.getElementsByName('profesional_status1');
const handleRecipientTypeChange = () => {
  const selectedProfesionalStatusType = document.querySelector('input[name="profesional_status1"]:checked').value;
  if (selectedProfesionalStatusType === 'job') {
    form5.style.display = 'none';
  } else {
    form5.style.display = 'block';
  }
};

    // Add event listener to the parent container of radio buttons
document.addEventListener('change', (event) => {
  if (event.target.name === 'profesional_status1') {
        handleRecipientTypeChange();
  }
})

