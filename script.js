let previewName = document.querySelector(".name");
let userName = document.querySelector("#name");

let previewExp = document.querySelector(".date");
let previewExpY = document.querySelector(".date-y");
let userExp = document.querySelector("#date");
let userExpY = document.querySelector("#date-y");

let previewNum = document.querySelector(".card-num");
let userNum = document.querySelector("#num");

let previewPin = document.querySelector("#showPin");
let userPin = document.querySelector("#inputPin");

let errorName = document.querySelector(".error-name");
let errorNum = document.querySelector(".error-num");
let errorExp = document.querySelector(".error-exp");
let errorPin = document.querySelector(".error-pin");

let form = document.querySelector("#form");
let message = document.querySelector(".success");
let successButton = document.querySelector(".success-button");

let submit = document.querySelector(".submit");

numberFormat = /^[0-9\s]+$/;

let d = new Date();
const year = d.getFullYear() % 100;
const month = d.getMonth() + 1;

function previewCardName() {
  previewName.innerHTML = userName.value;
  errorName.innerText = "";
}

function previewCardNum() {
  inputNum = userNum.value;
  inputNum = inputNum.replace(/\s/g, "");
  inputNum = inputNum.replace(/(.{4})/g, "$1 ").trim();
  userNum.value = inputNum;
  previewNum.innerText = userNum.value;

  if (numberFormat.test(inputNum)) {
    errorNum.innerText = "";
    userNum.style.borderColor = "";
  } else if (inputNum == "") {
    errorNum.innerText = "";
    userNum.style.borderColor = "";
  } else {
    errorNum.innerText = "Wrong format, numbers only.";
    userNum.style.borderColor = "#ff5e5e";
    return false;
  }
}
function previewCardExp(event) {
  inputNum = userExp.value;
  inputNum2 = userExpY.value;
  maxLength = 2;

  if (inputNum.length > maxLength) {
    userExp.value = inputNum.slice(0, maxLength);
  } else if (inputNum2.length > maxLength) {
    userExpY.value = inputNum2.slice(0, maxLength);
  }

  // if (inputNum == "" || inputNum2 == "") {
  //   errorExp.innerText = "Can't be empty";
  //   event.preventDefault();
  // } else {
  //   errorExp.innerText = "";
  // }
  errorExp.innerText = "";
  userExp.style.borderColor = "";
  userExpY.style.borderColor = "";
  previewExp.innerHTML = userExp.value;
  previewExpY.innerHTML = userExpY.value;
}
function previewCardPin() {
  maxLength = 3;

  if (userPin.value.length > maxLength) {
    userPin.value = userPin.value.slice(0, maxLength);
  }
  previewPin.innerHTML = userPin.value;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // CVC VALIDATION

  if (userPin.value.length == "") {
    //
    errorPin.innerText = "Can't be empty";
    userPin.style.borderColor = "#ff5e5e";
  } else if (userPin.value.length < 3) {
    //
    errorPin.innerText = "Should contain 3 digit";
    userPin.style.borderColor = "#ff5e5e";
    return false;
  } else {
    errorPin.innerText = "";
    userPin.style.borderColor = "";
  }

  // EXPIRY DATE VALIDATION

  if (userExp.value == "" || userExpY.value == "") {
    //
    errorExp.innerText = "Can't be empty";
    userExp.style.borderColor = "#ff5e5e";
    userExpY.style.borderColor = "#ff5e5e";

    // console.log(month);
  } else if (userExp.value > 12 || userExpY.value < year) {
    //
    errorExp.innerText = "Invalid date";
    userExpY.style.borderColor = "#ff5e5e";
    return false;
  } else if (userExpY.value == year && userExp.value <= month) {
    errorExp.innerText = "Invalid date";
    userExpY.style.borderColor = "#ff5e5e";
    return false;
  } else {
    errorExp.innerText = "";
    userExpY.style.borderColor = "";
    userExp.style.borderColor = "";
  }

  // CARD NUMBER VALIDATION

  if (userNum.value == "") {
    //
    errorNum.innerText = "Can't be empty";
    userNum.style.borderColor = "#ff5e5e";
  } else if (userNum.value.length < 19) {
    //
    errorNum.innerText = "Invalid Card";
    userNum.style.borderColor = "#ff5e5e";
    return false;
  } else {
    if (numberFormat.test(userNum.value)) {
      errorNum.innerText = "";
      userNum.style.borderColor = "";
    } else if (userNum.value == "") {
      errorNum.innerText = "";
      userNum.style.borderColor = "";
    } else {
      errorNum.innerText = "Wrong format, numbers only.";
      userNum.style.borderColor = "#ff5e5e";
      return false;
    }
  }

  //  NAME VALIDATION

  if (userName.value == "") {
    //
    errorName.innerText = "Can't be empty";
    userName.style.borderColor = "#ff5e5e";
  } else {
    userName.style.borderColor = "";
  }
  if (
    userName.value &&
    userNum.value &&
    userExp.value &&
    userExpY.value &&
    userPin.value
  ) {
    form.style.display = "none";
    message.style.display = "flex";
  }
});

// SUCCESS BUTTON

successButton.addEventListener("click", function () {
  window.location.reload();
});
