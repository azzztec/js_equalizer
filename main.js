let pad;
let padField = document.querySelector('.pads-field');
let columns =16;
let rows = 9;
let padsAmount = columns * rows;

function addSquare(){
    pad = document.createElement('div');
    pad.classList.add('pad');
    setSquereSize();
    return pad;
}

function setSquereSize(){
    pad.style.flexBasis = (1 / columns) * 100 + '%';
}

function setPad(padsAmount){
    while(padsAmount != 0){
        padField.append( addSquare() );
        --padsAmount;
    }
}

setPad(padsAmount);


window.addEventListener('load', function(){
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    var context = new AudioContext(),
    audio = document.querySelector('audio');

    var createFilter = function (frequency) {
    var filter = context.createBiquadFilter();
        
    filter.type = 'peaking'; // тип фильтра
    filter.frequency.value = frequency; // частота
    filter.Q.value = 1; // Q-factor
    filter.gain.value = 0;

    return filter;
    };

    var createFilters = function () {
    var frequencies = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000],
        filters = frequencies.map(createFilter);

    filters.reduce(function (prev, curr) {
        prev.connect(curr);
        return curr;
    });

    return filters;
    };

    var equalize = function (audio) {
    var source = context.createMediaElementSource(audio),
        filters = createFilters();

    // источник цепляем к первому фильтру 
    source.connect(filters[0]);
    // а последний фильтр - к выходу
    filters[filters.length - 1].connect(context.destination);
    };

    equalize(audio);
});
