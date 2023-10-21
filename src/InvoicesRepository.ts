import Invoice from "./Invoice";

export default interface InvoicesRepository {
	getInvoices (): Promise<Invoice[]>;
}
