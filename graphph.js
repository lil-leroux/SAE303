const ctx1 = document.getElementById("chartjs1").getContext("2d");
const yearSlider1 = document.getElementById("yearSlider1");
const overlay1 = document.getElementById("overlay1");
const modal1 = document.getElementById("modal1");

const initialData1 = [
    { x: new Date('1980-01-01'), y: 8.11 },
    { x: new Date('1985-01-01'), y: 8.11 },
    { x: new Date('1990-01-01'), y: 8.1 },
    { x: new Date('1995-01-01'), y: 8.1 },
    { x: new Date('2000-01-01'), y: 8.09 },
    { x: new Date('2005-01-01'), y: 8.08 },
    { x: new Date('2010-01-01'), y: 8.07 },
    { x: new Date('2015-01-01'), y: 8.06 },
    { x: new Date('2020-01-01'), y: 8.05 },
    { x: new Date('2099-01-01'), y: 7.80 },
];

const chart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        datasets: [{
            label: "PH",
            data: initialData1,
            fill: false,
            backgroundColor: 'blue',
            pointRadius: 5,
            borderWidth: 3
        }],
    },
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'year',
                    min: '1980',
                    max: '2100',
                }
            },
            y: {
                min: 7.75,
                max: 8.12
            }
        }
    }
});

yearSlider.addEventListener('input', function () {
    const selectedYear = parseInt(yearSlider.value);
    currentYearLabel.textContent = selectedYear;
    updateChartData(selectedYear);
});

function updateChartData(selectedYear) {
    const newData = initialData1.filter(point => point.x <= new Date(selectedYear, 0, 1));

    chart1.data.datasets[0].data = newData;
    chart1.update();
}


ctx1.addEventListener('click', function (event) {
    const activePoints = chart1.getElementsAtEventForMode(event, 'point', { intersect: true }, false);

    if (activePoints.length > 0) {
        const clickedPoint = activePoints[0];
        const data = chart1.data.datasets[clickedPoint.datasetIndex].data[clickedPoint.index];

       
        displayModal(data);
    }
});

function displayModal(data) {
    const modalContent = `
        <p>Année: ${data.x.getFullYear()}</p>
        <p>PH: ${data.y}</p>
    `;

    modal.innerHTML = modalContent;

    modal.style.display = 'block';
    overlay.style.display = 'block';

    overlay.addEventListener('click', function () {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });
}







const ctx2 = document.getElementById("chartjs2").getContext("2d");
const yearSlider2 = document.getElementById("yearSlider2");
const overlay2 = document.getElementById("overlay2");
const modal2 = document.getElementById("modal2");
const initialData2 = [
    { x: new Date('1980-01-01'), y: 0 },
    { x: new Date('1985-01-01'), y: 0 },
    { x: new Date('1990-01-01'), y: 5 },
    { x: new Date('1995-01-01'), y: 5 },
    { x: new Date('2000-01-01'), y: 8.6 },
    { x: new Date('2005-01-01'), y: 12.2 },
    { x: new Date('2010-01-01'), y: 15.8 },
    { x: new Date('2015-01-01'), y: 19.4 },
    { x: new Date('2020-01-01'), y: 23 },
    { x: new Date('2099-01-01'), y: 150 },
];

const chart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        datasets: [{
            label: "augmentation (%)",
            data: initialData2,
            fill: false,
            backgroundColor: 'yellow',
            pointRadius: 5,
            borderWidth: 2
        }],
    },
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'year',
                    min: '1980',
                    max: '2100',
                }
            },
            y: {
                min: 0,
                max: 200
            }
        }
    }
});

yearSlider.addEventListener('input', function () {
    const selectedYear = parseInt(yearSlider.value);
    currentYearLabel.textContent = selectedYear;
    updateChartData(selectedYear);
});

function updateChartData(selectedYear) {
    const newData = initialData2.filter(point => point.x <= new Date(selectedYear, 0, 1));

    chart2.data.datasets[0].data = newData;
    chart2.update();
}


ctx2.addEventListener('click', function (event) {
    const activePoints = chart2.getElementsAtEventForMode(event, 'point', { intersect: true }, false);

    if (activePoints.length > 0) {
        const clickedPoint = activePoints[0];
        const data = chart2.data.datasets[clickedPoint.datasetIndex].data[clickedPoint.index];


        displayModal(data);
    }
});

function displayModal(data) {
    const modalContent = `
                <p>Année: ${data.x.getFullYear()}</p>
                <p>Augmentation: ${data.y}%</p>
            `;

    modal.innerHTML = modalContent;

    modal.style.display = 'block';
    overlay.style.display = 'block';

    overlay.addEventListener('click', function () {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });
}