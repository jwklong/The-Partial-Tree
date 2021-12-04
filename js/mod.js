let modInfo = {
	name: "The Partial Tree",
	id: "partialtree",
	author: "jwklong",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 6,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2",
	name: "Wholes with holes",
}

let changelog = `<h1>Changelog:</h1><br><br>
	<h2>v0.2 - Wholes with holes</h2><br>
	- Added 1 Partial upgrade<br>
	- Added Whole layer<br>
	- Added 3 Whole upgrades<br>
	- Added 3 Achievements<br><br>
	<h3>v0.1.2 - Partially Achieved</h3><br>
	- Added 5 Achievements<br><br>
	<h3>v0.1.1 - Partially Upgraded</h3><br>
	- Added 3 Partial upgrades<br><br>
	<h2>v0.1 - Partially Undone</h2><br>
	- Added Partial layer<br>
	- Added 4 Partial upgrades`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade('pa', 11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return new Decimal(0)
	let gain = new Decimal(1)
	if (hasUpgrade('pa', 21)) gain = gain.add(2)
	if (hasUpgrade('pa', 12)) gain = gain.times(upgradeEffect('pa', 12))
	if (hasUpgrade('pa', 22)) gain = gain.times(upgradeEffect('pa', 22))
	if (hasUpgrade('wh', 11)) gain = gain.times(3)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
