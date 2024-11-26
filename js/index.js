var bookMarkName = document.getElementById("siteName");
var bookMarkUrl = document.getElementById("siteUrl");

var bookMarkList = [];

if (JSON.parse(localStorage.getItem("BookMarkContainer")) !== null) {

    bookMarkList = JSON.parse(localStorage.getItem("BookMarkContainer"));

    displayData();
}


function addBookMark() {
    if (validationName() === true && validationUrl() === true) {

        let checkName = false;

        for (let i = 0; i < bookMarkList.length; i++) {

            if (bookMarkList[i].name === bookMarkName.value) {
                checkName = true;
                break;
            }
        }
        if (checkName) {
            Swal.fire({
                icon: "error",
                text: "This Book Mark aleardys Exist",
            });
            return;
        }

        var bookMark = {

            name: bookMarkName.value,
            url: bookMarkUrl.value,
        };

        bookMarkList.push(bookMark);

        clearForm();

        displayData();

        localStorage.setItem("BookMarkContainer", JSON.stringify(bookMarkList));

    }
}

function displayData() {
    var tableContent = "";
    for (var i = 0; i < bookMarkList.length; i++) {
        tableContent += `   
        <tr>
            <td>${i + 1}</td>
            <td>${bookMarkList[i].name}</td>
            <td>
                <button class="btn btn-primary my-btn text-white" >
                <i class="fa-solid fa-eye pe-2"></i>  <a class="text-decoration-none text-white" href="${bookMarkList[i].url}" target="blank" >Visit</a>
            </button>
            </td>
            <td><button onclick="deleteBookMark(${i})" class="btn btn-danger  text-white" ><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        </tr>`;
    }

    document.getElementById("dataTable").innerHTML = tableContent;
}

function clearForm() {

    bookMarkName.value = "";
    bookMarkUrl.value = "";

    bookMarkName.classList.remove("is-valid");
    bookMarkUrl.classList.remove("is-valid");
}

function deleteBookMark(index) {

    bookMarkList.splice(index, 1);

    localStorage.setItem("BookMarkContainer", JSON.stringify(bookMarkList));

    displayData();
    
}

function validationName() {

    var regex = /^[a-zA-Z]{3,20}$/;

    var text = bookMarkName.value;
    var msgName = document.getElementById("msgName");

    if (regex.test(text) === true) {

        bookMarkName.classList.add("is-valid");
        bookMarkName.classList.remove("is-invalid");
        msgName.classList.add("d-none");

        return true;
    } else if (regex.test(text) === false) {

        bookMarkName.classList.remove("is-valid");
        bookMarkName.classList.add("is-invalid");
        msgName.classList.remove("d-none");

        return false;
    }
}

function validationUrl() {

    var regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    
    var text = bookMarkUrl.value;
    var msgUrl = document.getElementById("msgUrl");

    if (regex.test(text)) {

        bookMarkUrl.classList.add("is-valid");
        bookMarkUrl.classList.remove("is-invalid");
        msgUrl.classList.add("d-none");

        return true;
    } else {

        bookMarkUrl.classList.remove("is-valid");
        bookMarkUrl.classList.add("is-invalid");
        msgUrl.classList.remove("d-none");

        return false;
    }
}



