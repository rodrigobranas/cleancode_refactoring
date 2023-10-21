import Invoice from "./Invoice";
import InvoicesRepository from "./InvoicesRepository";
import pgp from "pg-promise";

export default class InvoicesRepositoryDatabase implements InvoicesRepository {

	async getInvoices(): Promise<Invoice[]> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const invoicesData = await connection.query("select * from branas.invoice", []);
		const invoices = [];
		for (const invoiceData of invoicesData) {
			const invoice = new Invoice(invoiceData.invoice_id, invoiceData.due_date);
			const transactionsData = await connection.query("select * from branas.transaction t where invoice_id = $1", [invoice.invoiceId]);
			for (const transaction of transactionsData) {
				invoice.addTransaction(transaction.type, parseFloat(transaction.amount));
			}
			invoices.push(invoice);
		}

		await connection.$pool.end();
		return invoices;
	}

}
