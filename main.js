let slider = document.getElementById("myRange");
let output = document.getElementById("simtime-number");
let toggle = document.getElementsByClassName("toggle");

output.innerHTML = slider.value;

slider.oninput = function () {
  output.innerHTML = this.value;
};

//Get time funtion - it passes time to the animation control function getTimeOfDay
const updateTime = () => {
  let now = new Date();

  getTimeOfDay(now.getHours());

  //reset the slider to the actual time
  slider.value = now.getHours();
  output.innerHTML = now.getHours();
};

const setDayStyle = () => {
  document.getElementById("toggle-label-left").style.color = "#d3d3d3";
  document.getElementById("toggle-label-right").style.color = "#d3d3d3";
  document.getElementsByClassName("simtime")[0].style.color = "#d3d3d3";
};

const setNightStyle = () => {
  document.getElementById("toggle-label-left").style.color = "#7a6021";
  document.getElementById("toggle-label-right").style.color = "#7a6021";
  document.getElementsByClassName("simtime")[0].style.color = "#7a6021";
};

//Animation control function
const getTimeOfDay = (hour) => {
  let moon = document.getElementById("moon");
  let sun = document.getElementById("sun");
  let world = document.getElementById("world");

  if (hour >= 0 && hour < 5) {
    timeofdaypercent = hour - 0;
    timeofdaypercent = (timeofdaypercent / 4) * 100;
    let moonheight = timeofdaypercent * 2.5 + 50;
    moon.style.top = moonheight + "px";
    sun.style.top = "450px";
    document.body.style.backgroundColor = "#002551";
    world.style.borderBottom = "5px solid #67a8f1";
    setDayStyle();
  } else if (hour >= 5 && hour < 12) {
    timeofdaypercent = hour - 5;
    timeofdaypercent = (timeofdaypercent / 7) * 100;
    let sunheight = 300 - timeofdaypercent * 2.9;
    sun.style.top = sunheight + "px";
    moon.style.top = "400px";
    document.body.style.backgroundColor = "#f4c042";
    world.style.borderBottom = "5px solid #7a6021";
    setNightStyle();
  } else if (hour >= 12 && hour < 19) {
    timeofdaypercent = hour - 12;
    timeofdaypercent = (timeofdaypercent / 7) * 100;
    let sunheight = timeofdaypercent * 2.9 + 50;
    sun.style.top = sunheight + "px";
    moon.style.top = "400px";
    document.body.style.backgroundColor = "#f4c042";
    world.style.borderBottom = "5px solid #7a6021";
    setNightStyle();
  } else {
    timeofdaypercent = hour - 20;
    timeofdaypercent = (timeofdaypercent / 5) * 100;
    let moonheight = 200 - timeofdaypercent * 2.5 + 50;
    moon.style.top = moonheight + "px";
    sun.style.top = "450px";
    document.body.style.backgroundColor = "#002551";
    world.style.borderBottom = "5px solid #67a8f1";
    setDayStyle();
  }
};

//Start the loop going based of real time
updateTime();
let timeloop = setInterval(updateTime, 1000);

//Toggle switch functions
let togglestate = 0;
toggle[0].onclick = function () {
  this.classList.toggle("on");

  if (togglestate == 0) {
    togglestate = 1;
    clearInterval(timeloop);
    slider.oninput = function () {
      output.innerHTML = this.value;
      getTimeOfDay(this.value);
    };
    document.getElementById("slidecontainer").style.maxHeight = "300px";
    document.getElementById("toggle-label-left").style.opacity = "0.2";
    document.getElementById("toggle-label-right").style.opacity = "1";
  } else if (togglestate == 1) {
    togglestate = 0;
    updateTime();
    timeloop = setInterval(updateTime, 1000);
    slider.oninput = null;
    document.getElementById("slidecontainer").style.maxHeight = "0px";
    document.getElementById("toggle-label-left").style.opacity = "1";
    document.getElementById("toggle-label-right").style.opacity = "0.2";
  }
};
