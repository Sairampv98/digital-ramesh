const environmentInfo = {
    platform: process.platform,
    nodeVersion: process.version,
    currentTime: new Date().toLocaleTimeString()
};

console.log("Iam running on: " + environmentInfo.platform);
console.log("My nodeJS version is: "+ environmentInfo.nodeVersion);
console.log("The time is :" + environmentInfo.currentTime);