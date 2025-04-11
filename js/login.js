//Xử lý logic đăng nhập

// JSON.parse(localStorage.users)
const storedUsers = JSON.parse(localStorage.getItem("users"))
// console.log(JSON.parse(localStorage.users)[2].password)
// console.log(storedUsers)
let loginName = document.getElementById(`loginName`)
let password = document.getElementById(`password`)
let accountSignIn = document.getElementById(`accountSignIn`)
let exist = document.getElementById(`exist`)
let notTrue = document.getElementById(`notTrue`)
//kiểm tra đăng nhập
accountSignIn.addEventListener(`click`, function () {
    let findUsername = storedUsers.find(function (el) {
        return el.username === loginName.value.trim()
    })
    // điều kiện tên đăng kí
    if (!findUsername) {
        loginName.classList.remove(`inputTrue`)
        loginName.classList.add(`inputErrol`)
        exist.style.display=`block`
    } else {
        loginName.classList.remove(`inputErrol`)
        loginName.classList.add(`inputTrue`)
         exist.style.display=`none`
    }
   // điều kiện mật khẩu
    if (findUsername.password !== password.value) {
        password.classList.remove(`inputTrue`)
        password.classList.add(`inputErrol`)
        notTrue.style.display=`block`
    } else {
        password.classList.remove(`inputErrol`)
        password.classList.add(`inputTrue`)
            notTrue.style.display=`none`
    }
    if (findUsername&&findUsername.password === password.value) {
        
        window.location.href = `http://127.0.0.1:5500/STRUCTURE_FINANCE/index.html`
    }

})


