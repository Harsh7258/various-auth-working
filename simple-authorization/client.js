const login1 = document.getElementById("loginUser1")
const login2 = document.getElementById("loginUser2")
const login3 = document.getElementById("loginUser3")
const getData = document.getElementById("admin")
const dataDiv = document.getElementById("data-space")

login1.addEventListener("click", () => {
    login("Harsh")
})
login2.addEventListener("click", () => {
    login("Sancho")
})
login3.addEventListener("click", () => {
    login("no name")
})

getData.addEventListener('click', () => {
    fetch('http://localhost:3000/adminData', {
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
    }).then(res => res.text()).then(data => dataDiv.textContent = data).catch(err => console.log(err.message))
})

function login(username) {
    fetch('http://localhost:3000/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username }) // sets req.body
    }).then(res => res.text()).then(data => dataDiv.textContent = data).catch(err => console.log(err.message))
}