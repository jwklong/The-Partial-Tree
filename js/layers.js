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
    exponent: 1/2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('pa', 31)) mult = mult.times(upgradeEffect('pa', 31))
        mult = mult.times(player.wh.points.gte("1") ? new Decimal("2").pow(player.wh.points) : new Decimal("1"))
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
        	description: "Start gaining points",
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
                if (hasUpgrade('pa', 33)) gain = gain.times(upgradeEffect('pa', 33))
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
                var gain = player[this.layer].points.add(1).pow(0.1)
                if (hasUpgrade('wh', 12) && hasUpgrade('pa', 32)) gain = gain.times(upgradeEffect('pa', 32))
                return gain
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
        33: {
            title: "Partial Unlock",
            description: "Multiply Partial Increaser by 2.5, and unlock something new",
            cost: new Decimal(2500),
            effect() {
                return new Decimal(2.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
    },
    passiveGeneration() {
        if (hasUpgrade("wh",13)) return 0.1
    }
})

addLayer("wh", {
    name: "wholes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Wh", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#00ffa6",
    effectDescription() {return "multiplying partial point gain by "+format(player.wh.points.gte("1") ? new Decimal("2").pow(player.wh.points) : new Decimal("1"))},
    requires: new Decimal(5000), // Can be a function that takes requirement increases into account
    resource: "wholes", // Name of prestige currency
    baseResource: "partial points", // Name of resource prestige is based on
    baseAmount() {return player.pa.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(0.5)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "W: Reset for partial points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("pa", 33) || player[this.layer].points.gte(1) || hasUpgrade("wh", 11)},
    upgrades: {
	    11: {
	        title: "Part Part Whole",
        	description: "Multiply point gain by 3",
         	cost: new Decimal(1),
       	},
        12: {
	        title: "Increased Parts",
        	description: "Partial Partial also boosts Partial Increased",
         	cost: new Decimal(2),
       	},
        13: {
	        title: "Passive Partial",
        	description: "Gain 10% of partial points every second",
         	cost: new Decimal(2),
       	},
    },
})

addLayer("a", {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "yellow",
    resource: "Achievements", 
    row: "side",
    achievements: {
        11: {
            name: "Start the game",
            done() {return player.pa.points.gte("1")},
            goalTooltip: "Uhm, I think you should do something...",
            doneTooltip: "You started the game!",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        12: {
            name: "Expansion",
            done() {return hasUpgrade("pa", 13)},
            tooltip: "Get Point Booster Booster.",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        13: {
            name: "Self-Boosted",
            done() {return hasUpgrade("pa", 22)},
            tooltip: "Get Point Booster?",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        14: {
            name: "Self-Boosted 2",
            done() {return hasUpgrade("pa", 31)},
            tooltip: "Get Partial Increased.",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        15: {
            name: "Base Boost",
            done() {return hasUpgrade("pa", 32)},
            tooltip: "Get Partial Partial.",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        21: {
            name: "Wholey",
            done() {return player.wh.points.gte(1)},
            goalTooltip: "Get a Whole.",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        22: {
            name: "Self-Boosted 3",
            done() {return hasUpgrade("wh", 12)},
            tooltip: "Get Increased Parts.",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
        23: {
            name: "Auto-Gain",
            done() {return hasUpgrade("wh", 13)},
            tooltip: "Get Passive Partial.",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)}
        },
    },
},
)
