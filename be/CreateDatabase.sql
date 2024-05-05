
CREATE TABLE users (
    user_name VARCHAR(50) PRIMARY KEY,
    hashed_password VARCHAR(50) UNIQUE NOT NULL
);

CREATE SEQUENCE reminder_id_sequence;

CREATE TABLE reminder (
    reminder_id VARCHAR(50) PRIMARY KEY DEFAULT 'R' || nextval('reminder_id_sequence'),
    task_name VARCHAR(50) NOT NULL,
    reminder_description TEXT,
    reminder_time TIME,
    on_off BOOLEAN NOT NULL DEFAULT FALSE,
    username VARCHAR(50) /*NOT NULL*/
);

CREATE OR REPLACE FUNCTION set_reminder_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW.reminder_id := 'R' || nextval('reminder_id_sequence');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_reminder_id_trigger
BEFORE INSERT ON reminder
FOR EACH ROW
EXECUTE FUNCTION set_reminder_id();

CREATE TABLE configurations (
	area VARCHAR(50) PRIMARY KEY,
	receive_notification TEXT,
	upper_limit REAL NOT NULL,
	base_limit REAL NOT NULL,
	pump_mode BOOLEAN NOT NULL DEFAULT FALSE,
	moisture_mode BOOLEAN NOT NULL DEFAULT FALSE,
  moisture_base_limit REAL,
  moisture_upper_limit REAL,
	username VARCHAR(50) NOT NULL
);

CREATE TABLE device (
	device_id VARCHAR(50) PRIMARY KEY,
	device_type VARCHAR(25) NOT NULL,
	device_location VARCHAR(10),
	username VARCHAR(50)
);	
CREATE TABLE record (
	record_id INT PRIMARY KEY,
	record_date DATE NOT NULL,
	device_id VARCHAR(50) NOT NULL
);
CREATE TABLE moisture_record (
	moisture_record_id INT PRIMARY KEY,
	moisture REAL NOT NULL
);
CREATE TABLE temperature_record (
	temperature_record_id INT PRIMARY KEY,
	temperature REAL NOT NULL
);
CREATE TABLE light_record (
	light_record_id INT PRIMARY KEY,
	lux REAL NOT NULL
);
CREATE TABLE activity (
	activity_id SERIAL PRIMARY KEY,
	activity_time DATE NOT NULL,
	acttivity_description VARCHAR(100),
	device_id VARCHAR(50) NOT NULL
);

ALTER TABLE reminder
ADD FOREIGN KEY (username) REFERENCES users(user_name);

ALTER TABLE configurations
ADD FOREIGN KEY (username) REFERENCES users(user_name);

ALTER TABLE device
ADD FOREIGN KEY (username) REFERENCES users(user_name);

ALTER TABLE record
ADD FOREIGN KEY (device_id) REFERENCES device(device_id);

ALTER TABLE activity
ADD FOREIGN KEY (device_id) REFERENCES device(device_id);

ALTER TABLE moisture_record
ADD FOREIGN KEY (moisture_record_id) REFERENCES record(record_id);

ALTER TABLE temperature_record
ADD FOREIGN KEY (temperature_record_id) REFERENCES record(record_id);

ALTER TABLE light_record
ADD FOREIGN KEY (light_record_id) REFERENCES record(record_id);

INSERT INTO users (user_name, hashed_password) VALUES ('username1', 'password1');

INSERT INTO device (device_id, device_type, device_location, username) VALUES 
	('1', 'temp_sensor', 'BK', 'username1'),
	('2', 'light_sensor', 'BK', 'username1'),
	('L1', 'light', 'BK', 'username1'),
	('L2', 'light', 'BK', 'username1'),
	('L3', 'light', 'BK', 'username1'),
  ('M1', 'moisture', 'BK', 'username1');
