const login1 = document.getElementById("loginUser1")
const login2 = document.getElementById("loginUser2")
const login3 = document.getElementById("loginUser3")
const getData = document.getElementById("admin")
const dataDiv = document.getElementById("data-space")

login1.addEventListener("click", () => {
    login("User1")
})
login2.addEventListener("click", () => {
    login("User2")
})
login3.addEventListener("click", () => {
    login("User3")
})

getData.addEventListener('click', () => {
    fetch('http://localhost:3000/adminData', {
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
    }).then(res => res.text()).then(data => getData.textContent = data).catch(err => console.log(err))
})

function login(username) {
    fetch('http://localhost:3000/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username }) // sets req.body
    }).then(res => res.text()).then(data => dataDiv.textContent = data).catch(err => console.log(err))
}