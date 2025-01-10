async function getStats() {
    const coin = document.getElementById('coinStats').value;
    if (!coin) {
        alert("Please select a coin");
        return;
    }

    try {
        const response = await fetch(`/api/v1/stats/${coin}`);
        const data = await response.json();

        let content = `<strong>API Called:</strong> /api/v1/stats/${coin}<br>`;

        if (response.ok) {
            content += `
                <strong>Price:</strong> $${data.price}<br>
                <strong>Market Cap:</strong> $${data.marketCap}<br>
                <strong>24h Change:</strong> ${data['24hChange']}%
            `;
        } else {
            content += `<strong>Error:</strong> ${data.error}`;
        }

        document.getElementById('statsResponse').innerHTML = content;
        
        document.getElementById('rawStatsResponse').innerHTML = formatJson(data);

        document.getElementById('toggleRawStats').style.display = 'inline-block';

    } catch (error) {
        document.getElementById('statsResponse').innerHTML = `<strong>Error:</strong> ${error.message}`;
    }
}

async function getDeviation() {
    const coin = document.getElementById('coinDeviation').value;
    if (!coin) {
        alert("Please select a coin");
        return;
    }

    try {
        const response = await fetch(`/api/v1/deviations/${coin}`);
        const data = await response.json();

        let content = `<strong>API Called:</strong> /api/v1/deviations/${coin}<br>`;

        if (response.ok) {
            content += `<strong>Deviation:</strong> ${data.deviation}%`;
        } else {
            content += `<strong>Error:</strong> ${data.error}`;
        }

        document.getElementById('deviationResponse').innerHTML = content;
        
        document.getElementById('rawDeviationResponse').innerHTML = formatJson(data);

        document.getElementById('toggleRawDeviation').style.display = 'inline-block';

    } catch (error) {
        document.getElementById('deviationResponse').innerHTML = `<strong>Error:</strong> ${error.message}`;
    }
}

function formatJson(data) {
    return `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

function toggleRawResponse(type) {
    const rawResponse = document.getElementById(`raw${capitalizeFirstLetter(type)}Response`);
    const toggleButton = document.getElementById(`toggleRaw${capitalizeFirstLetter(type)}`);

    if (rawResponse.style.display === "none") {
        rawResponse.style.display = "block";
        toggleButton.innerHTML = "Hide Raw Response";
    } else {
        rawResponse.style.display = "none";
        toggleButton.innerHTML = "Show Raw Response";
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
