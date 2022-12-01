const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const symbolEl = document.getElementById("symbols");
const numbersEl = document.getElementById("numbers");
const generateBtn = document.getElementById("generate");
const clipboardBtn = document.getElementById("copy");

const UPPER_CASE = arrayFromLowToHigh(65, 90);
const LOWER_CASE = arrayFromLowToHigh(97, 122);
const NUMBERS = arrayFromLowToHigh(48, 57);
const SYMBOLS = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));
console.log(UPPER_CASE);

lengthEl.addEventListener("change", () => {
  if (lengthEl.value < 5) {
    lengthEl.value = 5;
  } else if (lengthEl.value > 20) {
    lengthEl.value = 20;
  }
});

generateBtn.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolEl.checked;
  const password = generatePassword(
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol,
    length
  );
  resultEl.innerText = password;
});

function generatePassword(upper, lower, number, symbol, length) {
  let charCodes = [];
  if (upper) charCodes = charCodes.concat(UPPER_CASE);
  if (lower) charCodes = charCodes.concat(LOWER_CASE);
  if (number) charCodes = charCodes.concat(NUMBERS);
  if (symbol) charCodes = charCodes.concat(SYMBOLS);
  const passwordCharacters = [];
  for (let i = 0; i < length; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join("");
}

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

clipboardBtn.addEventListener("click", () => {
  const textArea = document.createElement("textarea");
  const password = resultEl.innerText;
  if (!password) {
    return;
  }
  textArea.value = password;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  alert("Copied");
});
