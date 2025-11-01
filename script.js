// --- IMPORTANT ---
// Replace 'YOUR_API_KEY_HERE' with your actual API key from FortniteAPI.io
const apiKey = 'YOUR_API_KEY_HERE';
// ---

const shopContainer = document.getElementById('shop-container');
const shopDateElement = document.getElementById('shop-date');

// Function to fetch and display the shop data
async function fetchShopItems() {
    // Check if an API key is provided
    if (apiKey === 'YOUR_API_KEY_HERE' || !apiKey) {
        shopContainer.innerHTML = `<p style="color: red; text-align: center; grid-column: 1 / -1;">Error: Please add your API key in the script.js file.</p>`;
        return;
    }

    try {
        const response = await fetch('https://fortniteapi.io/v2/shop?lang=en', {
            headers: {
                'Authorization': apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        // Set the shop date
        const date = new Date(data.lastUpdate.date);
        shopDateElement.textContent = `Current Shop for: ${date.toLocaleDateString()}`;

        // Clear previous items
        shopContainer.innerHTML = '';

        // Loop through shop items and create HTML elements
        data.shop.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('shop-item');

            itemElement.innerHTML = `
                <img src="${item.displayAssets[0].url}" alt="${item.displayName}">
                <h2>${item.displayName}</h2>
                <p>${item.rarity.name}</p>
                <p>vBucks: ${item.price.finalPrice}</p>
            `;
            
            shopContainer.appendChild(itemElement);
        });

    } catch (error) {
        console.error("Failed to fetch shop items:", error);
        shopContainer.innerHTML = `<p style="color: orange; text-align: center; grid-column: 1 / -1;">Could not load shop data. Please check the console for errors.</p>`;
    }
}

// Run the function when the page loads
fetchShopItems();
