
const ctx = document.getElementById("chartjs");
const yearSlider = document.getElementById("yearSlider");
const currentYearLabel = document.getElementById("currentYear");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");

const initialData = [
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

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: "augmentation (%)",
            data: initialData,
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
    const newData = initialData.filter(point => point.x <= new Date(selectedYear, 0, 1));

    chart.data.datasets[0].data = newData;
    chart.update();
}


ctx.addEventListener('click', function (event) {
    const activePoints = chart.getElementsAtEventForMode(event, 'point', { intersect: true }, false);

    if (activePoints.length > 0) {
        const clickedPoint = activePoints[0];
        const data = chart.data.datasets[clickedPoint.datasetIndex].data[clickedPoint.index];


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