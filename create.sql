drop table branas.invoice;
drop table branas.transaction;

create table branas.invoice (
	invoice_id integer,
	month integer,
	year integer,
	due_date timestamp
);

create table branas.transaction (
	transaction_id integer,
	invoice_id integer,
	item text,
	type text,
	amount numeric,
	date timestamp
);



insert into branas.invoice values (1, 3, 2022, '2022-03-10T00:00:00-03:00');
insert into branas.invoice values (2, 4, 2022, '2022-04-10T00:00:00-03:00');
insert into branas.invoice values (3, 5, 2022, '2022-05-10T00:00:00-03:00');
insert into branas.invoice values (4, 5, 2024, '2024-05-10T00:00:00-03:00');


insert into branas.transaction values (1, 1, 'Mensalidade', 'purchase', 1000, now());
insert into branas.transaction values (2, 1, 'Mensalidade', 'discount', 100, now());
insert into branas.transaction values (3, 1, 'Mensalidade', 'payment', 900, now());
insert into branas.transaction values (4, 1, 'Material', 'purchase', 500, now());
insert into branas.transaction values (5, 1, 'Material', 'payment', 500, now());
insert into branas.transaction values (6, 2, 'Mensalidade', 'purchase', 1000, now());
insert into branas.transaction values (7, 2, 'Mensalidade', 'payment', 1000, now());
insert into branas.transaction values (8, 3, 'Mensalidade', 'purchase', 1000, now());
insert into branas.transaction values (9, 4, 'Mensalidade', 'purchase', 1000, now());