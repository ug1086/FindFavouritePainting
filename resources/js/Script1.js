// JavaScript source code
var storeGender;
var storeType;
var storeFeature;
var validationMsg;

//JSON data for first select menu
var country = {
    ITA: 'Italy',
    SPA: 'Spain',
    FRA: 'France',
    NTH: 'Netherlands',
};

//JSON data for second select menu
var painters = {
    "ITA": {
        RF: "Raphael",
        LDV: "Leonardo da Vinci",
        MLO: "Michelangelo"
    },
    "SPA": {
        PP: "Pablo Picasso",
        FG: "Francisco Goya",
        EG: "El Greco"
    },
    "FRA": {
        CM: "Claude Monet",
        PC: "Paul Cezanne"
    },
    "NTH": {
        VVG: "Vincent van Gogh",
        RDT: "Rembrandt"
    }
};

//JSON data for third select menu
var paintings = {
    "RF": {
        SA: "The School of Athens",
        TF: "Transfiguration",
        TSM: "The Sistine Madonna",
        MOV: "The Marriage of the Virgin"
    },
    "LDV": {
        ML: "Mona Lisa",
        TLS: "The Last Supper",
        TVR: "The Virgin of the Rocks",
        VM: "Vitruvian Man",
        AN: "Annunciation"
    },
    "MLO": {
        SCC: "Sistine Chapel ceiling",
        PT: "Pieta",
    },
    "PP": {
        GR: "Guernica",
        LD: "Les Demoiselles d'Avignon",
        TOD: "The Old Guitarist",
        TWW: "The Weeping Woman",
        TM: "Three Musicians"
    },
    "FG": {
        TTM: "The Third of May 1808",
        LC: "Los caprichos"
    },
    "EG": {
        TDC: "The Disrobing of Christ",
        VT: "View of Toledo"
    },
    "CM": {
        IS: "Impression, Sunshine",
        WWP: "Woman with a Parasol",
        PO: "Poppoes",
        HOP: "Houses of Parliament"
    },
    "PC": {
        TCP: "The Card Players",
        TB: "The Bathers"
    },
    "VVG": {
        TSN: "The Starry Night",
        IR: "Irises",
        CTN: "Cafe Terrace at Night"
    },
    "RDT": {
        TNW: "The Night Watch",
        TJB: "The Jewish Bride"
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
    validationMsg.setAttribute('id', 'vMsg')
    hrTag = document.createElement('hr');
    //appending various elements on to the main element
    main.appendChild(hiMsg);
    main.appendChild(uName);
    main.appendChild(inputName);
    main.appendChild(document.createElement('br'));
    main.appendChild(document.createElement('br'));
    main.appendChild(uAge);
    main.appendChild(inputAge);
    main.appendChild(validationMsg);
    main.appendChild(document.createElement('br'));
    main.appendChild(btn);
    main.appendChild(hrTag);
    loadValues();
    countrySel = document.createElement('select');
    countrySel.setAttribute('id', 's1');
    countrySel.setAttribute('class', 'form-control'); //bootstrap class for adding styles to select
    countrySel.options[0] = new Option('Select Country', "")
    countrySel.options[0].disabled = true;
    for (var option in country) {
        countrySel.options[countrySel.options.length] = new Option(country[option], option);
    }
    countrySel.addEventListener("change", populate1); //event listerner called to populate first select menu!
    main = document.getElementById('main');
    section1 = document.getElementById('section1');
    section1.appendChild(countrySel);
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
        if (age == "" || isNaN(age)) {
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
    if (storedValue != null) {
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
    painterSel = document.createElement('select');
    painterSel.setAttribute('id', 's2');
    painterSel.setAttribute('class', 'form-control');
    section2.appendChild(painterSel);
    var ele = e.target;
    painterSel.options[0] = new Option("Select Painter", null);
    painterSel.options[0].disabled = true;
    for (var option in painters) {
        console.log(option);
        console.log(ele.options[ele.selectedIndex].value);
        if (ele.options[ele.selectedIndex].value == option) {
            for (var option2 in painters[option]) {
                var temp = painters[option];
                console.log(temp[option2]);
                painterSel.options[painterSel.options.length] = new Option(temp[option2], option2);
            }
        }
    }
    storeCountry = ele.options[ele.selectedIndex].text;
    console.log("store country", storeCountry);
    painterSel.addEventListener("change", populate2);//event listerner called to populate second select menu!
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

    for (var index in paintings) {
        console.log(index);
        console.log(ele.options[ele.selectedIndex].value);
        if (ele.options[ele.selectedIndex].value == index) {
            console.log(paintings[index]);
            var optionArray = paintings[index];
            paintingSel = document.createElement('select');
            paintingSel.setAttribute('id', 's3');
            paintingSel.setAttribute('class', 'form-control');
            section3.appendChild(paintingSel);
            addOptions1(optionArray);
        }
    }
    storePainter = ele.options[ele.selectedIndex].text;
    console.log("store painter", storePainter);
    paintingSel.addEventListener("change", populate3);//event listerner called to populate third select menu!
}

//function for populating select menu
function populate3(e) {
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
    var ele = e.target;

    selectedValue = ele.options[ele.selectedIndex].value;
    console.log("painting", selectedValue);
    var paintingImg = document.createElement("img");
    paintingImg.setAttribute('id', 'paintingImg');
    paintingImg.src = "../Project 1/resources/images/" + selectedValue + ".jpg";
    console.log(paintingImg.src);
    paintingImg.alt = "Painting Image";
    paintingImg.setAttribute("style", "height:240px;width:300px");
    paintingImg.setAttribute("class", "img-responsive");
    result.appendChild(paintingImg);
}

//function for adding options to select menu
function addOptions1(optionArray) {
    paintingSel.options[0] = new Option("Select Painting", null);
    for (var option in optionArray) {
        paintingSel.options[paintingSel.options.length] = new Option(optionArray[option], option);
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