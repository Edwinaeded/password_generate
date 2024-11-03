const generate_btn = document.querySelector("#generate_btn")
const result_box_container = document.querySelector("#result_box_container")
const result_box = document.querySelector("#result_box")
const length_setting_input = document.querySelector("#length_setting_input")
const checkbox1 = document.querySelector("#checkbox1")
const checkbox2 = document.querySelector("#checkbox2")
const checkbox3 = document.querySelector("#checkbox3")
const checkbox4 = document.querySelector("#checkbox4")
const exclude_setting_input = document.querySelector("#exclude_setting_input")
let lowerCaseEng = 'abcdefghijklmnopqrstuvwxyz'
let upperCaseEng = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let numbers = '0123456789'
let symbols = '~!@#$%&*+.'


// check_options.addEventListener("click", function show (){
//   console.log(checkbox1.checked)
// })

function getRandom(length) {
  let random = Math.floor(Math.random() * length)
  return random
}

generate_btn.addEventListener("click", function clickGenerateBtn(event) {
  getPassword()
})

let password_length = 0  //密碼長度4~16才有效
let passwordCharacters = ''
let excludeCharacters = exclude_setting_input.value //為什麼不能用變數去接value值

function getPassword() {
  let password_length = getPasswordLength()
  let passwordCharacters = getCharacters()

  //過濾想移除的字符
  for (k = (exclude_setting_input.value.length -1) ; k >= 0 ; k--) {
    let charToRemove = exclude_setting_input.value[k]
    if (passwordCharacters.includes(charToRemove)){
      console.log(`字符庫移除${charToRemove}`)
      let index = passwordCharacters.indexOf(charToRemove)
      if (index !== -1 ){
        passwordCharacters = passwordCharacters.slice(0,index) + passwordCharacters.slice(index+1)
      }else if(index === -1){
        console.log("過濾語法有誤!")
      }
    }
  }

  if (passwordCharacters.length === 0) {
    alert("沒有可用的字符！")
  } else if (Number(length_setting_input.value) < 4 | Number(length_setting_input.value) > 16) {
    return
  } else {
    let password = ''
    for (let i = 0; i < password_length; i++) {
      let index = getRandom(passwordCharacters.length)
      randomCharacter = passwordCharacters[index]
      password += randomCharacter
    }
    
    console.log(exclude_setting_input.value) 
    console.log(excludeCharacters) //會獲得空白值

    result_box_container.innerHTML = `<div class="alert alert-warning" role="alert" id="result_box">
          Your password is : ${password}
          </div> `
  }
}

function getPasswordLength() {
  if (length_setting_input.value < 4) {
    alert("密碼長度設定過短，請重新設定！")
  } else if (length_setting_input.value > 16) {
    alert("密碼長度設定過長，請重新設定！")
  } else {
    return Number(length_setting_input.value)
  }
}


function getCharacters() {
  let passwordCharacters = ''
  if (checkbox1.checked === true) {
    passwordCharacters += lowerCaseEng
  }
  if (checkbox2.checked === true) {
    passwordCharacters += upperCaseEng
  }
  if (checkbox3.checked === true) {
    passwordCharacters += numbers
  }
  if (checkbox4.checked === true) {
    passwordCharacters += symbols
  }

  return passwordCharacters
}