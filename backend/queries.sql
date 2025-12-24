create table TicketInfo(
    ticket_id serial primary key,
    event_id integer not null,
    purchaser_name varchar(100) not null,
    purchase_date timestamp default current_timestamp,
    seat_number varchar(10),
    price numeric(10, 2) not null,
    foreign key (event_id) references Events(event_id)
)