// Global variable 
const goodMessage = document.getElementById("good");
const badMessage = document.getElementById("bad");
const addEmployeeFrom = document.getElementById("add_employee_from");
const unassignedList = document.getElementById("unassigned_list");
const experiencesList = document.getElementById("experiences_list");
const profailModal = document.getElementById("profail_modal");
const addModal = document.getElementById("add_modal");
const addEmployeeBtn = document.getElementById("add_employee_btn");
const selectClose = document.getElementById("select_close");
const selectionList = document.getElementById("selectionList");
const employeeListRoom = document.querySelectorAll(".employee-list");
// ------------------------------

document.addEventListener('DOMContentLoaded', function () {
    unassignedList.innerHTML = "";
    afficheEmployeesCards()
})

selectClose.addEventListener("click", function () {
    document.getElementById("selest_modal").style.display = "none";
})

document.getElementById("add_worker_but").addEventListener("click", function () {
    addModal.style.display = "flex";
    showThephoto()
});

document.getElementById("add_close").addEventListener("click", function () {
    document.getElementById("add_modal").style.display = "none";
});

document.getElementById("add_experience_btn").addEventListener("click", function () {
    addNewEexperience()
});

experiencesList.addEventListener("click", function (e) {
    if (e.target.classList.contains('remove_experience_btn')) {
        const experiencesItem = e.target.closest(".experiences_item");
        experiencesItem.remove();
    }
})

addEmployeeFrom.addEventListener("submit", (e) => {
    e.preventDefault()
    if (addEmployeeBtn.textContent == "Add Employee")
        addEmployee();
})

function showMessage(element, text) {
    element.textContent = text;
    element.style.display = "block";
    setTimeout(() => element.style.display = "none", 3000)
}

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

function getData() {
    let eventData = localStorage.getItem("employeesInformation");
    return eventData ? JSON.parse(eventData) : [];
}

function addNewEexperience(obj = null) {
    const experiencesItem = document.createElement("div");
    experiencesItem.className = 'experiences_item';
    experiencesItem.innerHTML = `
        <button type="button" class="remove_experience_btn">✕</button>
        <label>Company</label>
        <input type="text"  class="company_experiences" value = "${obj?.Company || ''}">
        <label>Role</label>
        <input type="text" class="Position_experiences" value = "${obj?.Position || ''}">
        <label>From</label>
        <input type="date" class="From_experiences" value = "${obj?.From || ''}">
        <label>To</label>
        <input type="date"  class="To_experiences" value = "${obj?.To || ''}">
    `
    experiencesList.appendChild(experiencesItem);
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

        if (Id === "Phone" && !phoneRegex.test(input.value))
            return showMessage(badMessage, `Invalid ${Id} number`);

        if (Id === "Email" && !emailRegex.test(input.value))
            return showMessage(badMessage, `Invalid ${Id} address`);
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

    let eventData = getData();
    eventData.push(InformationObject);

    localStorage.setItem("employeesInformation", JSON.stringify(eventData));
    showMessage(goodMessage, "Employee added successfully!")
    addEmployeeFrom.reset();
    unassignedList.innerHTML = ""
    afficheEmployeesCards();
    return true;
}

function afficheEmployeesCards() {
    const afficheCards = getData();
    if (!afficheCards)
        return;
    afficheCards.forEach(employee => {
        displayEmployeesCards(employee);
    })

    function displayEmployeesCards(employee) {
        const employeeCard = document.createElement("div");
        employeeCard.className = "employee-card";
        employeeCard.innerHTML = `
            <img onclick = "afficheEmployeeInformation('${employee.Id}')" src="${employee.Photo || '../IMG/Admin-Profile-Vector-PNG-Clipart.png'}" alt="">
            <div class="employee-info" onclick = "afficheEmployeeInformation('${employee.Id}')">
                <h3>${employee.Name}</h3>
                <p>${employee.Role}</p>
            </div>
            <div class="thesupedit_btn">
                <button class="edite_btn" onclick = "editEmployeeInformation('${employee.Id}')"><img src="IMG/write_11368664.png" alt=""></button>
                <button class="delete_btn" onclick = "suprimeEmployeesCards('${employee.Id}')"><img src="IMG/delete_15917854.png" alt=""></button>
            </div>
    `
        unassignedList.appendChild(employeeCard);
    }
}

function afficheEmployeeInformation(id) {
    const searchEmployee = getData();
    let searchEmployeeById = searchEmployee.find((e) => e.Id === id)
    profailModal.style.display = "flex"
    profailModal.innerHTML = `
        <div class="employee_profaile">
            <div class="employee_title">
                <h2>Employee Profile</h2>
                <button class="close_btn" onclick="closeEmployeeInformation()"">✕</button>
            </div>
            <div class="employee_info">
                <div class="employe_img">
                    <img src="${searchEmployeeById.Photo || '../IMG/Admin-Profile-Vector-PNG-Clipart.png'}"
                        alt="">
                </div>
                <div class="employe_name">
                    <h3>${searchEmployeeById.Name}</h3>
                    <span>${searchEmployeeById.Role}</span>
                </div>
            </div>
            <div class="employe_contact">
                <div>📧 ${searchEmployeeById.Email}</div>
                <div>📱 ${searchEmployeeById.Phone}</div>
            </div>
            <div class="employe_professional_exp" id ="employe_professional_exp">
                <h3>Professional Experiences</h3>
            </div>
        </div>
    `
    const employeProfessionalExp = document.getElementById("employe_professional_exp");
    searchEmployeeById.Experiences.forEach(experience => {
        const employeeExperiences = document.createElement("div");
        employeeExperiences.className = "employeeExperiences"
        employeeExperiences.innerHTML += `
            <div><span>Company:</span> ${experience.Company} </div>
            <div><span>Role:</span> ${experience.Position} </div>
            <div><span>From:</span> ${experience.From} </div>
            <div><span>To:</span> ${experience.To} </div>
        `
        employeProfessionalExp.appendChild(employeeExperiences);
    })
}

function closeEmployeeInformation() {
    profailModal.style.display = "none"
}

function editEmployeeInformation(id) {
    const addTitle = document.getElementById("add_Title")
    addTitle.textContent = "✍️Employee information modification"
    addEmployeeBtn.textContent = "Modify"
    experiencesList.innerHTML = "";
    const searchEmployee = getData();
    let searchEmployeeById = searchEmployee.find((e) => e.Id === id);
    addModal.style.display = "flex"
    document.getElementById("Name").value = searchEmployeeById.Name
    document.getElementById("Role").value = searchEmployeeById.Role
    document.getElementById("Photo").value = searchEmployeeById.Photo
    document.getElementById("Email").value = searchEmployeeById.Email
    document.getElementById("Phone").value = searchEmployeeById.Phone

    searchEmployeeById.Experiences.forEach(experience => addNewEexperience(experience))
    addEmployeeFrom.onsubmit = null;
    addEmployeeFrom.onsubmit = function (e) {
        e.preventDefault();
        if (addEmployeeBtn.textContent == "Modify") {
            if (addEmployee()) {
                suprimeEmployeesCards(id);
                addTitle.textContent = "➕ Add New Employee"
                addEmployeeBtn.textContent = "Add Employee"
                showMessage(goodMessage, "The employee’s information has been updated successfully.");
                addModal.style.display = "none";
            }
        }
    }
}

function suprimeEmployeesCards(id) {
    const searchEmployee = getData();
    let deleteEmployeeById = searchEmployee.filter((e) => e.Id !== id);
    localStorage.setItem("employeesInformation", JSON.stringify(deleteEmployeeById));
    unassignedList.innerHTML = ""
    afficheEmployeesCards();
}
// ----------------------------------------------------------
const zoneButtons = document.querySelectorAll(".add_zone_btn")
zoneButtons.forEach(btn => {
    btn.addEventListener("click", function () {
        document.getElementById("selest_modal").style.display = "flex";
        let zoneId = btn.parentElement.parentElement.id;
        let employeeList = btn.parentElement.parentElement.children[1].id;
        openEmployeeSelector(zoneId, employeeList);
    })
})
// ----------------------------------------------------------

function openEmployeeSelector(zoneId, employeeList) {
    let renderPerRole = [];

    switch (zoneId) {
        case "Conference":
            renderPerRole = ["Receptionist", "IT Technician", "Security Agent", "Manager", "Cleaning", "General Staff"];
            break;
        case "Staff":
            renderPerRole = ["Receptionist", "IT Technician", "Security Agent", "Manager", "Cleaning", "General Staff"];
            break;
        case "server":
            renderPerRole = ["IT Technician", "Manager", "Cleaning"];
            break;
        case "Security":
            renderPerRole = ["Security Agent", "Manager", "Cleaning"];
            break;
        case "Reception":
            renderPerRole = ["Receptionist", "Manager", "Cleaning"];
            break;
        case "Archives":
            renderPerRole = ["Receptionist", "IT Technician", "Security Agent", "Manager", "General Staff"];
            break;
    }



    let employeesData = getData();
    selectionList.innerHTML = "";
    employeesData.forEach(employee => {
        if (renderPerRole.includes(employee.Role)) {
            renderFilteredEmployees(employee, employeeList)
        }
    })
}

function renderFilteredEmployees(employee, employeeList) {
    selectionList.innerHTML += `
        <div class = "employee-card" style = "cursor: pointer;" onclick = "saveDataRoominLocal('${employee.Id}', '${employeeList}')"> 
            <img src="${employee.Photo || '../IMG/Admin-Profile-Vector-PNG-Clipart.png'}" alt="">
            <div class="employee-info">
                <h3>${employee.Name}</h3>
                <p>${employee.Role}</p>
            </div>
        </div>
     `
}

function saveDataRoominLocal(employeId, employeeList) {
    let roomsDataLocal = EmployeeRoomData();
    const employeesData = getData();
    let searchEmployeeById = employeesData.find((e) => e.Id === employeId);
    roomsDataLocal.push({ employeId, employeeList, searchEmployeeById });
    localStorage.setItem("roomsData", JSON.stringify(roomsDataLocal));
    suprimeEmployeesCards(employeId);
    employeeListRoom.innerHTML = "";
    AddEmployeeToRoom();
    document.getElementById("selest_modal").style.display = "none";
}

function AddEmployeeToRoom(){
    let roomsDataLocal = EmployeeRoomData();
    roomsDataLocal.forEach(worker => {
        const displayemployeeinRoom = document.getElementById(worker.employeeList);
        displayemployeeinRoom.innerHTML += `
        <div class="employee_room_list">
            <div>
                <img src="${worker.searchEmployeeById.Photo || '../IMG/Admin-Profile-Vector-PNG-Clipart.png'}" alt="">
            </div>
            <div>
                <h3>${worker.searchEmployeeById.Name}</h3>
            </div>
            <div>
                <button>✕</button>
            </div>
        </div>
    `
    })
}

function EmployeeRoomData() {
    let roomData = localStorage.getItem("roomsData");
    return roomData ? JSON.parse(roomData) : [];
}


function initApp() {
    unassignedList.innerHTML = "";
    employeeListRoom.innerHTML = "";
    afficheEmployeesCards();
    AddEmployeeToRoom();
}
initApp();