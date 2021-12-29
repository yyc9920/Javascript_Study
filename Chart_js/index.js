d3.csv("sample.csv").then((data) => {
    data = data.sort((a, b) => (b.seq - a.seq));
    data.forEach((d) => {
        d.snapshot_created = d.snapshot_created.split(' ')[0];
    });

    let labels = new Set();
    let names = new Set();
    let datasets = [];
    let datas = {};
    const label_size = 6;
    const defaultBorderAlpha = 1;
    data.forEach((d) => {
        labels.add(d.snapshot_created);
        names.add(d.name);
    });
    labels = [...labels].sort().slice(-label_size);
    names = [...names]
    console.log(labels);
    console.log(data);

    let nested_data = Array.from(d3.group(data, d => d.snapshot_created, d => d.name), ([key, value]) => ({key, value}));
    console.log(nested_data[0].value.get("YechanYun")[0].count);
    console.log(nested_data);

    nested_data.forEach((d) => {
        names.forEach((n) => {
            // console.log(Object.keys(datas));
            if (d.value.get(n) === undefined) {
                if (n in datas) {
                    datas[n].push(0);
                } else {
                    datas[n] = [0];
                }
            } else {
                if (n in datas) {
                    datas[n].push(+d.value.get(n)[0].count);
                } else {
                    datas[n] = [+d.value.get(n)[0].count];
                }
            }
        });
    });

    Object.keys(datas).forEach((d) => {
        let r = parseInt(Math.random() * 255);
        let g = parseInt(Math.random() * 255);
        let b = parseInt(Math.random() * 255);
        let color = `rgba(${r}, ${g}, ${b}, ${defaultBorderAlpha})`;
        let backgroundColor = `rgba(${r}, ${g}, ${b}, ${defaultBorderAlpha/4})`;
        datasets.push({
            label: d,
            data: datas[d],
            borderColor: color,
            backgroundColor: backgroundColor,
        });
    });
    console.log(datas["YechanYun"]);
    console.log(datasets);

    Chart.defaults.global.defaultFontFamily = 'sans-serif';
    Chart.defaults.global.defaultFontSize = 15;
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: false,
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            legend: {
                labels: {
                    fontSize: 12,
                }
            }
        }
    });
});
