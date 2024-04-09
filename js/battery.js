/* Variables */
const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');
const robohashImage = document.querySelector('#robohash-image');

/* Functions */
function updateBatteryStatus(battery) {
    // Update the charging status
    if (battery.charging === true) {
        chargeStatus.textContent = "Charging...";
    } else {
        chargeStatus.textContent = "Discharging...";
    }
    
    // Update the charge level
    chargeLevel.textContent = (battery.level * 100) + "%";
    chargeMeter.value = battery.level * 100;

    // Fetch image from Robohash API based on battery percentage
    const batteryPercentage = Math.round(battery.level * 100);
    const robohashURL = `https://robohash.org/${batteryPercentage}.png`;
    
    // Set the source of the image element to the Robohash URL
    robohashImage.src = robohashURL;
}

navigator.getBattery().then(battery => {
    // Update battery information when the promise resolves
    updateBatteryStatus(battery);

    // Event listener for changes to the charging status
    battery.addEventListener("chargingchange", () => {
        updateBatteryStatus(battery);
    });

    // Event listener for changes to the charge level
    battery.addEventListener("levelchange", () => {
        updateBatteryStatus(battery);
    });
});
