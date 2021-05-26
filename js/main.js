window.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    const otherJobRole = document.querySelector('#other-job-role');
    const color = document.querySelector('#color');
    const activitiesTotal = document.querySelector('#activities-cost');
    const activitiesCheckboxList = document.querySelectorAll(
        '#activities-box > label > input[type=checkbox]'
    );

    //formValidate
    const activities = document.getElementById('activities');
    const error_border = document.querySelectorAll('.error-border');
    const form = document.querySelector('form');
    
    let x = 0;
    //DOMContentLoad
    //Set Focus on Name Input
    nameInput.focus();
    //Hide Other Input
    otherJobRole.style.display = 'none';
    //Set Color Drop Down to Disabled
    color.disabled = true;
    //Credit Card By Default Set to true
    document.querySelector('#payment > option:nth-child(2)').selected = true;

    /* ================================= 
        "Job Role" section
    ==================================== */
    document.querySelector('#title').addEventListener(
        'change',
        function (event) {
            if (event.target.value === 'other') {
                otherJobRole.style.display = '';
                otherJobRole.focus();
            } else {
                otherJobRole.style.display = 'none';
            }
        }
    );
    /* ================================= 
        "T-Shirt Info" section
    ==================================== */
    document.querySelector('#design').addEventListener(
        'change',
        function (event) {
            color.disabled = false;
            let js_puns_List = document.querySelectorAll(
                "#color > [data-theme='js puns']"
            );
            let heart_js_list = document.querySelectorAll(
                "#color > [data-theme='heart js']"
            );
            if (event.target.value === 'js puns') {
                //Reset Color Theme Choice
                document.querySelector('#color').selectedIndex = 0;
                //Hide all heart js options
                for (let i = 0; i < heart_js_list.length; i++) {
                    heart_js_list[i].style.display = 'none';
                }
                for (let i = 0; i < js_puns_List.length; i++) {
                    js_puns_List[i].style.display = '';
                }
            }
            if (event.target.value === 'heart js') {
                //Reset Color Theme Choice
                document.querySelector('#color').selectedIndex = 0;
                //Hide all js puns options
                for (let i = 0; i < js_puns_List.length; i++) {
                    js_puns_List[i].style.display = 'none';
                }
                for (let i = 0; i < heart_js_list.length; i++) {
                    heart_js_list[i].style.display = '';
                }
            }
        }
    );
    /* ================================= 
        "Payment Info" section 
    ==================================== */
    if (document.querySelector('#payment').selectedIndex == !0) {
        let credit_card = document.querySelector('#credit-card');
        let paypal = document.querySelector('#paypal');
        let bitcoin = document.querySelector('#bitcoin');
        //Default Display CreditCard; Hide Other DIVs
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';

        document.querySelector('#payment').addEventListener(
            'input',
            function (event) {
                //Display CreditCard or paypal or bitcoin
                function displayPay(
                    creditCardDisplay,
                    payPalDisplay,
                    bitCoinDisplay
                ) {
                    credit_card.style.display = creditCardDisplay;
                    paypal.style.display = payPalDisplay;
                    bitcoin.style.display = bitCoinDisplay;
                }
                if (event.target.value === 'credit-card') {
                    //Display CreditCard; Hide Others
                    displayPay('', 'none', 'none');
                }
                if (event.target.value === 'paypal') {
                    //Display Paypal; Hide Others
                    displayPay('none', '', 'none');
                }
                if (event.target.value === 'bitcoin') {
                    //Display Bitcoin; Hide Others
                    displayPay('none', 'none', '');
                }
            }
        );
    }
    function checkDates(checkedActivity) {
        //Activity Event Target Variables
        let targetDate = checkedActivity.parentElement.children[2].innerText;
        let targetName = checkedActivity.parentElement.children[0].name;

        //Check For Conflicting Dates
        for (let i = 1; i < activitiesCheckboxList.length; i++) {
            //Other activity variables
            let otherActivityDate =
                activitiesCheckboxList[i].parentElement.children[2].innerText;
            let otherActivityName =
                activitiesCheckboxList[i].parentElement.children[0].name;

            //Compare targetDate with other activities
            if (
                targetDate == otherActivityDate &&
                otherActivityName != targetName
            ) {
                checkedActivity.parentElement.classList.remove('disabled');
                activitiesCheckboxList[i].parentElement.classList.add(
                    'disabled'
                );
                if (activitiesCheckboxList[i].checked == true) {
                    activitiesCheckboxList[i].checked = false;
                    x =
                        x -
                        Number(
                            activitiesCheckboxList[i].getAttribute('data-cost')
                        );
                    activitiesTotal.textContent =
                        activitiesTotal.innerText.replace(/\d+/, x);
                } else if (
                    activitiesCheckboxList[i].checked == false &&
                    checkedActivity.checked == false
                ) {
                    activitiesCheckboxList[i].parentElement.classList.remove(
                        'disabled'
                    );
                }
            } else if (
                targetDate != otherActivityDate &&
                otherActivityName == targetName
            ) {
                checkedActivity.parentElement.classList.add('disabled');
                activitiesCheckboxList[i].parentElement.classList.remove(
                    'disabled'
                );
            }
        }
    }
    for (let i = 0; i < activitiesCheckboxList.length; i++) {
        activitiesCheckboxList[i].addEventListener('click', (event) => {
            //Check if dates conflict
            checkDates(activitiesCheckboxList[i]);
            event.target.checked
                ? (x = x + Number(event.target.getAttribute('data-cost')))
                : (x = x - Number(event.target.getAttribute('data-cost')));
            activitiesTotal.textContent = activitiesTotal.innerText.replace(
                /\d+/,
                x
            );
        });
        activitiesCheckboxList[i].addEventListener('keydown', (event) => {
            if (event.key == 'Enter') {
                //Toggle checkbox
                event.target.checked
                    ? (event.target.checked = false)
                    : (event.target.checked = true);
                //Check if dates conflict
                checkDates(activitiesCheckboxList[i]);
                event.target.checked
                    ? (x = x + Number(event.target.getAttribute('data-cost')))
                    : (x = x - Number(event.target.getAttribute('data-cost')));
                activitiesTotal.textContent = activitiesTotal.innerText.replace(
                    /\d+/,
                    x
                );
            }
        });
        //Add Focus Class
        activitiesCheckboxList[i].addEventListener('focus', (event) => {
            activitiesCheckboxList[i].parentElement.classList.add('focus');
        });
        //Remove Focus Class
        activitiesCheckboxList[i].addEventListener('blur', (event) => {
            activitiesCheckboxList[i].parentElement.classList.remove('focus');
        });
    }

    form.addEventListener('submit', (event) => {
        let creditCardSelectionIndex = document.querySelector("#payment").selectedIndex;
        const textValidations = {
            'user-name': {
                reg: RegExp(`(\\w+\\S+)`),
            },
            'user-email': {
                reg: RegExp(`((?!\\.)["\\w+-_.]*[^.])(@\\w+)(.com)`),
            },
            'user-cc-num': {
                reg: RegExp(`\\b(?:\\d[ -]*?){13,16}\\b`),
            },
            'user-zip': {
                reg: RegExp(`^[0-9]{5}$`),
            },
            'user-cvv': {
                reg: RegExp(`^[0-9]{3}$`),
            },
        };
        
        const formValidate = {
            INPUT: (targetElement) => {
                let name = targetElement.name;
                //Display Invalid
                if (textValidations[name]['reg'].test(targetElement.value) == false) {
                    targetElement.parentElement.classList.add('not-valid');
                    targetElement.parentElement.classList.remove('valid');
                    targetElement.nextElementSibling.style.display = 'block';
                    event.preventDefault();
                }
                //Display Valid
                else {
                    targetElement.parentElement.classList.remove('not-valid');
                    targetElement.parentElement.classList.add('valid');
                    targetElement.nextElementSibling.style.display = 'none';
                }
            
            },
            DIV: (targetElement) => {
                let checkboxElements = targetElement.children;
                let checkCounter = 0;
                for (let i = 0; i < checkboxElements.length; i++) {
                    let checkboxTarget = checkboxElements[i].firstElementChild;
                    // Count number of checked boxes
                    if (checkboxTarget.checked == true) {
                        checkCounter = checkCounter + 1;
                    }
                }
                //Display invalid DIV (Checkboxes)
                if (checkCounter == 0) {
                    activities.classList.add('not-valid');
                    activities.classList.remove('valid');
                    activities.lastElementChild.style.display = 'block';
                    event.preventDefault();
                    
                } 
                //Display valid DIV (Checkboxes)
                else {
                    activities.classList.add('valid');
                    activities.classList.remove('not-valid');
                    activities.lastElementChild.style.display = 'none';
                }
            },
            SELECT: (targetElement) => {
                if(creditCardSelectionIndex == 1){  
                    if (targetElement.selectedIndex == 0) {
                        event.preventDefault()
                        targetElement.parentNode.classList.add('not-valid');
                        targetElement.parentNode.classList.remove('valid');
                    }else{
                        targetElement.parentNode.classList.add('valid');
                        targetElement.parentNode.classList.remove('not-valid');
                    }
                }
            },
        };
        
        /* ================================= 
            "Check Input" Function Confirm error_border elements are valid before submission 
        ==================================== */
        function checkInputs() {
            let creditCardSelectionIndex = document.querySelector("#payment").selectedIndex;
            for (let i = 0; i < error_border.length; i++) {
                let formType = error_border[i].nodeName;
                let formTargetElement = error_border[i];
                //Elements between 3 - 7 are under Credit Card validation
                if(i > 2){
                    if(creditCardSelectionIndex == 1){
                        formValidate[formType](formTargetElement);
                    }
                }else{
                    formValidate[formType](formTargetElement);
                }
            }
        }
        checkInputs();
    });
});
