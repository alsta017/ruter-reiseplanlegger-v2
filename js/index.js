let fraForm = document.querySelector(".fra_form");
let tilForm = document.querySelector(".til_form");
let fraInput = document.getElementById("fra_input")
let tilInput = document.getElementById("til_input")
let fraVelg = document.getElementById("fra_velg");
let tilVelg = document.getElementById("til_velg");
let fratil = document.querySelector(".fratil");
let søkeButton = document.querySelector(".søkebutton")
let icon = document.querySelector(".icon");
let ekstra_valgEl = document.querySelector(".ekstra_valg")
let avgangbuttonEl = document.querySelector(".avgangbutton")
let ankomstbuttonEl = document.querySelector(".ankomstbutton")
let avgangbuttonidEl = document.getElementById("avgangbuttonid")
let ankomstbuttonidEl = document.getElementById("ankomstbuttonid")
let nowbuttonEl = document.querySelector(".nowbutton")
let datetimepickerEl = document.getElementById("datetimepicker")
let avansert_ekstra_valgEl = document.getElementById("avansert_ekstra_valg")
let avansert_ekstra_valg_buttonEl = document.getElementById("avansert_ekstra_valg_button")
let arrowEl = document.getElementById("arrow");
let byttetididEl = document.getElementById("byttetidid");
let byttetiddivEl = document.getElementById("byttetiddiv");
let velgArr = [];
let stedArr = [];
let velgArr2 = [];
let stedArr2 = [];
let searchTimeout;
let searchTimeout2;
let fraclickedid;
let tilclickedid;
let geocoder_til_data;
let geocoder_fra_data;
datetimepickerEl.style.display = "none";

if (localStorage.getItem("light_mode") == "true") {
    darkmodecheck()
} else {
    localStorage.setItem("light_mode", "false");
}

fraInput.onkeydown = function() {
    velgArr = [];
    fraVelg.textContent = "";
    fraVelg.style.display = "flex";

    let tilload = document.createElement("p");
    tilload.textContent = "Loading...";
    fraVelg.appendChild(tilload);

    if (searchTimeout != undefined) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(fra_geocoder_fra, 500);
};

function fra_geocoder_fra() {
    fetch(`https://api.entur.io/geocoder/v1/autocomplete?text=${fraInput.value}`, {
            headers: {
                "ET-Client-Name": "alsta-bussen",
            },
        })
        .then(response => response.json())
        .then(data => {
            stedArr = [];
            velgArr = [];
            fraVelg.textContent = "";
            a = 0;
            console.log(data);
            geocoder_fra_data = data;
            for(x = 0; x < data.features.length; x++) {
                a++;
                let stasjonsP = document.createElement("p");
                stasjonsP.className = "stasjonsP";
                stasjonsP.setAttribute("id", `${a}`)
                stasjonsP.setAttribute("onclick", "buttonclicked(this.id)");
                stasjonsP.innerHTML = data.features[x].properties.label;
                let icon;
                let icon2;
                let icon3;
                let icon4;
                let icon5;
                let icon6;
                let icon7;
                let icon8;
                for (y = 0; y < data.features[x].properties.category.length; y++) {
                    if(data.features[x].properties.category[y] === "onstreetBus" | data.features[x].properties.category[y] === "busStation" | data.features[x].properties.category[y] === "coachStation") {
                        if (!icon) {
                            icon = document.createElement("i");
                            icon.className = "fa-solid fa-bus icon bus";
                            stasjonsP.appendChild(icon);
                        }
                    } else if(data.features[x].properties.category[y] === "metroStation") {
                        if (!icon2) {
                            icon2 = document.createElement("i");
                            icon2.className = "fa-solid fa-train-subway icon metro";
                            stasjonsP.appendChild(icon2)
                        }
                    } else if(data.features[x].properties.category[y] === "onstreetTram" | data.features[x].properties.category[y] === "tramStation") {
                        if (!icon3) {
                            icon3 = document.createElement("i");
                            icon3.className = "fa-solid fa-train-tram icon tram";
                            stasjonsP.appendChild(icon3)
                        }
                    } else if(data.features[x].properties.category[y] === "railStation") {
                        if (!icon4) {
                            icon4 = document.createElement("i");
                            icon4.className = "fa-solid fa-train icon train";
                            stasjonsP.appendChild(icon4)
                        }
                    } else if(data.features[x].properties.category[y] === "ferryStop" | data.features[x].properties.category[y] === "harbourPort" | data.features[x].properties.category[y] === "ferryPort" | data.features[x].properties.category[y] === "ferryStop") {
                        if (!icon5) {
                            icon5 = document.createElement("i");
                            icon5.className = "fa-solid fa-ferry icon ferry";
                            stasjonsP.appendChild(icon5)
                        }
                    } else if(data.features[x].properties.category[y] === "airport") {
                        if (!icon6) {
                            icon6 = document.createElement("i");
                            icon6.className = "fa-solid fa-plane-departure icon airport";
                            stasjonsP.appendChild(icon6)
                        }
                    } else if(data.features[x].properties.category[y] === "liftStation") {
                        if (!icon8) {
                            icon8 = document.createElement("i");
                            icon8.className = "fa-solid fa-cable-car icon lift";
                            stasjonsP.appendChild(icon8)
                        }
                    } else {
                        if (!icon7) {
                            icon7 = document.createElement("i");
                            icon7.className = "fa-solid fa-location-dot icon point";
                            stasjonsP.appendChild(icon7)
                        }
                    }
                }
                var fraId = data.features[x].properties.id;
                var stasjonsnavn = data.features[x].properties.label;
                fraVelg.appendChild(stasjonsP);
                velgArr.push(fraId);
                stedArr.push(stasjonsnavn);
            }
            if(velgArr.length === 0) {
                let tilnoresult = document.createElement("p")
                if(fraInput.value.length == 0) {
                    fraVelg.removeChild(tilnoresult);
                } else {
                    tilnoresult.textContent = "Ingen resultater."
                }
                fraVelg.appendChild(tilnoresult)
            }
        }) 
}
function buttonclicked(clicked_id) {
    fraVelg.style.display = "none";
    fraInput.value = stedArr[clicked_id - 1];
    stedArr = [];
    fraclickedid = clicked_id - 1;
}

tilInput.onkeydown = function() {
    velgArr2 = [];
    tilVelg.textContent = "";
    tilVelg.style.display = "flex";

    let tilload2 = document.createElement("p");
    tilload2.textContent = "Loading...";
    tilVelg.appendChild(tilload2);

    if (searchTimeout2 != undefined) clearTimeout(searchTimeout2);
    searchTimeout2 = setTimeout(fra_geocoder_til, 500);
};

function fra_geocoder_til() {
    fetch(`https://api.entur.io/geocoder/v1/autocomplete?text=${tilInput.value}`, {
            headers: {
                "ET-Client-Name": "alsta-bussen",
            },
        })
        .then(response => response.json())
        .then(data => {
            stedArr2 = [];
            velgArr2 = [];
            tilVelg.textContent = "";
            a = 0;
            console.log(data);
            geocoder_til_data = data;
            for(x = 0; x < data.features.length; x++) {
                a++;
                let stasjonsP = document.createElement("p");
                stasjonsP.className = "stasjonsP";
                stasjonsP.setAttribute("id", `${a}`)
                stasjonsP.setAttribute("onclick", "buttonclickedtil(this.id)");
                stasjonsP.innerHTML = data.features[x].properties.label;
                let icon;
                let icon2;
                let icon3;
                let icon4;
                let icon5;
                let icon6;
                let icon7;
                let icon8;
                for (y = 0; y < data.features[x].properties.category.length; y++) {
                    if(data.features[x].properties.category[y] === "onstreetBus" | data.features[x].properties.category[y] === "busStation" | data.features[x].properties.category[y] === "coachStation") {
                        if (!icon) {
                            icon = document.createElement("i");
                            icon.className = "fa-solid fa-bus icon bus";
                            stasjonsP.appendChild(icon);
                        }
                    } else if(data.features[x].properties.category[y] === "metroStation") {
                        if (!icon2) {
                            icon2 = document.createElement("i");
                            icon2.className = "fa-solid fa-train-subway icon metro";
                            stasjonsP.appendChild(icon2)
                        }
                    } else if(data.features[x].properties.category[y] === "onstreetTram" | data.features[x].properties.category[y] === "tramStation") {
                        if (!icon3) {
                            icon3 = document.createElement("i");
                            icon3.className = "fa-solid fa-train-tram icon tram";
                            stasjonsP.appendChild(icon3)
                        }
                    } else if(data.features[x].properties.category[y] === "railStation") {
                        if (!icon4) {
                            icon4 = document.createElement("i");
                            icon4.className = "fa-solid fa-train icon train";
                            stasjonsP.appendChild(icon4)
                        }
                    } else if(data.features[x].properties.category[y] === "ferryStop" | data.features[x].properties.category[y] === "harbourPort" | data.features[x].properties.category[y] === "ferryPort" | data.features[x].properties.category[y] === "ferryStop") {
                        if (!icon5) {
                            icon5 = document.createElement("i");
                            icon5.className = "fa-solid fa-ferry icon ferry";
                            stasjonsP.appendChild(icon5)
                        }
                    } else if(data.features[x].properties.category[y] === "airport") {
                        if (!icon6) {
                            icon6 = document.createElement("i");
                            icon6.className = "fa-solid fa-plane-departure icon airport";
                            stasjonsP.appendChild(icon6)
                        }
                    } else if(data.features[x].properties.category[y] === "liftStation") {
                        if (!icon8) {
                            icon8 = document.createElement("i");
                            icon8.className = "fa-solid fa-cable-car icon lift";
                            stasjonsP.appendChild(icon8)
                        }
                    } else {
                        if (!icon7) {
                            icon7 = document.createElement("i");
                            icon7.className = "fa-solid fa-location-dot icon point";
                            stasjonsP.appendChild(icon7)
                        }
                    }
                }
                var tilId = data.features[x].properties.id;
                var stasjonsnavntil = data.features[x].properties.label;
                tilVelg.appendChild(stasjonsP);
                velgArr2.push(tilId);
                stedArr2.push(stasjonsnavntil);
            }
            if(velgArr2.length === 0) {
                let tilnoresult = document.createElement("p")
                if(tilInput.value.length == 0) {
                    tilVelg.removeChild(tilnoresult);
                } else {
                    tilnoresult.textContent = "Ingen resultater."
                }
                tilVelg.appendChild(tilnoresult)
            }
        }) 
}
function buttonclickedtil(clicked_id) {
    tilVelg.style.display = "none";
    tilInput.value = stedArr2[clicked_id - 1];
    stedArr2 = [];
    tilclickedid = clicked_id - 1;
}

function søkreise() {
    console.log(geocoder_fra_data.features[fraclickedid].geometry.coordinates[0])
    if(fraInput.value.length == 0 || tilInput.value.length == 0) {
        alert("Vennligst fyll ut alle feltene")
    } else {
        let fraValue;
        let toValue;
        
        if (geocoder_fra_data.features[fraclickedid].properties.layer === "address") {
            fraValue = `{coordinates: {latitude: ${geocoder_fra_data.features[fraclickedid].geometry.coordinates[1]}, longitude: ${geocoder_fra_data.features[fraclickedid].geometry.coordinates[0]}}, name: "${geocoder_fra_data.features[tilclickedid].properties.name}"}`
        } else if (geocoder_fra_data.features[fraclickedid].properties.layer === "venue") {
            fraValue = `{place: "${geocoder_fra_data.features[fraclickedid].properties.id}"}`
        } else {
            fraValue = `{coordinates: {latitude: ${geocoder_fra_data.features[fraclickedid].geometry.coordinates[1]}, longitude: ${geocoder_fra_data.features[fraclickedid].geometry.coordinates[0]}}}`
        }

        if (geocoder_til_data.features[tilclickedid].properties.layer === "address") {
            toValue = `{coordinates: {latitude: ${geocoder_til_data.features[tilclickedid].geometry.coordinates[1]}, longitude: ${geocoder_til_data.features[tilclickedid].geometry.coordinates[0]}}, name: "${geocoder_til_data.features[tilclickedid].properties.name}"}`
        } else if (geocoder_til_data.features[tilclickedid].properties.layer === "venue") {
            toValue = `{place: "${geocoder_til_data.features[tilclickedid].properties.id}"}`
        } else {
            toValue = `{coordinates: {latitude: ${geocoder_til_data.features[tilclickedid].geometry.coordinates[1]}, longitude: ${geocoder_til_data.features[tilclickedid].geometry.coordinates[0]}}}`
        }

        let timeEl;
        let avgangAnkomst;
        if (avgangbuttonidEl.classList.contains("selected")) {
            timeEl = new Date(datetimepickerEl.value).toISOString();
            avgangAnkomst = false;
        } else if (ankomstbuttonidEl.classList.contains("selected")) {
            timeEl = new Date(datetimepickerEl.value).toISOString();
            avgangAnkomst = true;
        } else {
            timeEl = new Date().toISOString();
            avgangAnkomst = false;
        }
        console.log(timeEl)
        console.log(avgangAnkomst)
        console.log(byttetididEl.value)
        let byttetididElSec = byttetididEl.value * 60;

        fetch('https://api.entur.io/journey-planner/v3/graphql', {
        method: 'POST',
        headers: {
        // Replace this with your own client name:
        'ET-Client-Name': 'alsta-bussen',
        'Content-Type': 'application/json'
        },
        // GraphQL Query
        // https://api.entur.io/graphql-explorer/journey-planner-v3?query=%7B%0A%20%20trip%28%0A%20%20%20%20from%3A%20%7Bplace%3A%20"NSR%3AStopPlace%3A58227"%7D%0A%20%20%20%20to%3A%20%7Bplace%3A%20"NSR%3AStopPlace%3A5920"%7D%0A%20%20%20%20dateTime%3A%20"2024-02-01T16%3A00%3A00.000Z"%0A%20%20%20%20walkSpeed%3A%201.3%0A%20%20%20%20arriveBy%3A%20false%0A%20%20%20%20includePlannedCancellations%3A%20true%0A%20%20%20%20includeRealtimeCancellations%3A%20true%0A%20%20%20%20transferSlack%3A%205%0A%20%20%29%20%7B%0A%20%20%20%20fromPlace%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20toPlace%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20tripPatterns%20%7B%0A%20%20%20%20%20%20aimedStartTime%0A%20%20%20%20%20%20expectedStartTime%0A%20%20%20%20%20%20aimedEndTime%0A%20%20%20%20%20%20expectedEndTime%0A%20%20%20%20%20%20streetDistance%0A%20%20%20%20%20%20walkTime%0A%20%20%20%20%20%20duration%0A%20%20%20%20%20%20legs%20%7B%0A%20%20%20%20%20%20%20%20aimedStartTime%0A%20%20%20%20%20%20%20%20expectedStartTime%0A%20%20%20%20%20%20%20%20aimedEndTime%0A%20%20%20%20%20%20%20%20expectedEndTime%0A%20%20%20%20%20%20%20%20mode%0A%20%20%20%20%20%20%20%20duration%0A%20%20%20%20%20%20%20%20line%20%7B%0A%20%20%20%20%20%20%20%20%20%20publicCode%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20fromEstimatedCall%20%7B%0A%20%20%20%20%20%20%20%20%20%20destinationDisplay%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20frontText%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20cancellation%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20fromPlace%20%7B%0A%20%20%20%20%20%20%20%20%20%20quay%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20toPlace%20%7B%0A%20%20%20%20%20%20%20%20%20%20quay%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20intermediateEstimatedCalls%20%7B%0A%20%20%20%20%20%20%20%20%20%20quay%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20aimedArrivalTime%0A%20%20%20%20%20%20%20%20%20%20expectedArrivalTime%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&variables=
        body: JSON.stringify({ 
            query: `{
                trip(
                    from: ${fraValue}
                    to: ${toValue}
                    dateTime: "${timeEl}"
                    arriveBy: ${avgangAnkomst}
                    walkSpeed: 1.3
                    includePlannedCancellations: true
                    includeRealtimeCancellations: true
                    transferSlack: ${byttetididElSec}
                ) {
                    fromPlace {
                        name
                    }
                    toPlace {
                        name
                    }
                    tripPatterns {
                        aimedStartTime
                        expectedStartTime
                        aimedEndTime
                        expectedEndTime
                        streetDistance
                        walkTime
                        duration
                        legs {
                            aimedStartTime
                            expectedStartTime
                            aimedEndTime
                            expectedEndTime
                            mode
                            duration
                            line {
                                publicCode
                            }
                            fromEstimatedCall {
                                destinationDisplay {
                                    frontText
                                }
                                cancellation
                            }
                            fromPlace {
                                quay {
                                    name
                                }
                            }
                            toPlace {
                                quay {
                                    name
                                }
                            }
                            intermediateEstimatedCalls {
                                quay {
                                  name
                                }
                                aimedArrivalTime
                                expectedArrivalTime
                            }
                        }
                    }
                }
            }`
        }),
        })
        .then(res => res.json())
        .then(stopPlaceData => {
            console.log(stopPlaceData);
        })
    }
}


function avgang() {
    nowbuttonEl.classList.remove("selected");
    ankomstbuttonEl.classList.remove("selected");
    avgangbuttonEl.classList.add("selected");
    datetimepickerEl.style.display = "block";
}

function ankomst() {
    nowbuttonEl.classList.remove("selected");
    ankomstbuttonEl.classList.add("selected");
    avgangbuttonEl.classList.remove("selected");
    datetimepickerEl.style.display = "block";
}

function now() {
    nowbuttonEl.classList.add("selected");
    ankomstbuttonEl.classList.remove("selected");
    avgangbuttonEl.classList.remove("selected");
    datetimepickerEl.style.display = "none";
}

function toggle_dark_mode() {
    if (localStorage.getItem("light_mode") === "false") {
        localStorage.setItem("light_mode", "true");
    } else {
        localStorage.setItem("light_mode", "false");
    }
    darkmodecheck()
}
function avansert_ekstra_valg() {
    if (avansert_ekstra_valgEl.style.display === "flex") {
        avansert_ekstra_valgEl.style.display = "none";
        arrowEl.classList.remove("fa-caret-up");
        arrowEl.classList.add("fa-caret-down");
    } else {
        avansert_ekstra_valgEl.style.display = "flex";
        arrowEl.classList.add("fa-caret-up");
        arrowEl.classList.remove("fa-caret-down");
    }
    
}

function darkmodecheck() {
    var elements = [document.body];
    for(i = 0; i < elements.length; i++) {
        elements[i].classList.toggle("light_mode");
    }
    fratil.classList.toggle("light_mode2")
    søkeButton.classList.toggle("light_mode2")
    ekstra_valgEl.classList.toggle("light_mode2")
    // Må fikses nedenfor
    fraVelg.classList.toggle("light_mode3")
    tilVelg.classList.toggle("light_mode3")
    fraForm.classList.toggle("light_mode4")
    tilForm.classList.toggle("light_mode4")
    datetimepickerEl.classList.toggle("light_mode2")
    avansert_ekstra_valg_buttonEl.classList.toggle("light_mode")
    byttetididEl.classList.toggle("light_mode")
    byttetiddivEl.classList.toggle("light_mode")
    nowbuttonEl.classList.toggle("light_mode5")
    ankomstbuttonEl.classList.toggle("light_mode5")
    avgangbuttonEl.classList.toggle("light_mode5")
}