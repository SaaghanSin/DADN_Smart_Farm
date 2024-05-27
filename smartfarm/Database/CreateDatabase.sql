CREATE TABLE gmails (
    gmailuser VARCHAR(50),
    gmailpass VARCHAR(50)
)

CREATE TABLE users (
    phonenum VARCHAR(50) PRIMARY KEY,
    password VARCHAR(50) UNIQUE NOT NULL
)

CREATE TABLE otp (
    otpcode VARCHAR(10)
)

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
ADD FOREIGN KEY (username) REFERENCES users(phonenum);

ALTER TABLE configurations
ADD FOREIGN KEY (username) REFERENCES users(phonenum);

ALTER TABLE device
ADD FOREIGN KEY (username) REFERENCES users(phonenum);

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

INSERT INTO device (device_id, device_type, device_location, username) VALUES 
	('1', 'temp_sensor', 'BK', 'username1'),
	('2', 'light_sensor', 'BK', 'username1'),
	('L1', 'light', 'BK', 'username1'),
	('L2', 'light', 'BK', 'username1'),
	('L3', 'light', 'BK', 'username1'),
  	('M1', 'moisture', 'BK', 'username1');
  
INSERT INTO users VALUES 
('0112233445','123456'),
('0123456789','123456789'),
('0192938281','HCMUTK21'),
('0234493233','motlongvibachkhoa'),
('0429929101','bachkhoamuonnam'),
('0566778899','0878785'),
('0847292921','yeubku123'),
('0912812919','123445'),
('0912912191','1232454432'),
('0987654321','sinhviennam3')

INSERT INTO gmails VALUES
('thanhhai123@gmail.com','020703'),
('quanghien132@gmail.com','141200'),
('lehien321@gmail.com','Hien123'),
('nguyenduong312@gmail.com','smartfarm12345'),
('hoangdai213@gmail.com','localhost111'),
('nguyenhai1412@gmail.com','nhai112233'),
('hienquang023@gmail.com','aabbccdd'),
('hienle534@gmail.com','bigbang'),
('duongnguyen029@gmail.com','BoyHCMUT'),
('daivu555@gmail.com','014DaiVu')

INSERT INTO otp VALUES
('012345'),
('923828'),
('298390'),
('029309'),
('928398'),
('203900'),
('209309'),
('476568'),
('856887'),
('356769'),
('029838'),
('123456'),
('434565'),
('434679'),
('678976'),
('548759'),
('978574'),
('345678'),
('865865'),
('546779')