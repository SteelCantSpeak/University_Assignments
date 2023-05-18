loginElement = document.getElementById("login");
createElement = document.getElementById("createAccount");

loginElement.addEventListener("click", attemptLogin);
createElement.addEventListener("click", newAccount);

async function GetLoginValues(){
    const dict = {}
    dict["username"] = await document.getElementById("uName").value;
    dict["password"] = await document.getElementById("pWord").value;
    console.log(dict["password"]);
    return dict;
}

async function attemptLogin(){
    await console.log("BBB");
//get the Input Values
//See if there's an account by that name
//If there is, check to see if the password matches
}

async function newAccount(){
    console.log("AAA");
    //Get the Input Values
    const login = await GetLoginValues();
    //Insert new values

    clientData = {
        "username": login["username"],
        "password": login["password"]
    }

    fetch(`/user/${login["username"]}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(clientData)
        }).then(response => response.json())
        
}