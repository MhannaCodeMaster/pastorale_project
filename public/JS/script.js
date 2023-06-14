function light() {
    const body = document.querySelector('body');
    body.classList.toggle('dark-mode');
}

function light() {
  const body = document.querySelector('body');
  body.classList.toggle('light-mode');
}

const checkboxes = document.querySelectorAll('.checkbox-control');
const triggeringCheckbox = document.getElementById('checkAll');
triggeringCheckbox.addEventListener('change', function () {
  const isChecked = this.checked;

  // Loop through all checkboxes and set their checked state
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = isChecked;
  });
});