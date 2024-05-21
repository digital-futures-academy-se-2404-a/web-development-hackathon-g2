
//RULES
const isOnlyAlphabeticCharsRegex = /^[a-zA-Z]+$/;
const emailRegex = /@.*\./;

//1. Is Not Empty
const isNotEmpty = (str) => str?.length > 0;
//2. Is alphabetic
const isOnlyAlphabeticChars = (str) => isOnlyAlphabeticCharsRegex.test(str);
//3. Is 2-14 chars
const isBetweenTwoAndFourteenChars = (str) => (str?.length > 1 && str?.length < 15);
//4 is valid email
const isValidEmail = (str) => emailRegex.test(str);

const form = document.getElementById("sign-up-form");
const submitButtonEl = document.getElementById("sign-up-form-submit-button");


// Error Message Elements
const titleErrorMessageElement = document.getElementById("error-message-title")
const firstNameErrorMessageElement = document.getElementById("error-message-first-name")
const lastNameErrorMessageElement = document.getElementById("error-message-last-name")
const emailErrorMessageElement = document.getElementById("error-message-email")


const errorMessageElements = {
    'title': titleErrorMessageElement,
    'first-name': firstNameErrorMessageElement,
    'last-name': lastNameErrorMessageElement,
    'email': emailErrorMessageElement,
}
console.log(errorMessageElements)

// Error Messages
const titleError = "Title cannot be blank!"
const nameAlphabetError = "Names can only contain letters!"
const nameLengthError = "Names must be no less than 2 characters and no longer than 14 characters!"
const emailError = "Email must have an '@' symbol and a '.' symbol!"

// Object - maps to validator

// Object - Tracks validation state
const validationState = {
    'title': false,
    'first-name': false,
    'last-name': false,
    'email': false,
}

const titleValidator = (stringToValidate) => {
    validationState["title"] = isNotEmpty(stringToValidate);  
    return validationState["title"] ? "" : titleError; 
}

const nameValidator = (name, ID) => {
    validationState[ID] = false;
    if (!isNotEmpty(name)) return "";
    if (!isBetweenTwoAndFourteenChars(name)) return nameLengthError;
    if (!isOnlyAlphabeticChars(name)) return nameAlphabetError;
    validationState[ID] = true;
    return "";
}

const emailValidator = (emailToValidate)=>{
    validationState["email"] = isValidEmail(emailToValidate); 
    if (!isNotEmpty(emailToValidate)) return "";
    return validationState["email"] ? "" : emailError; 
}

const validatorMapping = {
    'title': (str)=>errorMessageElements['title'].textContent = titleValidator(str),
    'first-name': (str)=>errorMessageElements['first-name'].textContent = nameValidator(str, 'first-name'),
    'last-name': (str)=>errorMessageElements['last-name'].textContent = nameValidator(str, 'last-name'),
    'email': (str)=>errorMessageElements['email'].textContent = emailValidator(str),
}

const checkValidity = () => {
    console.log(Object.values(validationState))
    if (Object.values(validationState).every((item)=> item)) {
        submitButtonEl.disabled = false;
    }
    else submitButtonEl.disabled = true;
}

// Form event listener
// id
form.addEventListener("change", (e) => {
    if (!e.target?.id?.startsWith("input")) return
    inputId = e.target.id.replace("input-", "");
    if (inputId === "dob" || inputId === "phone") return;
    validatorMapping[inputId](e.target.value);
    checkValidity();
})




                            


