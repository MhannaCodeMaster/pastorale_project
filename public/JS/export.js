function checkDate(startId, endId) {
    var startDate = document.getElementById(startId).value;
    var endDate = document.getElementById(endId).value;

    if (startDate && !endDate) {
      alert('Please enter the end date');
      return false;
    }

    if (!startDate && endDate) {
      alert('Please enter the start date');
      return false;
    }

    if (startDate && endDate && startDate > endDate) {
      alert('Start date must be before end date');
      return false;
    }

    return true;
  }