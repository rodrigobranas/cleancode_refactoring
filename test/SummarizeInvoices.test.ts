import InvoicesRepositoryDatabase from "../src/InvoicesRepositoryDatabase";
import SummarizeInvoices from "../src/SummarizeInvoices";

test("Deve testar a sumarização da fatura", async function () {
	const invoicesRepository = new InvoicesRepositoryDatabase();
	// const invoicesDAO: InvoicesDAO = {
	// 	async getInvoices (): Promise<any> {
	// 		return [
	// 			{ invoice_id: 1, month: 3, year: 2022, due_date: new Date('2022-03-10T00:00:00-03:00') },
	// 			{ invoice_id: 2, month: 4, year: 2022, due_date: new Date('2022-04-10T00:00:00-03:00') },
	// 			{ invoice_id: 3, month: 5, year: 2022, due_date: new Date('2022-05-10T00:00:00-03:00') },
	// 			{ invoice_id: 4, month: 5, year: 2024, due_date: new Date('2024-05-10T00:00:00-03:00') }
	// 		]
	// 	},
	// 	async getTransactions (invoiceId: number): Promise<any> {
	// 		return [
	// 			{ transaction_id: 1, invoice_id: 1, item: 'Mensalidade', type: 'purchase', amount: "1000",date: new Date() },
	// 			{ transaction_id: 2, invoice_id: 1, item: 'Mensalidade', type: 'discount', amount: "100",date: new Date() },
	// 			{ transaction_id: 3, invoice_id: 1, item: 'Mensalidade', type: 'payment', amount: "900",date: new Date() },
	// 			{ transaction_id: 4, invoice_id: 1, item: 'Material', type: 'purchase', amount: "500",date: new Date() },
	// 			{ transaction_id: 5, invoice_id: 1, item: 'Material', type: 'payment', amount: "500",date: new Date() },
	// 			{ transaction_id: 6, invoice_id: 2, item: 'Mensalidade', type: 'purchase', amount: "1000",date: new Date() },
	// 			{ transaction_id: 7, invoice_id: 2, item: 'Mensalidade', type: 'payment', amount: "1000",date: new Date() },
	// 			{ transaction_id: 8, invoice_id: 3, item: 'Mensalidade', type: 'purchase', amount: "1000",date: new Date() },
	// 			{ transaction_id: 9, invoice_id: 4, item: 'Mensalidade', type: 'purchase', amount: "1000",date: new Date() }
	// 		].filter((invoice) => invoice.invoice_id === invoiceId);
	// 	}
	// }
	const summarizeInvoices = new SummarizeInvoices(invoicesRepository);
	const output = await summarizeInvoices.execute({ today: new Date("2023-10-20T22:00:00-03:00") });
	const expected = [
		[1500, 100, 1400, 0, 'paid', 0, 0, 0, 0],
		[1000, 0, 1000, 0, 'paid', 0, 0, 0, 0],
		[1000, 0, 0, 1000, 'overdue', 20, 174.57, 529, 1194.57],
		[1000, 0, 0, 1000, 'open', 0, 0, 0, 1000]
	];
	expect(expected).toEqual(output);
});
