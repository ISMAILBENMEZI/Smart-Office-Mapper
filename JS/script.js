// Global variable 
const goodMessage = document.getElementById("good");
const badMessage = document.getElementById("bad");
const addEmployeeFrom = document.getElementById("add_employee_from");
const experiencesList = document.getElementById("experiences_list");
const unassignedList = document.getElementById("unassigned_list");
// ------------------------------

document.addEventListener('DOMContentLoaded' , function (){
    afficheEmployeesCards()
})

function showMessage(element, text) {
    element.textContent = text;
    element.style.display = "block";
    setTimeout(() => element.style.display = "none", 3000)
}

document.getElementById("add_worker_but").addEventListener("click", function () {
    document.getElementById("add_modal").style.display = "flex";
    showThephoto()
});

document.getElementById("add_close").addEventListener("click", function () {
    document.getElementById("add_modal").style.display = "none";
});

document.getElementById("add_experience_btn").addEventListener("click", function () {
    const experiencesItem = document.createElement("div");
    experiencesItem.className = 'experiences_item';
    experiencesItem.innerHTML = `
        <button type="button" class="remove_experience_btn">✕</button>
        <label>Company</label>
        <input type="text"  class="company_experiences">
        <label>Role</label>
        <input type="text" class="Position_experiences">
        <label>From</label>
        <input type="date" class="From_experiences">
        <label>To</label>
        <input type="date"  class="To_experiences">
    `
    experiencesList.appendChild(experiencesItem);
});

experiencesList.addEventListener("click", function (e) {
    console.log(e)
    if (e.target.classList.contains('remove_experience_btn')) {
        const experiencesItem = e.target.closest(".experiences_item");
        experiencesItem.remove();
    }
})

addEmployeeFrom.addEventListener("submit", (e) => {
    e.preventDefault()
    addEmployee();
})



function showThephoto() {
    const PhotoInput = document.getElementById("Photo");
    const photoPreview = document.getElementById("photo_preview")

    PhotoInput.addEventListener("input", function () {
        const url = this.value.trim();

        if (url) {
            photoPreview.src = url;
        }
        else {
            photoPreview.src = "";
        }
    })
}

function getdata() {
    let eventData = localStorage.getItem("employeesInformation");
    return eventData ? JSON.parse(eventData) : [];
}

function addEmployee() {

    const experiencesItem = document.querySelectorAll(".experiences_item");
    let experiences = [];
    experiencesItem.forEach(item => {
        const company = item.querySelector('.company_experiences').value.trim();
        const position = item.querySelector('.Position_experiences').value.trim();
        const from = item.querySelector('.From_experiences').value;
        const to = item.querySelector('.To_experiences').value;

        if (!company || !position || !from || !to)
            return showMessage(badMessage, "Please fill in all experience fields")
        experiences.push({
            Company: company,
            Position: position,
            From: from,
            To: to
        });
    })

    isItFull = ["Name", "Role", "Email", "Phone"];
    const phoneRegex = /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    for (let Id of isItFull) {
        let input = document.getElementById(Id);
        if (input.value.trim() === "")
            return showMessage(badMessage, `Please fill the ${Id} filed`);

        if(Id === "Phone" && !phoneRegex.test(input.value))


        if(Id === "Email" && !emailRegex.test(input.value));
            return showMessage(badMessage , `Invalid ${Id} address`);
    }

    let employeeId = Math.random().toString(36).substr(2, 6);

    let InformationObject = {
        Id: employeeId,
        Name: document.getElementById("Name").value.trim(),
        Role: document.getElementById("Role").value,
        Photo: document.getElementById("Photo").value.trim(),
        Email: document.getElementById("Email").value.trim(),
        Phone: document.getElementById("Phone").value,
        Experiences: experiences
    };

    let eventData = getdata();
    eventData.push(InformationObject);

    localStorage.setItem("employeesInformation", JSON.stringify(eventData));
    showMessage(goodMessage, "Employee added successfully!")
    addEmployeeFrom.reset();
    afficheEmployeesCards()
}

function afficheEmployeesCards() {
    const employeeCard = document.createElement("div");
    employeeCard.className = "employee-card";
    const afficheCards = JSON.parse(localStorage.getItem("employeesInformation"));
    if(!afficheCards)
        return;
    afficheCards.forEach(employee => {
        employeeCard.innerHTML = `
            <img src="${employee.Photo || 'IMG/Admin-Profile-Vector-PNG-Clipart.png'}" alt="">
            <div class="employee-info">
                <h3>${employee.Name}</h3>
                <p>${employee.Role}</p>
            </div>
            <div class="thesupedit_btn">
                <button class="edite_btn"><img src="IMG/write_11368664.png" alt=""></button>
                <button class="delete_btn"><img src="IMG/delete_15917854.png" alt=""></button>
            </div>
    `
    })
    unassignedList.appendChild(employeeCard);
}



function initApp() {
    
}
initApp();