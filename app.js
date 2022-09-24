const timeframes = document.getElementsByName('timeframe');
let selected = '';

timeframes.forEach( (radio) => {
    if(radio.checked == true) {
        selected = radio.value;
        changed(selected);
    }
    radio.addEventListener('change', () => {
        selected = radio.value;
        changed(selected);
    });
});

function changed(el) {
    console.log(el + ' is active');
}

