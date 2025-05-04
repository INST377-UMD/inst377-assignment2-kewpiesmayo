let chart;

//Finds and Displays Chart of Specified Stock Ticker (Type and Voice input)
function LookupStock(voiceTicker = null) {
    let ticker = null;
    if(voiceTicker == null){
        ticker = document.getElementById("tickerInput").value.toUpperCase();
    }
    else{
        ticker = voiceTicker.toUpperCase()
    }
    const days = parseInt(document.getElementById("daysSelect").value);
    getStock(ticker, days);
}

//GETS stock data from specified stock ticker and days
async function getStock(ticker, days) {
    const polyKey = '1br5ZJTydpsiPZHScZtFtWlLFaCy3Z3O';
    let endDate = new Date();
    let startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    const formatDate = (date) => date.toISOString().split('T')[0];

    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${formatDate(startDate)}/${formatDate(endDate)}?adjusted=true&sort=asc&apiKey=${polyKey}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (!data.results || data.results.length === 0) {
                console.log(`No data found for ticker "${ticker}"`);
                return;
              }

            const labels = data.results.map(item => new Date(item.t).toLocaleDateString());
            const closing = data.results.map(item => item.c);

            createChart(labels, closing, ticker);
        })
}

//Creates the chart given the data and tickers
function createChart(labels, data, ticker) {
    const ctx = document.getElementById("myChart");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${ticker} Closing Prices`,
                data: data,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

    document.getElementById("chartarea").style.visibility = "visible";
}

//GETS trade info from API and displays them dynamically into table
async function loadRedditStocks() {
    const response = await fetch("https://tradestie.com/api/v1/apps/reddit?date=2022-04-03");
    const data = await response.json();
    const topFive = data.slice(0, 5); // Get top 5

    const tableBody = document.querySelector("#redditTable tbody");
    tableBody.innerHTML = ""; // Clear any previous rows

    topFive.forEach(stock => {
        const row = document.createElement("tr");

        // Create link to Yahoo Finance
        const link = `https://finance.yahoo.com/quote/${stock.ticker}`;
        const tickerCell = `<td><a href="${link}" target="_blank">${stock.ticker}</a></td>`;

        const commentsCell = `<td>${stock.no_of_comments}</td>`;

        // Determine sentiment icon
        let sentimentIcon;
        if (stock.sentiment === "Bullish") {
        sentimentIcon = `<img src="https://static.thenounproject.com/png/3328202-200.png" alt="bullish">`;
        } else {
        sentimentIcon = `<img src="https://static.thenounproject.com/png/3328203-200.png" alt="bullish">`;
        }
        const sentimentCell = `<td>${sentimentIcon}</td>`;

        row.innerHTML = tickerCell + commentsCell + sentimentCell;
        tableBody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadRedditStocks(); // Load top Reddit stocks
});


function stockVoiceCommand(voiceTicker){
    LookupStock(voiceTicker)
}

if (annyang) {
    const stockcommands = {
      'look up *voiceTicker': stockVoiceCommand
    };
  
    annyang.addCommands(stockcommands);
  }
