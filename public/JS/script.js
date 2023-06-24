function dark() {
    const body = document.querySelector('body');
    body.classList.toggle('dark-mode');
}

function light() {
  const body = document.querySelector('body');
  body.classList.toggle('light-mode');
}
function togglePassword(pass_id, text_id){
  const passwordInput = document.getElementById(pass_id);
  const text = document.getElementById(text_id);
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    text.innerText = 'Hide password'
  } else {
    passwordInput.type = 'password';
    text.innerText = 'See password'
  }
}


