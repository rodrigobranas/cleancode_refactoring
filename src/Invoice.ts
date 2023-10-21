import Period from "./Period";
import Transaction, { TransactionFactory } from "./Transaction";

export default class Invoice {
	transactions: Transaction[];

	PENALTY_PERCENTAGE = 2;
	INTEREST_PERCENTAGE = 0.033;

	constructor (readonly invoiceId: number, readonly dueDate: Date) {
		this.transactions = [];
	}

	addTransaction (type: string, amount: number) {
		this.transactions.push(TransactionFactory.create(type, amount));
	}

	getBalance () {
		let balance = 0;
		for (const transaction of this.transactions) {
			balance += transaction.getBalance();
		}
		return balance;
	}

	getTransactionType (type: string) {
		let total = 0;
		for (const transaction of this.transactions) {
			if (transaction.type === type) total += transaction.amount;
		}
		return total;
	}

	getPenalty () {
		const balance = this.getBalance();
		return (balance * this.PENALTY_PERCENTAGE)/100;
	}

	getInterest (today: Date) {
		const balance = this.getBalance();
		const dueDays = this.getDueDays(today);
		return (balance * this.INTEREST_PERCENTAGE * dueDays)/100;
	}

	getDueDays (today: Date) {
		const period = new Period(this.dueDate, today);
		return period.getDiffInDays();
	}

	getStatus (today: Date) {
		const balance = this.getBalance();
		if (balance === 0) return "paid";
		if (this.isOverdue(today)) return "overdue";
		return "open";
	}

	isOverdue (today: Date) {
		return this.dueDate.getTime() < (today.getTime());
	}

}