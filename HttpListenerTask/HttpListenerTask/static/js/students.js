class Student {
    constructor (id, lastName, firstName, middleName, birthDate, groupId, email) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.middleName = middleName;
        this.birthDate = birthDate;
        this.groupId = groupId;
        this.email = email;
    }
}

function addStudent(student) {
    var table = document.getElementsByClassName("table")[0];
    table.innerHTML += '<div class="row"><div class="cell">' + student.id + '</div>' + 
                                     '<div class="last-name cell">' + student.lastName + '</div>' + 
                                     '<div class="first-name cell">' + student.firstName + '</div>' + 
                                     '<div class="middle-name cell">' + student.middleName + '</div>' + 
                                     '<div class="cell">' + student.birthDate + '</div>' + 
                                     '<div class="cell">' + student.groupId + '</div>' + 
                                     '<div class="cell">' + student.email + '</div></div>';
}

function sorting(property) {
    switch (property) {
        case "last-name":
            students.sort(function(a, b) {
                return a.lastName.localeCompare(b.lastName);
            });
            break;
        case "first-name":
            students.sort(function(a, b) {
                return a.firstName.localeCompare(b.firstName);
            });
            break;
        case "middle-name":
            students.sort(function(a, b) {
                return a.middleName.localeCompare(b.middleName);
            });
            break;
        default:
            return 0;
    }
    document.getElementsByClassName("table")[0].innerHTML = "";
    students.forEach(student => addStudent(student));
}

function addStudentFromForm() {
    fields = document.getElementsByClassName("form-input");
    
    for (field of fields){
        if (field.value == ""){
            alert("Заполните все поля");
            return 0;
        }
    }

    let id = fields[0].value;
    let lastName = fields[1].value;
    let firstName = fields[2].value;
    let middleName = fields[3].value;
    let birthDate = fields[4].value;
    let groupId = fields[5].value;
    let email = fields[6].value;

    let idRegexp = /^\d+$/;
    if (!idRegexp.test(id)){
        alert("Некорректный ID");
        return 0;
    }
    for (let student of students){
        if (student.id == parseInt(id)){
            alert("Такой ID уже есть");
            return 0;
        }
    }
        
    let fullNameRegexp = /^[A-Z][a-z]+$/;
    if (!fullNameRegexp.test(lastName)){
        alert("Некорректная фамилия");
        return 0;
    }
    if (!fullNameRegexp.test(firstName)){
        alert("Некорректное имя");
        return 0;
    }
    if (!fullNameRegexp.test(middleName)){
        alert("Некорректное отчество");
        return 0;
    }

    let birthDateRegexp = /^(0?[1-9]|[12][0-9]|3[01])[\.](0?[1-9]|1[012])[\.](19[0-9][0-9]|20[0-1][0-9])$/;
    if (!birthDateRegexp.test(birthDate)){
        alert("Некорректная дата рождения");
        return 0;
    }

    let groupIdRegexp = /^11[\-]\d{3}$/;
    if (!groupIdRegexp.test(groupId)){
        alert("Некорректный номер группы");
        return 0;
    }

    let emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegexp.test(email)) {
        alert("Некорректный адрес электронной почты");
        return 0;
    }

    newStudent = new Student(fields[0].value, 
                             fields[1].value, 
                             fields[2].value, 
                             fields[3].value, 
                             fields[4].value, 
                             fields[5].value, 
                             fields[6].value);
    students.push(newStudent);
    addStudent(newStudent);
}

function filtration(value, property) {
    document.getElementsByClassName("table")[0].innerHTML = "";
    switch (property) {
        case "last-name":
            students.forEach(student => student.lastName.startsWith(value) ? addStudent(student) : false)
            break;
        case "first-name":
            students.forEach(student => student.firstName.startsWith(value) ? addStudent(student) : false)
            break;
        case "middle-name":
            students.forEach(student => student.middleName.startsWith(value) ? addStudent(student) : false)
            break;
        default:
            return 0;
    }
} 

var students = [];
students.push(new Student(0, "Sagadeev", "Artem", "Timurovich", "01.02.2001", "11-909", "sagadeev@gmail.com"));
students.push(new Student(1, "Ivanov", "Ivan", "Ivanovich", "02.02.2001", "11-909", "ivanov@gmail.com"));
students.push(new Student(2, "Sergeev", "Sergey", "Sergeevich", "03.02.2001", "11-909", "sergeev@gmail.com"));
students.push(new Student(3, "Maksimov", "Maksim", "Maksimovich", "04.02.2001", "11-909", "maksimov@gmail.com"));
students.push(new Student(4, "Pavlov", "Pavel", "Pavlovich", "05.02.2001", "11-909", "pavlov@gmail.com"));

window.onload = function() {
    students.forEach(student => addStudent(student));
}