export default interface Transaction {
	type: string;
	amount: number;
	getAmount(): number;
	getBalance(): number;
}

export class Purchase {
	type = "purchase";

	constructor (readonly amount: number) {
	}

	getAmount () {
		return this.amount;
	}

	getBalance () {
		return this.amount;
	}
}

export class Discount {
	type = "discount";

	constructor (readonly amount: number) {
	}

	getAmount () {
		return this.amount;
	}

	getBalance () {
		return this.amount * -1;
	}
}

export class Payment {
	type = "payment";

	constructor (readonly amount: number) {
	}

	getAmount () {
		return this.amount;
	}

	getBalance () {
		return this.amount * -1;
	}
}

export class TransactionFactory {
	static create (type: string, amount: number) {
		if (type === "purchase") return new Purchase(amount);
		if (type === "discount") return new Discount(amount);
		if (type === "payment") return new Payment(amount);
		throw new Error();
	}
}