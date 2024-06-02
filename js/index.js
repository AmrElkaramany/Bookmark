var siteNameInputs = document.getElementById('siteName');
var siteUrlInputs = document.getElementById('siteUrl');
var siteArr = [];


if (localStorage.getItem('sites') == null) {
    siteArr = []
}
else {
    siteArr = JSON.parse(localStorage.getItem('sites', siteArr))
    displaySites();
}


function addSite() {
    var site = {
        code: siteNameInputs.value,
        url: siteUrlInputs.value
    }
    if (validateUrl() == true) {
        siteArr.push(site);
        clearForm();
        displaySites()
        localStorage.setItem('sites', JSON.stringify(siteArr))
    }
    else {
        alert('you should enter Valid Url')
    }
}

function clearForm() {
    siteNameInputs.value = null;
    siteUrlInputs.value = null;
}


function displaySites() {
    var carton = '';
    for (var i = 0; i < siteArr.length; i++) {
        carton += `  <tr>
        <td>${i}</td>
        <td>${siteArr[i].code}</td>
        <td><a href="${siteArr[i].url}" target="_blank"><button class="btn btn-outline-info">Visit</button></a></td>
        <td><button onclick="UpdateSites(${i});" class="btn btn-outline-success">Update</button></td>
        <td><button  onclick="deleteSites(${i});" class="btn btn-outline-danger">Delete</button></td>
    </tr>`
    }
    document.getElementById('tableData').innerHTML = carton;
}


function deleteSites(term) {
    siteArr.splice(term, 1);
    localStorage.setItem('sites', JSON.stringify(siteArr));
    displaySites();
}


var terms;
function UpdateSites(hamBozo) {
    terms = hamBozo;
    siteNameInputs.value = siteArr[hamBozo].code;
    siteUrlInputs.value = siteArr[hamBozo].url;
    updating.classList.remove('d-none');
    adding.classList.add('d-none');
}

function UpdateSites22(terms) {
    siteArr[terms].code = siteNameInputs.value;
    siteArr[terms].url = siteUrlInputs.value;
    updating.classList.add('d-none');
    adding.classList.remove('d-none');
    localStorage.setItem('sites', JSON.stringify(siteArr));
    displaySites();
    clearForm();
}









var regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

function validateUrl() {


    if (regex.test(siteUrlInputs.value)) {
        siteUrlInputs.classList.add('is-valid')
        siteUrlInputs.classList.remove("is-invalid")
        return true
    }
    else {
        siteUrlInputs.classList.remove('is-valid')
        siteUrlInputs.classList.add("is-invalid")
        return false
    }

}
