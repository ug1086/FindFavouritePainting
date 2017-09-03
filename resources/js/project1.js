var storeGender;
var storeType;
var storeFeature;
var validationMsg;

//JSON data for first select menu
var gender = {
    Man: 'Man',
    Woman: 'Woman'
};

//JSON data for second select menu
var bodyType = {
    "Man": {
        H: "Facial Hair",
        NH: "No Facial Hair"
    },
    "Woman": {
        BL: "Blonde",
        BR: "Brunette"
    }
};

//JSON data for third select menu
var bodyFeatures = {
    "H": {
        Complexion: "",
        Dark: "D",
        Light: "L"
    },
    "NH": {
        Build: "",
        Bulky: "B",
        Strong: "S"
    },
    "BL": {
        Height: "",
        Tall: "T",
        Short: "S"
    },
    "BR": {
        Eyes: "",
        Brown: "Br",
        Black: "Bl"
    }
};

//function called as soon as the window loads
window.onload = function () {
    uName = document.createElement('label');
    uName.setAttribute('id', 'uName');
    uName.innerHTML = "Enter your name: ";
    inputName = document.createElement('input');
    inputName.setAttribute('id', 'inputName');
    inputName.setAttribute('type', 'text');
    uAge = document.createElement('label');
    uAge.setAttribute('id', 'uAge');
    uAge.innerHTML = "Enter your age: ";
    inputAge = document.createElement('input');
    inputAge.setAttribute('id', 'inputAge');
    inputAge.setAttribute('type', 'text');
    var btn = document.createElement('button');
    btn.setAttribute('id', 'btn');
    btn.setAttribute('class', 'btn btn-info');
    btn.appendChild(document.createTextNode("Submit"));
    btn.addEventListener("click", saveValues);  //event listerner called for saving the value to local storage!
    hiMsg = document.createElement('p');
    hiMsg.setAttribute('id', 'hiMsg');
    validationMsg = document.createElement('div');
    validationMsg.setAttribute('id','vMsg')
    hrTag = document.createElement('hr');
    //appending various elements on to the main element
    main.appendChild(hiMsg);
    main.appendChild(uName);
    main.appendChild(inputName);
    main.appendChild(document.createElement('br'));
    main.appendChild(uAge);
    main.appendChild(inputAge);
    main.appendChild(validationMsg);
    main.appendChild(document.createElement('br'));
    main.appendChild(btn);
    main.appendChild(hrTag);
    loadValues();
    genderSel = document.createElement('select');
    genderSel.setAttribute('id', 's1');
    genderSel.setAttribute('class', 'form-control'); //bootstrap class for adding styles to select
    genderSel.options[0] = new Option('Select Gender', "")
    genderSel.options[0].disabled = true;
    for (var option in gender) {
        genderSel.options[genderSel.options.length] = new Option(option, gender[option]);
    }
    genderSel.addEventListener("change", populate1); //event listerner called to populate first select menu!
    main = document.getElementById('main');
    section1 = document.getElementById('section1');
    section1.appendChild(genderSel);
    section2 = document.createElement('section');
    section2.setAttribute('id', 'section2');
    section3 = document.createElement('section');
    section3.setAttribute('id', 'section3');
    result = document.createElement('div');
    result.setAttribute('id', 'result');
    main.appendChild(section1);
    main.appendChild(section2);
    main.appendChild(section3);
    main.appendChild(result);
}

//function for saving value to local storage
function saveValues() {
    if (typeof (Storage) !== "undefined") {
        var nameTextEle = document.getElementById('inputName');
        var name = nameTextEle.value;
        var ageTextEle = document.getElementById('inputAge');
        var age = ageTextEle.value;
        console.log("name " + name);
        if (name == null || name == "") {
            alert("Name must be filled out!");
            return;
        }
        if (age=="" || isNaN(age)) {
            alert("Age must be filled out!");
            return;
        }
        _user = document.getElementById('inputName').value;
        localStorage.setItem('Name', _user);
        _age = document.getElementById('inputAge').value;
        localStorage.setItem('Age', _age);
        alert("Save successful!")
    } else {
        alert('Your browser does not support localstorage...');
    }
}

//function for retrieving value from local storage
function loadValues() {
    var storedValue = localStorage.getItem('Name');
    var storedAge = localStorage.getItem('Age');
    console.log(storedValue);
    if (storedValue!= null) {
        hiMsg.innerHTML = "Hi " + storedValue;
        document.getElementById('inputAge').value = storedAge;
    }
}

//function to validate if the user has entered a value to the input field
function doValidation() {
    
}

//function for populating select menu
function populate1(e) {
    while (section2.firstChild) {
        section2.removeChild(section2.firstChild);
    }
    while (section3.firstChild) {
        section3.removeChild(section3.firstChild);
    }
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
    typeSel = document.createElement('select');
    typeSel.setAttribute('id', 's2');
    typeSel.setAttribute('class', 'form-control');
    section2.appendChild(typeSel);
    var ele = e.target;
    typeSel.options[0] = new Option("Hair Type?", null);
    typeSel.options[0].disabled = true;
    for (var option in bodyType) {
        console.log(option);
        console.log(ele.options[ele.selectedIndex].value);
        if (ele.options[ele.selectedIndex].value == option) {
            for (var option2 in bodyType[option]) {
                var temp = bodyType[option];
                console.log(temp[option2]);
                typeSel.options[typeSel.options.length] = new Option(temp[option2], option2);
            }
        }
    }
    storeGender = ele.options[ele.selectedIndex].text;
    console.log("store gender", storeGender);
    typeSel.addEventListener("change", populate2);//event listerner called to populate second select menu!
}

//function for populating select menu
function populate2(e) {
    while (section3.firstChild) {
        section3.removeChild(section3.firstChild);
    }
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
    var ele = e.target;
    for (var index in bodyFeatures) {
        console.log(index);
        console.log(ele.options[ele.selectedIndex].value);
        if (ele.options[ele.selectedIndex].value == index) {
            console.log(bodyFeatures[index]);
            var optionArray = bodyFeatures[index];
            featureSel = document.createElement('select');
            featureSel.setAttribute('id', 's3');
            featureSel.setAttribute('class', 'form-control');
            section3.appendChild(featureSel);
            addOptions1(optionArray);
        }
    }
    storeType = ele.options[ele.selectedIndex].text;
    console.log("store type", storeType);
    featureSel.addEventListener("change", populate3);//event listerner called to populate third select menu!
}

//function for populating select menu
function populate3(e) {
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
    var ele = e.target;
    storeFeature = ele.options[ele.selectedIndex].text;
    if (storeGender == "Woman" && (storeFeature == "Tall" || storeFeature == "Short")) {
        storeFeature = storeFeature + " height!";
    } else if (storeGender == "Woman" && (storeFeature == "Brown" || storeFeature == "Black")) {
        storeFeature = storeFeature + " eyes!";
    }
    console.log("store feature", storeFeature);
    var ptag = document.createElement('p');
    if (storeGender == "Man" && (storeType == "Facial Hair" || storeType == "No Facial Hair")) {
        ptag.innerHTML = ("You are looking for a " + storeGender + " with " + storeType + " and " + storeFeature + " features!");
    }
    else if (storeGender == "Woman" && (storeType == "Blonde" || storeType == "Brunette")) {
        ptag.innerHTML = ("You are looking for a " + storeType + " " + storeGender + " with " + storeFeature);
    }
    result.appendChild(ptag);
}

//function for adding options to select menu
function addOptions1(optionArray) {
    for (var option in optionArray) {
        featureSel.options[featureSel.options.length] = new Option(option, optionArray[option]);
        featureSel.options[0].disabled = true;
    }
}

/*
references:
http://www.dyn-web.com/tutorials/forms/select/paired.php
https://www.youtube.com/watch?v=5ttpghXjG0g
https://www.w3schools.com/html/html5_webstorage.asp
https://tympanus.net/codrops/2014/07/10/inspiration-for-custom-select-elements/
https://developer.mozilla.org/en-US/docs/Web/API/Event/target

*/