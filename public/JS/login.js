function showForgotPasswordForm() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("forgotPasswordForm").style.display = "block";
  }

function sendEmail(){
  if(document.getElementById("floatingInput1"))
  document.getElementById("sendEmail").innerText = 'resend link';
}

function goBack(){
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("forgotPasswordForm").style.display = "none";
}

