/* ================================= 
    Interactive Form - Project 3
==================================== */

const nameInput = document.getElementById("name");
const otherJobRole = document.querySelector("#other-job-role");
const color = document.querySelector("#color");
const activitiesTotal = document.querySelector("#activities-cost");
const asteriskInputs = document.querySelectorAll(".asterisk + input");
const activitiesCheckboxList = document.querySelectorAll("#activities-box > label > input[type=checkbox]");
let x = 0;
//DOMContentLoad
//Set Focus on Name Input
nameInput.focus();
//Hide Other Input
otherJobRole.style.display = "none";
//Set Color Drop Down to Disabled
color.disabled = true;
//Credit Card By Default Set to true
document.querySelector("#payment > option:nth-child(2)").selected = true;

/* ================================= 
    "Job Role" section
==================================== */
document.querySelector("#title").addEventListener("change",function (event) {
    if (event.target.value === "other") {
        otherJobRole.style.display = "";
        otherJobRole.focus();
    }
}, false);

/* ================================= 
    "T-Shirt Info" section
==================================== */
document.querySelector("#design").addEventListener("input",function (event) {
        color.disabled = false;
        let js_puns_List = document.querySelectorAll("#color > [data-theme='js puns']");
        let heart_js_list = document.querySelectorAll("#color > [data-theme='heart js']");
        if (event.target.value === "js puns") {
            //Hide all heart js options
            for (let i = 0; i < heart_js_list.length; i++) {
                heart_js_list[i].style.display = "none";
            }
            for (let i = 0; i < js_puns_List.length; i++) {
                js_puns_List[i].style.display = "";
            }
        }
        if (event.target.value === "heart js") {
            //Hide all js puns options
            for (let i = 0; i < js_puns_List.length; i++) {
                js_puns_List[i].style.display = "none";
            }
            for (let i = 0; i < heart_js_list.length; i++) {
                heart_js_list[i].style.display = "";
            }
        }
    },
    false
);
/* ================================= 
    "Payment Info" section 
==================================== */
if (document.querySelector("#payment").selectedIndex == !0) {
    let credit_card = document.querySelector("#credit-card");
    let paypal = document.querySelector("#paypal");
    let bitcoin = document.querySelector("#bitcoin");
    //Default Display CreditCard; Hide Other DIVs
    paypal.style.display = "none";
    bitcoin.style.display = "none";
    
    document.querySelector("#payment").addEventListener("input",function (event) {
    //Display CreditCard or paypal or bitcoin
        function displayPay(creditCardDisplay, payPalDisplay, bitCoinDisplay){
                credit_card.style.display = creditCardDisplay;
                paypal.style.display = payPalDisplay;
                bitcoin.style.display = bitCoinDisplay;
        }
            if (event.target.value === "credit-card") {
                //Display CreditCard; Hide Others
                displayPay("","none","none");
            }
            if (event.target.value === "paypal") {
                //Display Paypal; Hide Others
                displayPay("none","","none");
            }
            if (event.target.value === "bitcoin") {
                //Display Bitcoin; Hide Others
                displayPay("none","none","");
            }
        },
        false
    );
}


/* ================================= 
    Form Validation - Text inputs
==================================== */
function checkInputs(event) {
    for (let i = 0; i < 2; i++) {
        if (asteriskInputs[i].name == "user-name") {
            if (/(\w+\S+)/.test(asteriskInputs[i].value) == false) {
                asteriskInputs[i].parentElement.classList.add("not-valid");
                asteriskInputs[i].parentElement.classList.remove("valid");
                asteriskInputs[i].nextElementSibling.style.display ="block";
                event.preventDefault();
            }
            else{
                asteriskInputs[i].parentElement.classList.remove("not-valid");
                asteriskInputs[i].parentElement.classList.add("valid");
                asteriskInputs[i].nextElementSibling.style.display ="none";
            }
        }
        if (asteriskInputs[i].name == "user-email") {
            if (/((?!\.)["\w+-_.]*[^.])(@\w+)(.com)/.test(asteriskInputs[i].value) == false) {
                asteriskInputs[i].parentElement.classList.add("not-valid");
                asteriskInputs[i].parentElement.classList.remove("valid");
                asteriskInputs[i].nextElementSibling.style.display ="block";
                event.preventDefault();
            }
            else{
                asteriskInputs[i].parentElement.classList.remove("not-valid");
                asteriskInputs[i].parentElement.classList.add("valid");
                asteriskInputs[i].nextElementSibling.style.display ="none";
            }
        }
    }
    if (document.querySelector("#payment > option:nth-child(2)").selected == true) {
        for(let i = 2; i < 5; i++){    //credit card Options
            if (asteriskInputs[i].name == "user-cc-num") {
                if (/\b(?:\d[ -]*?){13,16}\b/.test(asteriskInputs[i].value) == false) {
                    asteriskInputs[i].parentElement.classList.add("not-valid");
                    asteriskInputs[i].parentElement.classList.remove("valid");
                    asteriskInputs[i].nextElementSibling.style.display ="block";
                    event.preventDefault();
                }
                else{
                    asteriskInputs[i].parentElement.classList.remove("not-valid");
                    asteriskInputs[i].parentElement.classList.add("valid");
                    asteriskInputs[i].nextElementSibling.style.display ="none";
                }
            }
            if (asteriskInputs[i].name == "user-zip") {
                if (/^\d{5}(?:[-\s]\d{4})?$/.test(asteriskInputs[i].value) == false) {
                    asteriskInputs[i].parentElement.classList.add("not-valid");
                    asteriskInputs[i].parentElement.classList.remove("valid");    
                    asteriskInputs[i].nextElementSibling.style.display ="block";
                    event.preventDefault();
                }
                else{
                    asteriskInputs[i].parentElement.classList.remove("not-valid");
                    asteriskInputs[i].parentElement.classList.add("valid");
                    asteriskInputs[i].nextElementSibling.style.display ="none";
                }
            }
            if (asteriskInputs[i].name == "user-cvv") {
                if (/^[0-9]{3}$/.test(asteriskInputs[i].value) == false) {
                    asteriskInputs[i].parentElement.classList.add("not-valid");
                    asteriskInputs[i].parentElement.classList.remove("valid");
                    asteriskInputs[i].nextElementSibling.style.display ="block";
                    event.preventDefault();
                }
                else{
                    asteriskInputs[i].parentElement.classList.remove("not-valid");
                    asteriskInputs[i].parentElement.classList.add("valid");
                    asteriskInputs[i].nextElementSibling.style.display ="none";
                }
            }
        }
    }
}

document.querySelector("body > div > form").addEventListener("submit", checkInputs);

/* ================================= 
    Activities Check Conflicting Dates
==================================== */

function checkDates(checkedActivity){
    //Activity Event target variables
    let targetDate = checkedActivity.parentElement.children[2].innerText;
    let targetName = checkedActivity.parentElement.children[0].name;    
    //Check For Conflicting Dates
    for(let i = 1; i < activitiesCheckboxList.length;i++){
        //Other activity variables 
        let otherActivityDate = activitiesCheckboxList[i].parentElement.children[2].innerText;
        let otherActivityName = activitiesCheckboxList[i].parentElement.children[0].name;
        
        //Compare targetDate with other Activities
        if(targetDate == otherActivityDate && otherActivityName != targetName){
            checkedActivity.parentElement.classList.remove('disabled');
            activitiesCheckboxList[i].parentElement.classList.add('disabled');
            if(activitiesCheckboxList[i].checked == true){
                activitiesCheckboxList[i].checked = false;
                x = x - Number(activitiesCheckboxList[i].getAttribute("data-cost"));
                activitiesTotal.textContent = activitiesTotal.innerText.replace(/\d+/,x);
            }
            else if(activitiesCheckboxList[i].checked == false && checkedActivity.checked == false ){
                activitiesCheckboxList[i].parentElement.classList.remove('disabled');
            } 
        }
        else if(targetDate != otherActivityDate && otherActivityName == targetName){
            checkedActivity.parentElement.classList.add('disabled');
            activitiesCheckboxList[i].parentElement.classList.remove('disabled');
        }
    }   
}

/* ================================= 
    Activities CheckBox Key Listener
==================================== */
for(let i = 0; i < activitiesCheckboxList.length;i++){
    activitiesCheckboxList[i].addEventListener('click',(event)=>{
        //Check if dates conflict
        checkDates(activitiesCheckboxList[i]); 
        event.target.checked ? 
            x = x + Number(event.target.getAttribute("data-cost")) : 
            x = x - Number(event.target.getAttribute("data-cost"));
        activitiesTotal.textContent = activitiesTotal.innerText.replace(/\d+/,x);
    }) 
    activitiesCheckboxList[i].addEventListener('keydown',(event)=>{
        if(event.key == "Enter"){  
            //Toggle checkbox             
            event.target.checked ? event.target.checked = false : event.target.checked = true;
            //Check if dates conflict
            checkDates(activitiesCheckboxList[i]); 
            event.target.checked ? 
                x = x + Number(event.target.getAttribute("data-cost")) : 
                x = x - Number(event.target.getAttribute("data-cost"));
            activitiesTotal.textContent = activitiesTotal.innerText.replace(/\d+/,x);
            event.preventDefault();
        }
    })
    activitiesCheckboxList[i].addEventListener('focus',(event)=>{
        activitiesCheckboxList[i].parentElement.classList.add('focus')
        event.preventDefault();
    })
    activitiesCheckboxList[i].addEventListener('blur',(event)=>{
        activitiesCheckboxList[i].parentElement.classList.remove('focus')
        event.preventDefault();
    })
}
