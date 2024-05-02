let moodIcons = [];
let moodLabels = []

let myChart = null;
const moodImageWidth = 30;
const chartBottomPadding = 20;
const moodImageHeight = 30;
let moodMeterData = null;

let averageEmotionElement = document.getElementById("averageEmotion");
let startDateCalendarIcon = document.querySelector("#startDateInput .calendarIcon svg");
let endDateCalendarIcon = document.querySelector("#endDateInput .calendarIcon svg");
let moodMeterWrapper = document.getElementById("moodMeterWrapper");

startDateCalendarIcon.addEventListener("click", function () {
    // Focus on the startDate input
    document.getElementById("startDate").focus();
});

endDateCalendarIcon.addEventListener("click", function () {
    // Focus on the startDate input
    document.getElementById("endDate").focus();
});

const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
        tooltipEl.style.borderRadius = '3px';
        tooltipEl.style.opacity = 1;
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.transform = 'translate(-50%, 0)';
        tooltipEl.style.transition = 'all .1s ease';

        const table = document.createElement('table');
        table.style.margin = '0px';

        tooltipEl.appendChild(table);
        chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
};

const externalTooltipHandler = (context) => {
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    // Set Text
    if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map(b => b.lines);

        const tableHead = document.createElement('thead');

        titleLines.forEach(title => {
            const tr = document.createElement('tr');
            tr.style.borderWidth = 0;

            const th = document.createElement('th');
            th.style.borderWidth = 0;
            const text = document.createTextNode(title);

            th.appendChild(text);
            tr.appendChild(th);
            tableHead.appendChild(tr);
        });

        const tableBody = document.createElement('tbody');
        bodyLines.forEach((body, i) => {
            const tr = document.createElement('tr');
            tr.style.backgroundColor = 'inherit';
            tr.style.borderWidth = 0;

            const td = document.createElement('td');
            td.style.borderWidth = 0;

            let labelText = body[0];
            let moodValue = parseInt(labelText.split(":")[1].trim());
            labelText = labelText.replace(moodValue, moodLabels[moodValue - 1]);
            let text = document.createTextNode(labelText);

            td.appendChild(text);
            tr.appendChild(td);
            tableBody.appendChild(tr);
        });

        const tableRoot = tooltipEl.querySelector('table');

        // Remove old children
        while (tableRoot.firstChild) {
            tableRoot.firstChild.remove();
        }

        // Add new children
        tableRoot.appendChild(tableHead);
        tableRoot.appendChild(tableBody);

        tableRoot.style.color = 'rgba(255, 255, 255)';
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};

const startDatePicker = $("#startDate");
const endDatePicker = $("#endDate");

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    // Pad the month and day with leading zeros if they are single digits
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [month, day, year].join('/');
}

$(document).ready(function () {
    fetchEmotionsData(null, null, false)
});

function fetchEmotionsData(startDate, endDate, shouldUpdate) {
    if (startDate && endDate) {
        var requestConfig = {
            method: 'GET',
            url: '/moodmeter/data' + '?startDate=' + startDate + '&endDate=' + endDate
        }
    } else {
        var requestConfig = {
            method: 'GET',
            url: '/moodmeter/data'
        }
    }
    // Ajax call
    $.ajax(requestConfig).then(function (apiResponse) {
        let data = apiResponse;
        moodIcons = data.allEmotionValues.map((emotion) => emotion.iconPath);
        moodLabels = data.allEmotionValues.map((emotion) => emotion.name);
        moodMeterData = data.moodMeter;

        let startDate = new Date(moodMeterData[0].date);
        let endDate = new Date(moodMeterData[moodMeterData.length - 1].date);

        let startDateInputMaxDate = new Date(moodMeterData[moodMeterData.length - 1].date);
        startDateInputMaxDate.setDate(endDate.getDate() - 1);

        let endDateInputMinDate = new Date(moodMeterData[0].date)
        endDateInputMinDate.setDate(startDate.getDate() + 1);

        startDatePicker.datepicker({
            dateFormat: "mm/dd/yy",
            maxDate: startDateInputMaxDate,
            onSelect: function (selectedDate) {
                let minEndDate = new Date(selectedDate);
                minEndDate.setDate(minEndDate.getDate() + 1);
                endDatePicker.datepicker("option", "minDate", minEndDate);
                fetchEmotionsData(selectedDate, endDatePicker.val(), true);
            }
        }).datepicker("setDate", startDate);

        endDatePicker.datepicker({
            dateFormat: "mm/dd/yy",
            minDate: endDateInputMinDate,
            maxDate: endDate,
            onSelect: function (selectedDate) {
                let minStartDate = new Date(selectedDate);
                minStartDate.setDate(minStartDate.getDate() - 1);
                startDatePicker.datepicker("option", "maxDate", minStartDate);
                fetchEmotionsData(startDatePicker.val(), selectedDate, true);
            }
        }).datepicker("setDate", endDate);

        // Check if topActivites have same count
        let topActivites = data.topThreeActivities;
        let prevCount = topActivites[0].count;
        let currentRank = 1;
        topActivites.forEach((activity, index) => {
            if (prevCount != activity.count) {
                prevCount = activity.count;
                currentRank = currentRank + 1;
            }
            topActivites[index].rank = currentRank;
        });

        let averageEmotionValueElement = document.querySelector("#averageEmotion .analyticValue");
        averageEmotionValueElement.textContent = data.averageEmotion.name;

        let averageEnergyValueElement = document.querySelector("#averageEnergy .analyticValue");
        averageEnergyValueElement.textContent = data.averageEnergy.name;

        let mostInteractedSocialValueElement = document.querySelector("#mostInteractedSocial .analyticValue");
        mostInteractedSocialValueElement.textContent = data.mostSocial.name;
        // First Activity
        let fristActivityStatsElement = document.querySelector("#firstActivity .activityStats");
        let fristActivityRankElement = document.querySelector("#firstActivity .activityRank");
        // Reset classname
        fristActivityStatsElement.className = "activityStats";
        // Build Ranking
        switch (topActivites[0].rank) {
            case 1:
                fristActivityRankElement.textContent = "1st";
                fristActivityStatsElement.classList.add("firstActvitiyHeight");
                break;
            case 2:
                fristActivityRankElement.textContent = "2nd";
                fristActivityStatsElement.classList.add("secondActvitiyHeight");
                break;
            case 3:
                fristActivityRankElement.textContent = "3rd";
                fristActivityStatsElement.classList.add("thirdActvitiyHeight");
                break;
        }
        let firstActivityNameElement = document.querySelector("#firstActivity .activityName");
        firstActivityNameElement.textContent = topActivites[0].activity.name;
        let firstActivityCountElement = document.querySelector("#firstActivity .activityCount");
        firstActivityCountElement.textContent = topActivites[0].count;

        // Second Activity
        let secondActivityRankElement = document.querySelector("#secondActivity .activityRank");
        let secondActivityStatsElement = document.querySelector("#secondActivity .activityStats");
        // Reset classname
        secondActivityStatsElement.className = "activityStats";
        // Build Ranking
        switch (topActivites[1].rank) {
            case 1:
                secondActivityRankElement.textContent = "1st";
                secondActivityStatsElement.classList.add("firstActvitiyHeight");
                break;
            case 2:
                secondActivityRankElement.textContent = "2nd";
                secondActivityStatsElement.classList.add("secondActvitiyHeight");
                break;
            case 3:
                secondActivityRankElement.textContent = "3rd";
                secondActivityStatsElement.classList.add("thirdActvitiyHeight");
                break;
        }
        let secondActivityNameElement = document.querySelector("#secondActivity .activityName");
        secondActivityNameElement.textContent = topActivites[1].activity.name;
        let secondActivityCountElement = document.querySelector("#secondActivity .activityCount");
        secondActivityCountElement.textContent = topActivites[1].count;

        // Third Activity
        let thirdActivityRankElement = document.querySelector("#thirdActivity .activityRank");
        let thirdActivityStatsElement = document.querySelector("#thirdActivity .activityStats");
        // Reset classname
        thirdActivityStatsElement.className = "activityStats";
        // Build Ranking
        switch (topActivites[2].rank) {
            case 1:
                thirdActivityRankElement.textContent = "1st";
                thirdActivityStatsElement.classList.add("firstActvitiyHeight");
                break;
            case 2:
                thirdActivityRankElement.textContent = "2nd";
                thirdActivityStatsElement.classList.add("secondActvitiyHeight");
                break;
            case 3:
                thirdActivityRankElement.textContent = "3rd";
                thirdActivityStatsElement.classList.add("thirdActvitiyHeight");
                break;
        }
        let thirdActivityNameElement = document.querySelector("#thirdActivity .activityName");
        thirdActivityNameElement.textContent = data.topThreeActivities[2].activity.name;
        let thirdActivityCountElement = document.querySelector("#thirdActivity .activityCount");
        thirdActivityCountElement.textContent = data.topThreeActivities[2].count;

        const yAxisImagesPlugin = {
            id: 'yAxisImagesPlugin',
            beforeDatasetsDraw: function (chart) {
                const { ctx, data, options, scales: { x, y } } = chart;
                ctx.save();
                ctx.imageSmoothingQuality = 'high';
                const imageSize = options.layout.padding.left
                data.datasets[0].image.forEach((imageLink, index) => {
                    const logo = new Image();
                    logo.src = imageLink;
                    if (moodMeterData.length <= 7) {
                        ctx.drawImage(logo, moodImageWidth + 35, y.getPixelForValue(index) - chartBottomPadding - moodImageWidth - 35, moodImageWidth, moodImageHeight);
                    } else {
                        ctx.drawImage(logo, moodImageWidth + 35, y.getPixelForValue(index) - chartBottomPadding - moodImageWidth - 25, moodImageWidth, moodImageHeight)
                    }
                })
            }
        }

        Chart.register(yAxisImagesPlugin);

        if (shouldUpdate) {
            myChart.data.labels = moodMeterData.map(row => row.date);
            myChart.data.datasets[0].data = moodMeterData.map(row => row.emotion);
            myChart.update();
        } else {
            buildGraph(moodMeterData);
        }
        moodMeterWrapper.style.visibility = "visible";

    });
}

function buildGraph(data) {

    const bottomChartBorderPlugin = {
        id: 'bottomChartBorderPlugin',
        beforeDraw: function (chart, args, options) {
            const { ctx, scales: { x, y } } = chart;
            const yPos = y.getPixelForValue(0);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(chart.chartArea.left, yPos);
            ctx.lineTo(chart.chartArea.right, yPos);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
        }
    }

    const topChartBorderPlugin = {
        id: 'topChartBorderPlugin',
        beforeDraw: function (chart, args, options) {
            const { ctx, scales: { x, y } } = chart;
            const yPos = y.getPixelForValue(6);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(chart.chartArea.left, yPos);
            ctx.lineTo(chart.chartArea.right, yPos);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
        }
    }

    Chart.register(bottomChartBorderPlugin);
    Chart.register(topChartBorderPlugin);

    const ctx = document.getElementById('chart');

    // config 
    const config = {
        type: 'line',
        data: {
            labels: data.map(row => row.date),
            datasets: [{
                label: 'Mood',
                data: data.map(row => row.emotion),
                backgroundColor: [
                    'rgba(255, 255, 255)',
                ],
                borderColor: [
                    'rgba(255, 255, 255)',
                ],
                borderWidth: 5,
                image: moodIcons
            }],
        },
        options: {
            elements: {
                point: {
                    pointStyle: function (context) {
                        let moodIconName = moodIcons[context.raw - 1];
                        let markers = new Image(moodImageWidth, moodImageHeight);
                        markers.src = moodIconName;
                        markers.id = moodIconName;
                        return markers
                    },
                    pointRadius: 18,
                }
            },
            layout: {
                padding: {
                    left: 20,
                    bottom: chartBottomPadding,
                    right: 50,
                    top: 30,
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false,
                    position: 'nearest',
                    external: externalTooltipHandler
                }
            },
            scales: {
                x: {
                    grid: {
                        display: true,
                        drawOnChartArea: true,
                        drawTicks: false,
                        color: 'rgba(255, 255, 255, 0.5)'
                    },
                    ticks: {
                        padding: 10,
                        color: 'white',
                        font: {
                            size: 18,
                            weight: 'bold'
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    suggestedMin: 1,
                    suggestedMax: 6,
                    grid: {
                        display: true,
                        drawOnChartArea: true,
                        drawBorder: true,
                        drawTicks: false,
                        color: 'rgba(255, 255, 255, 0.5)'
                    },
                    ticks: {
                        padding: 20,
                        crossAlign: 'center',
                        stepSize: 1,
                        labelOffset: 15,
                        color: 'white',
                        font: {
                            size: 18,
                            weight: 'bold',
                        },
                        callback: function (value, index, values) {
                            const labels = moodLabels
                            return labels[value - 1];
                        }
                    }
                }
            }
        }
    };

    myChart = new Chart(
        ctx,
        config
    );
}