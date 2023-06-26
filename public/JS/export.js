const startDate = document.getElementById('from_date')
const endDate = document.getElementById('to_date')

  startDate.addEventListener('input', checkDate)
  endDate.addEventListener('input', checkDate)

function checkDate(event) {
    var sDate = startDate.value;
    var eDate = endDate.value;

    if (sDate && eDate && sDate > eDate) {
      alert('Start date must be before end date');
      event.target.value = ''
      return false;
    }

    return true;
  }

  