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
			cost(x) { return new Decimal(1).mul(x) },
			display() { return "Blah" },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
		},
	},
	color: "#4BDC13",
	row: 0, // Row the layer is in on the tree (0 is the first row)
	layerShown(){return true}
})
