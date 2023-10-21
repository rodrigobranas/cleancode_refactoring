import InvoicesRepository from "./InvoicesRepository";

export default class SummarizeInvoices {

	constructor (readonly invoicesRepository: InvoicesRepository) {
	}

	async execute (input: Input) {
		const result = [];
		const invoices = await this.invoicesRepository.getInvoices();
		for (const invoice of invoices) {
			const balance = invoice.getBalance();
			const purchases = invoice.getTransactionType("purchase");
			const discounts = invoice.getTransactionType("discount");
			const payments = invoice.getTransactionType("payment");
			const status = invoice.getStatus(input.today);
			let penalty = 0;
			let dueDays = 0;
			let interest = 0;
			if (status === "overdue") {
				penalty = invoice.getPenalty();
				dueDays = invoice.getDueDays(input.today);
				interest = invoice.getInterest(input.today);
			}
			const total = (balance + penalty + interest);
			result.push([purchases,discounts,payments,balance,status,penalty,interest,dueDays,total]);
		}
		return result;
	}

}

type Input = {
	today: Date
}
