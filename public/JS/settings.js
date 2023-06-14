function checkNewUserPassword(){
    const error_message = document.getElementById('password_error');
    const create_pass = document.getElementById('create_pass').value;
    const confirm_pass = document.getElementById('confirm_pass').value;
    if(create_pass !== confirm_pass){
        const message = 'Passwords do not match!';
        error_message.style = "display:block";
        error_message.textContent = message;
        confirm_pass.value = '';
        return false;
    }
    error_message.style = "display:none";
    return true;
}

/*-----Handeling usename input in section account------*/
const change_username = document.getElementById('change_username');
const save_username = document.getElementById('save_username');
const cancel_username = document.getElementById('cancel_username');
const username_input = document.getElementById('username');
/*---Listener for username change button---*/
change_username.addEventListener('click', function(event) {
    username_input.disabled = false;
    username_input.focus();
    save_username.style='display:block';
    cancel_username.style='display:block';
    change_username.style='display:none';
});
cancel_username.addEventListener('click', function(event) {
    username_input.disabled = true;
    save_username.style='display:none';
    cancel_username.style = 'display:none';
    change_username.style='display:block';
});

/*-----Handeling email input in section account------*/
const change_email = document.getElementById('change_email');
const save_email = document.getElementById('save_email');
const cancel_email = document.getElementById('cancel_email');
const email_input = document.getElementById('email');
/*---Listener for username change button---*/
change_email.addEventListener('click', function(event) {
    email_input.disabled = false;
    email_input.focus();
    save_email.style='display:block';
    cancel_email.style='display:block';
    change_email.style='display:none';

});
cancel_email.addEventListener('click', function(event) {
    email_input.disabled = true;
    save_email.style='display:none';
    cancel_email.style = 'display:none';
    change_email.style='display:block';
});

    
/*------Check password for section change password------*/
function checkChangedPassword(){
    const new_pass_error = document.getElementById('new_pass_error');
    const new_pass = document.getElementById('new_pass').value;
    const c_pass = document.getElementById('c_pass').value;
    if(new_pass !== c_pass){
        const message = 'Passwords do not match!';
        new_pass_error.style = "display:block";
        new_pass_error.textContent = message;
        c_pass.value = '';
        return false;
    }
    new_pass_error.style = "display:none";
    return true;
}

/*-----Re-directing the user to the error section------*/
const queryParams = new URLSearchParams(window.location.search);
// Retrieve the value of the 'section' parameter
const section = queryParams.get('section');
if(section){
    const sectionElement = document.getElementById(section);
    console.log(section);
    sectionElement.scrollIntoView({ behavior: 'smooth' });
}


