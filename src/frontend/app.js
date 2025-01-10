const coinSelect = document.getElementById('coin-select');
const cryptoStats = document.getElementById('crypto-stats');
const deviationData = document.getElementById('deviation-data');

const fetchStats = async (coin) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/stats/${coin}`);
        const data = await response.json();

        if (data.error) {
            cryptoStats.innerHTML = `<p>Error: ${data.error}</p>`;
        } else {
            cryptoStats.innerHTML = `
                <p><strong>Price:</strong> $${data.price}</p>
                <p><strong>Market Cap:</strong> $${data.marketCap}</p>
                <p><strong>24h Change:</strong> ${data["24hChange"]}%</p>
            `;
        }
    } catch (error) {
        cryptoStats.innerHTML = `<p>Error fetching data</p>`;
    }
};

const fetchDeviation = async (coin) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/deviations/${coin}`);
        const data = await response.json();

        if (data.error) {
            deviationData.innerHTML = `<p>Error: ${data.error}</p>`;
        } else {
            deviationData.innerHTML = `
                <p><strong>Deviation:</strong> ${data.deviation}%</p>
            `;
        }
    } catch (error) {
        console.log(error)
        deviationData.innerHTML = `<p>Error fetching deviation</p>`;
    }
};

// Fetch data for the default coin (Bitcoin)
fetchStats(coinSelect.value);
fetchDeviation(coinSelect.value);

// Update stats and deviation when a new coin is selected
coinSelect.addEventListener('change', (event) => {
    fetchStats(event.target.value);
    fetchDeviation(event.target.value);
});
