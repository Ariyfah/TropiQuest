console.log(`WELCOME TO TROPIQUEST!!!`);
//START SCREEN BUTTONS
const loginBtn = document.getElementById("LogInbtn");
const signupBtn = document.getElementById("SignUpbtn");

if(loginBtn){
    loginBtn.addEventListener("click",function(){
        window.location.href="login.html";
    });
}

if (signupBtn){
    signupBtn.addEventListener("click",function(){
        window.location.href="signup.html";
    });
}

//SIGNUP FUNCTION
const signupForm= document.getElementById("signupForm");
console.log("Signup form:",signupForm);

if(signupForm){
    signupForm.addEventListener("submit",function(event){
        event.preventDefault();

        const username=document.getElementById("signupUsername").value.trim();
        const password=document.getElementById("signupPassword").value;
        const confirmPassword=document.getElementById("confirmPassword").value;

        const message=document.getElementById("signupMessage");

        //Check password confirmation 
        if (password !== confirmPassword){
            message.textContent="Passwords do not match!";
            message.style.color="red";
            return;
        }

        //Get existing accounts
        let accounts=JSON.parse(localStorage.getItem("tropiquestAccounts")) || [];

        //Check existing username
        const existingUser = accounts.find(function(account){
            return account.username.toLowerCase() === username.toLowerCase();
        });

        if(existingUser){
            message.textContent="User already exist";
            message.style.color="red";
            return;
        }

        //Save new account
        const newAccount={
            username:username,
            password:password,
            coins:500
        };

        accounts.push(newAccount);
        localStorage.setItem("tropiquestAccounts",JSON.stringify(accounts));

        message.textContent="Account created successfully!";
        message.style.color="green";

        //Go to login page
        setTimeout(function(){
            window.location.href="login.html";
        },1500);
    });
}

//LOGIN FUNCTION

const loginForm= document.getElementById("loginForm");

if (loginForm){
    loginForm.addEventListener("submit",function(event){
        event.preventDefault();
        const username=document.getElementById("loginUsername").value.trim();
        const password=document.getElementById("loginPassword").value;

        const message=document.getElementById("loginMessage");

        //get registered accounts
        let accounts=JSON.parse(localStorage.getItem("tropiquestAccounts"))||[];

        //Find matching accounts and password
        const currentUser=accounts.find(function(account){
            return account.username.toLowerCase()===username.toLowerCase() && account.password===password;
        });

        //Check login details
        if(currentUser){
            //Save currently logged-in player
            localStorage.setItem("tropiquestCurrentUser",currentUser.username);

            message.textContent="Login successful! Welcome back!";
            message.style.color="green";

            //Go to Map page
            setTimeout(function(){
                window.location.href="island.html";
            },1000);

        }else{
            message.textContent="Incorrect username or password!";
            message.style.color="red";
        }
    });
}