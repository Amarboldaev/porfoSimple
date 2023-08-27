//var pass = 'password';
var videoUrl = '';

$(document).ready(function() {
    let passwordForm = document.getElementById("passwordForm");
    passwordForm.addEventListener("submit", (e) => {
        e.preventDefault();
        validateEmail(document.getElementById("sipassword").value);
    });
});

function validateEmail(emailAddress) {
    
    // Get the email input value
    var email = emailAddress;
    console.log(email)
    // Regular expression for a simple email validation
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
    // Check if the email matches the regular expression
    if (!emailRegex.test(email)) {
        showErrorEmail()
    }else{
        emailSendRequest(emailAddress);
    }
}

function emailSendRequest(password)
{
    requestData = {
        "email": password
    }

    $.ajax({
		type : "POST",
		url : "https://bodyguard.avast.com/v1/web/email/one-time-check",
        type: "POST",
        data: JSON.stringify(requestData), // Convert the data to a JSON string
        contentType: "application/json", // Set the content type header
        dataType: "json", // Expect JSON response
        success: function (responseData) {
            // Handle the successful response here
            // console.log(responseData);
            checkEmail(responseData);
        },
        error: function (error) {
            // Handle any errors that occurred during the request
            console.error(error);
            showFailed();
        }
	});
}

function showErrorEmail()
{
    document.getElementById("password-box").style.display = "none";
    document.getElementById("denied-box").style.display = "block";
    document.getElementById("you-have-not-been-hacked-box").style.display = "none";
    document.getElementById("you-have-been-hacked-box").style.display = "none";
    // document.getElementById("sipassword").value = '';
    setTimeout(revertToPassword, 2000);
}

function checkEmail(responseData)
{
    // console.log( "checkEmailFunction: " + responseData.status)
    document.getElementById("password-box").style.display = "none";
    document.getElementById("granted-box").style.display = "block";
    document.getElementById("you-have-not-been-hacked-box").style.display = "none";
    document.getElementById("you-have-been-hacked-box").style.display = "none";
    setTimeout(showChecking(responseData), 1800);
}


function showChecking(responseData)
{
    
    document.getElementById("granted-box").style.display = "none";
    document.getElementById("accessing-box").style.display = "block";
    document.getElementById("you-have-not-been-hacked-box").style.display = "none";
    document.getElementById("you-have-been-hacked-box").style.display = "none";
    startProgressBar(responseData); // Wait for 1 second
}

function showFailed()
{
    document.getElementById("password-box").style.display = "none";
    document.getElementById("denied-box").style.display = "block";
    document.getElementById("you-have-not-been-hacked-box").style.display = "none";
    document.getElementById("you-have-been-hacked-box").style.display = "none";
    document.getElementById("sipassword").value = '';
    setTimeout(revertToPassword, 2000);
}

function revertToPassword()
{
    document.getElementById("denied-box").style.display = "none";
    document.getElementById("password-box").style.display = "block";
    document.getElementById("you-have-not-been-hacked-box").style.display = "none";
    document.getElementById("you-have-been-hacked-box").style.display = "none";
}

function showLoading(responseData)
{
    document.getElementById("password-box").style.display = "none";
    document.getElementById("accessing-box").style.display = "none";
    document.getElementById("you-have-not-been-hacked-box").style.display = "none";
    document.getElementById("you-have-been-hacked-box").style.display = "none";
    if(!responseData.value.leaks_found){
        document.getElementById("you-have-not-been-hacked-box").style.display = "block";
        console.log("Tanii mail hackduulj bgagui bn")
    } else {
        document.getElementById("you-have-been-hacked-box").style.display = "block";
        console.log("Ta hackduulsan bn")
    }
    // if (responseData)
    // document.getElementById("video-box").style.display = "block";
    // setTimeout(playVideo, 1500);
}

function startProgressBar(responseData) 
{
    var a = 0;
    if (a == 0) 
    {
        a++;
        var width = 1;
        var pg = document.getElementById("progressBar");
        var interval = setInterval(increasePercentage, 30);

        function increasePercentage() 
        {
            if (width >= 100) 
            {
                clearInterval(interval);
                setTimeout(showLoading(responseData), 500);
            } 
            else 
            {
                width++;
                pg.style.width = width + "%";
                $("#accessing-loading-percentage").html(width  + "%");
            }
        }
    }
}