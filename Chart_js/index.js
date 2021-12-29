d3.csv("sample.csv").then((data) => {
    data = data.sort((a, b) => (b.seq - a.seq));
    data.forEach((d) => {
        d.snapshot_created = d.snapshot_created.split(' ')[0];
    });
    let date;
    let lastDate;
    let cnt=0;
    let labels = new Set();
    const label_size = 6;
    data = data.filter((d) => {
        date = d.snapshot_created;
        if (date === undefined) {
            // pass
        } else if (date !== lastDate) {
            cnt++;
        } else {
            // pass
        }
        lastDate = date;

        if (cnt <= label_size) {
            labels.add(date);
            return true;
        } else {
            return false;
        }
    });
    labels = [...labels];
    console.log(labels);
    console.log(data);
    const ctx = document.getElementById('myChart').getContext('2d');
    let defaultBorderAlpha = 1;
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    `rgba(255, 99, 132, ${defaultBorderAlpha})`,
                    `rgba(54, 162, 235, ${defaultBorderAlpha})`,
                    `rgba(255, 206, 86, ${defaultBorderAlpha})`,
                    `rgba(75, 192, 192, ${defaultBorderAlpha})`,
                    `rgba(153, 102, 255, ${defaultBorderAlpha})`,
                    `rgba(255, 159, 64, ${defaultBorderAlpha})`
                ],
                borderWidth: 5,
                hoverBorderWidth: 10,
                hoverBorderColor :[
                    `rgba(255, 99, 132, ${defaultBorderAlpha+3})`,
                    `rgba(54, 162, 235, ${defaultBorderAlpha+3})`,
                    `rgba(255, 206, 86, ${defaultBorderAlpha+3})`,
                    `rgba(75, 192, 192, ${defaultBorderAlpha+3})`,
                    `rgba(153, 102, 255, ${defaultBorderAlpha+3})`,
                    `rgba(255, 159, 64, ${defaultBorderAlpha+3})`
                ]
            }]
        },
        options: {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            scales: {
                yAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                        precision: 0,
                        suggestedMax: 5
                    }
                }],
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
