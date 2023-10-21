export default class Period {

	constructor (readonly start: Date, readonly end: Date) {
	}

	getDiffInDays () {
		return Math.round(((this.end.getTime()) - this.start.getTime())/(1000*60*60*24));
	}
}