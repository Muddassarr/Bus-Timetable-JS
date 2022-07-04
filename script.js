const HOURHAND = document.querySelector("#hour");
const MINUTEHAND = document.querySelector("#minute");
const SECONDHAND = document.querySelector("#second");

var date = new Date();
// console.log(date);

let hr = date.getHours();
let min = date.getMinutes();
let sec = date.getSeconds();
// console.log("Hour: " + hr + " Minute: " + min + " Second: " + sec);

let hrPosition = (hr * 360 / 12) + (min * (360 / 60) / 12);
let minPosition = (min * 360 / 60) + (sec * (360 / 60) / 60);
let secPosition = sec * 360 / 60;
var n = 0;
function runTheclock() {
    // n++;
    // if (n == 60) {
    //     n = 0;
    //     displayBus()
    // }
    hrPosition = hrPosition + (3 / 360);
    minPosition = minPosition + (6 / 60);
    secPosition = secPosition + 6;

    HOURHAND.style.transform = "rotate(" + hrPosition + "deg)";
    MINUTEHAND.style.transform = "rotate(" + minPosition + "deg)";
    SECONDHAND.style.transform = "rotate(" + secPosition + "deg)";
    displayBus()

}

var interval = setInterval(runTheclock, 1000);

/*Digital clock part*/
function showTime() {
    var date = new Date();
    var hr = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var session = "AM";

    if (hr == 0) {
        hr = 12;
    }
    if (hr > 12) {
        hr = hr - 12;
        session = "PM";

    }

    hr = (hr < 10) ? "0" + hr : hr;
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    var time = hr + ":" + min + ":" + sec + " " + session;
    document.getElementById("digitalClock").innerText = time;
    document.getElementById("digitalClock").textContent = time;

    // document.getElementById("date").textContent = date;

    setTimeout(showTime, 1000);
};

showTime();
/*Digital clock part*/
// bus data
//A bus
var bus_A_start = 0;
var bus_A_end = 24 * 60 * 60;
var bus_A_inter = 60 * 60;
//B bus
var bus_B_start = 6 * 60 * 60;
var bus_B_end = 21 * 60 * 60;
var bus_B_inter = 12 * 60;
//C bus
var bus_C_start = 0;
var bus_C_end = 24 * 60 * 60;
var bus_C_inter = 20 * 60;

//D bus
var bus_D_start = 5 * 60 * 60 + 30 * 60;
var bus_D_end = 13 * 60 * 60 + 30 * 60;
var bus_D_inter = 6 * 60;

function displayBus() {
    var date = new Date();
    var hr = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var session = "AM";
    var now = hr * 60 * 60 + min * 60 + sec;
    var firstBus = { busname: "Bus X15 to SHEFFIELD", time: 1000000 };
    var secondBus = { busname: "Bus 52 to WAKEFIELD", time: 1000000 };
    var thirdBus = { busname: "Bus X78 to DONCASTER", time: 1000000 };
    var forthBus = { busname: "Bus 126 to LEEDS", time: 1000000 };
    for (var i = bus_A_start; i <= bus_A_end; i += bus_A_inter) {
        if (i > now && i < now + 15 * 60) {
            firstBus.time = i
            break;
        }
    }
    for (var i = bus_B_start; i <= bus_B_end; i += bus_B_inter) {
        if (i > now && i < now + 15 * 60) {
            secondBus.time = i
            break;
        }
    }
    for (var i = bus_C_start; i <= bus_C_end; i += bus_C_inter) {
        if (i > now && i < now + 15 * 60) {
            thirdBus.time = i
            console.log("C", i);
            break;
        }
    }
    for (var i = bus_D_start; i <= bus_D_end; i += bus_D_inter) {
        if (i > now && i < now + 15 * 60) {
            forthBus.time = i
            break;

        }
    }

    var nextFirstBus = { busname: "", time: 1000000 };
    var nextSecondBus = { busname: "", time: 1000000 };;
    nextFirstBus = firstBus;
    if (nextFirstBus.time < secondBus.time) {
        nextSecondBus = secondBus;
    } else {
        nextFirstBus = secondBus;
    }
    if (nextFirstBus.time > thirdBus.time) {
        nextSecondBus = nextFirstBus;
        nextFirstBus = thirdBus;
    } else if (nextSecondBus.time > thirdBus.time) {
        nextSecondBus = thirdBus;
    }
    if (nextFirstBus.time > forthBus.time) {
        nextSecondBus = nextFirstBus;
        nextFirstBus = forthBus;
    } else if (nextSecondBus.time > forthBus.time) {
        nextSecondBus = forthBus;
    }
    if (nextFirstBus.time != 1000000) {
        var hr = (nextFirstBus.time - nextFirstBus.time % 3600) / 3600;
        if (hr < 10) {
            hr = "0" + hr
        }
        var min = ((nextFirstBus.time - hr * 3600) - (nextFirstBus.time - hr * 3600) % 60) / 60;
        if (min < 10) {
            min = "0" + min
        }
        var sec = nextFirstBus.time - hr * 3600 - min * 60;
        document.getElementById("missing").innerHTML = ""
        document.getElementById("firstbus").innerHTML = nextFirstBus.busname + " : " + hr + " : " + min + " : 00"
    } else {
        document.getElementById("firstbus").innerHTML = ""
        document.getElementById("secondbus").innerHTML = ""
        document.getElementById("missing").innerHTML = "No buses are due to depart in the next 15 minutes";
    }
    if (nextSecondBus.time != 1000000) {
        var hr2 = (nextSecondBus.time - nextSecondBus.time % 3600) / 3600;
        if (hr2 < 10) {
            hr2 = "0" + hr2
        }
        var min2 = ((nextSecondBus.time - hr2 * 3600) - (nextSecondBus.time - hr2 * 3600) % 60) / 60;
        if (min2 < 10) {
            min2 = "0" + min2
        }
        var sec2 = nextSecondBus.time - hr2 * 3600 - min2 * 60;
        document.getElementById("missing").innerHTML = ""
        document.getElementById("secondbus").innerHTML = nextSecondBus.busname + " : " + hr2 + " : " + min2 + " : 00"
    }

}
displayBus();
