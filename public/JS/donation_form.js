function toggleFamilyTable() {
    if (recipientTypeRadio[0].checked) {
      familyTable.style.display = 'block';
    } else {
      familyTable.style.display = 'none';
    }
  }

  // Add event listener to recipient type radio buttons
  for (let i = 0; i < recipientTypeRadio.length; i++) {
    recipientTypeRadio[i].addEventListener('change', toggleFamilyTable);
  }