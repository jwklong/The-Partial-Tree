addLayer("ma", {
	name: "Mass", // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	tooltip: "Mass",
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
	}},
	buyables: {
		11: {
			cost() {
				var fp = new Decimal(1)
				return new Decimal(10).pow(getBuyableAmount(this.layer, this.id).div(fp).pow(1.15)).mul(10)
			},
			display() { return `Rank ${formatWhole(getBuyableAmount(this.layer, this.id))}\n\nCost: ${format(this.cost())}` },
			canAfford() { return player.points.gte(this.cost()) },
			buy() {
				player.points = new Decimal(0)
				setBuyableAmount(this.layer, 21, new Decimal(0))
				setBuyableAmount(this.layer, 22, new Decimal(0))
				setBuyableAmount(this.layer, 23, new Decimal(0))
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			style: {
				width: "175px",
				height: "75px"
			}
		},
		21: {
			cost() {
				var x = new Decimal(10).mul(new Decimal(1.5).pow(getBuyableAmount(this.layer, this.id)))
				return x
			},
			display() { return `Muscler [${formatWhole(getBuyableAmount(this.layer, this.id))}]\n\nCost: ${format(this.cost())}\nEffect: +${format(this.effect())}` },
			canAfford() { return player.points.gte(this.cost()) },
			buy() {
				player.points = player.points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect() {
				var x = new Decimal(1).mul(getBuyableAmount(this.layer, this.id))
				x = x.mul(buyableEffect(this.layer, 22))
				return x
			},
			unlocked() {return getBuyableAmount(this.layer, 11).gte(1)},
			style: {
				width: "175px",
				height: "75px"
			}
		},
		22: {
			cost() {
				var x = new Decimal(100).mul(new Decimal(4).pow(getBuyableAmount(this.layer, this.id)))
				return x
			},
			display() { return `Booster [${formatWhole(getBuyableAmount(this.layer, this.id))}]\n\nCost: ${format(this.cost())}\nEffect: x${format(this.effect())}` },
			canAfford() { return player.points.gte(this.cost()) },
			buy() {
				player.points = player.points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect() {
				var x = new Decimal(2).mul(getBuyableAmount(this.layer, this.id))
				x = x.pow(buyableEffect(this.layer, 23))
				return x.add(1)
			},
			unlocked() {return getBuyableAmount(this.layer, 11).gte(2)},
			style: {
				width: "175px",
				height: "75px"
			}
		},
		23: {
			cost() {
				var x = new Decimal(1000).mul(new Decimal(9).pow(getBuyableAmount(this.layer, this.id)))
				return x
			},
			display() { return `Stronger [${formatWhole(getBuyableAmount(this.layer, this.id))}]\n\nCost: ${format(this.cost())}\nEffect: ^${format(this.effect())}${buyableEffect(this.layer, 23).gt(10) ? " (softcapped)" : ""}` },
			canAfford() { return player.points.gte(this.cost()) },
			buy() {
				player.points = player.points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect() {
				var x = new Decimal(1).mul(getBuyableAmount(this.layer, this.id))
				return x.add(1).softcap(10, 0.5, 0)
			},
			unlocked() {return getBuyableAmount(this.layer, 11).gte(3)},
			style: {
				width: "175px",
				height: "75px"
			}
		},
	},
	color: "#999",
	row: 0, // Row the layer is in on the tree (0 is the first row)
	layerShown(){return true}
})
