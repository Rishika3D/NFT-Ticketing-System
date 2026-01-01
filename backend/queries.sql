-- Active: 1767268122154@@127.0.0.1@5432@ashi
CREATE TABLE events (
    id BIGINT PRIMARY KEY,             -- blockchain eventId
    name TEXT NOT NULL,
    price_eth NUMERIC NOT NULL,
    total_tickets INT NOT NULL,
    sold INT NOT NULL,
    organizer TEXT NOT NULL,
    metadata_uri TEXT,
    last_synced TIMESTAMP DEFAULT NOW()
);

