function toggleForm() {
    var loginForm = document.getElementById("login-form");
    var signupForm = document.getElementById("signup-form");
    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    }
}
let baseURL = "http://localhost:4500"
let signupr = document.getElementById("signup");
signupr.addEventListener("submit", (e) => {
    e.preventDefault()
    if (document.getElementById("password").value != document.getElementById("repassword").value) {
        alert("Enter Correct Password")
    } else {
        let req = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }
        fetch(`${baseURL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req)
        })
            .then((res) => {
                if (res.ok) {
                    alert("Registered Successfully")
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
})
let login = document.getElementById("login");
login.addEventListener("submit", (e) => {
    e.preventDefault();
    let req = {
        email: document.getElementById("lemail").value,
        password: document.getElementById("lpassword").value
    }
    fetch(`${baseURL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req)
    })
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            console.log(res)
            if (res.error) {
                alert("Wrong Credentials")
            } else {
                localStorage.setItem("token", res.token)
                alert("Login Successfull")           
                window.location.href = "test.html" 
            }
        })
        .catch((err) => {
            console.log(err);
        })
})
// {
//     question: "Question 1: What is the capital of France?",
//     options: ["Paris", "London", "Berlin"],
//     answer: "Paris"
// },
// {
//     question: "Question 2: Which planet is known as the Red Planet?",
//     options: ["Mars", "Jupiter", "Venus"],
//     answer: "Mars"
// },
// {
//     question: "Question 3: What is the chemical symbol for gold?",
//     options: ["Au", "Ag", "Fe"],
//     answer: "Au"
// },
// {
//     question: "Question 4: Who painted the Mona Lisa?",
//     options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh"],
//     answer: "Leonardo da Vinci"
// },
// {
//     question: "Question 5: What is the tallest mountain in the world?",
//     options: ["Mount Everest", "K2", "Kangchenjunga"],
//     answer: "Mount Everest"
// }