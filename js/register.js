//Xử lý logic đăng ký tài khoản

//thông tin tài khoản và mật khẩu người dùng
const users = [
    {
        id: 1,
        username: "user1",
        password: "password123",
        email: `user1@gmail.com`,
    },
    {
        id: 2,
        username: "user2",
        password: "password456",
        email: `user2@gmail.com`,
    }
];
//khai báo
let username = document.getElementById(`username`)
let password = document.getElementById(`password`)
let accountSignUp = document.getElementById(`accountSignUp`)
let exist_user = document.getElementById(`exist_user`)
let repeatPassword = document.getElementById(`repeatPassword`)
let empty_user = document.getElementById(`empty_user`)
let empty_password = document.getElementById(`empty_password`)
let numberCharacter_password = document.getElementById(`numberCharacter_password`)
let empty_repeatPassword = document.getElementById(`empty_repeatPassword`)
let match_repeatPassword = document.getElementById(`match_repeatPassword`)
let email = document.getElementById(`email`)
let empty_email = document.getElementById(`empty_email`)
let format_email = document.getElementById(`format_email`)
let exist_email = document.getElementById(`exist_email`)

//kiểm tra đăng kí
const storedUsers = JSON.parse(localStorage.getItem("users")) || []
accountSignUp.addEventListener(`click`, function () {
    let findUsername = storedUsers.find(function (el) {
        return el.username === username.value.trim()
    })
    let findEmail = storedUsers.find(function (el) {
        return el.email === email.value.trim()
    })
    // tài khoản rỗng
    if (username.value === "") {
        username.classList.remove(`inputTrue`)
        username.classList.add(`inputErrol`)
        exist_user.classList.remove(`errol`)
        empty_user.classList.add(`errol`)
        exist_user.style.display = `none`
        empty_user.style.display = `block`

    } else if (findUsername) {
        username.classList.remove(`inputTrue`)
        username.classList.add(`inputErrol`)
        empty_user.classList.remove(`errol`)
        exist_user.classList.add(`errol`)
        empty_user.style.display = `none`
        exist_user.style.display = `block`
    } else {
        empty_user.classList.remove(`errol`)
        exist_user.classList.remove(`errol`)
        empty_user.style.display = `none`
        exist_user.style.display = `none`
        username.classList.remove(`inputErrol`)
        username.classList.add(`inputTrue`)
    }

    // điều kiện mật khẩu
    if (password.value.trim() === ``) {

        password.classList.remove(`inputTrue`)
        password.classList.add(`inputErrol`)
        numberCharacter_password.classList.remove(`errol`)
        empty_password.classList.add(`errol`)
        numberCharacter_password.style.display = `none`
        empty_password.style.display = `block`

    } else if (password.value.trim().length < 6) {

        password.classList.remove(`inputTrue`)
        password.classList.add(`inputErrol`)
        empty_password.classList.remove(`errol`)
        numberCharacter_password.classList.add(`errol`)
        empty_password.style.display = `none`
        numberCharacter_password.style.display = `block`

    } else {

        empty_password.classList.remove(`errol`)
        numberCharacter_password.classList.remove(`errol`)
        empty_password.style.display = `none`
        numberCharacter_password.style.display = `none`
        password.classList.remove(`inputErrol`)
        password.classList.add(`inputTrue`)
    }

    //điều kiện mật khẩu xác nhận

    if (repeatPassword.value.trim() === ``) {
        repeatPassword.classList.remove(`inputTrue`)
        repeatPassword.classList.add(`inputErrol`)
        match_repeatPassword.classList.remove(`errol`)
        empty_repeatPassword.classList.add(`errol`)
        match_repeatPassword.style.display = `none`
        empty_repeatPassword.style.display = `block`

    } else if (password.value.trim() !== repeatPassword.value.trim()) {

        repeatPassword.classList.remove(`inputTrue`)
        repeatPassword.classList.add(`inputErrol`)
        empty_repeatPassword.classList.remove(`errol`)
        match_repeatPassword.classList.add(`errol`)
        empty_repeatPassword.style.display = `none`
        match_repeatPassword.style.display = `block`
    } else {

        empty_repeatPassword.classList.remove(`errol`)
        match_repeatPassword.classList.add(`errol`)
        empty_repeatPassword.style.display = `none`
        match_repeatPassword.style.display = `none`
        repeatPassword.classList.remove(`inputErrol`)
        repeatPassword.classList.add(`inputTrue`)
    }
    // điều kiện email
    if (email.value.trim() === ``) {
        email.classList.remove(`inputTrue`)
        email.classList.add(`inputErrol`)
        format_email.classList.remove(`errol`)
        exist_email.classList.remove(`errol`)
        empty_email.classList.add(`errol`)
        format_email.style.display = `none`
        exist_email.style.display = `none`
        empty_email.style.display = `block`

    } else if (!email.value.includes("@") || !email.value.endsWith(".com")) {
        email.classList.remove(`inputTrue`)
        email.classList.add(`inputErrol`)
        exist_email.classList.remove(`errol`)
        empty_email.classList.remove(`errol`)
        format_email.classList.add(`errol`)
        empty_email.style.display = `none`
        exist_email.style.display = `none`
        format_email.style.display = `block`
    } else if (findEmail) {
        email.classList.remove(`inputTrue`)
        email.classList.add(`inputErrol`)
        empty_email.classList.remove(`errol`)
        format_email.classList.remove(`errol`)
        exist_email.classList.add(`errol`)
        empty_email.style.display = `none`
        format_email.style.display = `none`
        exist_email.style.display = `block`
    }
    else {
        email.classList.remove(`inputErrol`)
        email.classList.add(`inputTrue`)
        empty_email.classList.remove(`errol`)
        format_email.classList.remove(`errol`)
        exist_email.classList.remove(`errol`)
        empty_email.style.display = `none`
        format_email.style.display = `none`
        exist_email.style.display = `none`
        
    }

    if (username.value.trim() !== `` && !findUsername && password.value.trim().length >= 6 && repeatPassword.value.trim() !== `` && password.value.trim() === repeatPassword.value.trim() && email.value.trim() !== `` && email.value.includes("@") && email.value.endsWith(".com") && !findEmail) {
        let newUser = {
            id: Math.random(),
            username: username.value,
            password: password.value,
            email: email.value,
        }
        storedUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(storedUsers));

        window.location.href = 'login.html'
    }
})





