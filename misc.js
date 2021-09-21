// $$ CREATE HTML STRUCTURE FOR AN ALERT
function atcAlert() {
    let alertATC = document.createElement('div');
    alertATC.className = 'alertATC'
    document.querySelector('#alert_flexbox').prepend(alertATC);
  
    let spanATC = document.createElement('span');
    spanATC.textContent = "Добавено в количката"
    alertATC.appendChild(spanATC);
  
    // REMOVE HTML AFTER X MILLISECONDS
    setTimeout(function () {
      alertATC.parentNode.removeChild(alertATC);
    }, 3500);
  }