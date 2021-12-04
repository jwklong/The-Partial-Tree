addLayer("pa", {
    name: "parts", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Pa", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#A600FF",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "partial points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('pa', 31)) mult = mult.times(upgradeEffect('pa', 31))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for partial points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
	    11: {
	        title: "Partial Production",
        	description: "Start gaining points.",
         	cost: new Decimal(1),
       	},
	    12: {
	        title: "Point Booster",
    	    description: "Partial points boost points",
    	    cost: new Decimal(3),
            effect() {
	    	    var gain = player[this.layer].points.add(1).pow(0.5)
	    	    if (hasUpgrade('pa', 13)) gain = gain.times(upgradeEffect('pa', 13))
                return gain
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
       	},
	    13: {
	        title: "Point Booster Booster",
    	    description: "Partial points boost Point Booster",
    	    cost: new Decimal(10),
            effect() {
                return player[this.layer].points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
       	},
        21: {
            title: "Partial Increaser",
            description: "Base point gain is increased",
            cost: new Decimal(50),
            effect() {
	    	    var gain = new Decimal(2)
	    	    if (hasUpgrade('pa', 32)) gain = gain.times(upgradeEffect('pa', 32))
                return gain
            },
            effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id)) },
        },
        22: {
            title: "Point Booster?",
            description: "Points boost themselves",
            cost: new Decimal(125),
            effect() {
                return player.points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        31: {
            title: "Partial Increased",
            description: "Partial points boost themselves",
            cost: new Decimal(300),
            effect() {
                return player[this.layer].points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        32: {
            title: "Partial Partial",
            description: "Partial points boost Partial Increaser",
            cost: new Decimal(850),
            effect() {
                return player[this.layer].points.add(1).pow(0.07)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
    },
})
