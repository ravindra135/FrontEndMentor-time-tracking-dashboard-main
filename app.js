let data, defaultSelection, work, play, study, exercise, social, self_care;
let activeTime = '';
const radioBtns = document.getElementsByName('timeframe');
const activeTimeFrame = document.querySelectorAll('.type')
const previousTime = document.querySelectorAll('#duration')
const workDiv = document.getElementById('work');
const playDiv = document.getElementById('play');
const studyDiv = document.getElementById('study');
const exerciseDiv = document.getElementById('exercise');
const socialDiv = document.getElementById('social');
const selfCareDiv = document.getElementById('self-care');

$.ajax({
    type: "GET",
    url: "./data.json",
    success:function(res) {
        data = res;
        dataExport()
    }
});

function dataExport() {
    work = data.filter((t) => t.title === "Work")
    play = data.filter((t) => t.title === "Play")
    study = data.filter((t) => t.title === "Study")
    exercise = data.filter((t) => t.title === "Exercise")
    social = data.filter((t) => t.title === "Social")
    self_care = data.filter((t) => t.title === "Self Care")

    if(defaultSelection.checked == true) {
        updateData(defaultSelection.value)
    }
}

radioBtns.forEach((button, index) => {
    if(button.checked == true) {
        defaultSelection = button;
    } else {
        radioBtns[1].checked = true;
        defaultSelection = radioBtns[1];
        timeframeSelected(defaultSelection);
    }
    button.addEventListener('change', () => {
        timeframeSelected(button);
        updateData(button.value)
    })
})

function timeframeSelected(button) {
    switch(button.value) {
        case "daily":
            activeTime = "Yesterday"
            break;
        case "weekly":
            activeTime = "Last Week"
            break;
        case "monthly":
            activeTime = "Last Month"
            break;
        default:
            return;    
    }

    activeTimeFrame.forEach(text => {
        text.innerHTML = activeTime;
    })
}

function updateData(time) {
    workDiv.children[0].innerHTML = work[0].timeframes[time].current + "hrs"
    workDiv.children[1].children[1].innerHTML = work[0].timeframes[time].previous + "hrs"

    playDiv.children[0].innerHTML = play[0].timeframes[time].current + "hrs"
    playDiv.children[1].children[1].innerHTML = play[0].timeframes[time].previous + "hrs"

    studyDiv.children[0].innerHTML = study[0].timeframes[time].current + "hrs"
    studyDiv.children[1].children[1].innerHTML = study[0].timeframes[time].previous + "hrs"

    exerciseDiv.children[0].innerHTML = exercise[0].timeframes[time].current + "hrs"
    exerciseDiv.children[1].children[1].innerHTML = exercise[0].timeframes[time].previous + "hrs"

    socialDiv.children[0].innerHTML = social[0].timeframes[time].current + "hrs"
    socialDiv.children[1].children[1].innerHTML = social[0].timeframes[time].previous + "hrs"
    
    selfCareDiv.children[0].innerHTML = self_care[0].timeframes[time].current + "hrs"
    selfCareDiv.children[1].children[1].innerHTML = self_care[0].timeframes[time].previous + "hrs"
}