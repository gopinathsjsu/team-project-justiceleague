# HOTEL BOOKING APPLICATION

<br/> 
<br/>

# Team Name and Team Members

## Team Name:

Team 08 JusticeLeague


<br/>

## Team Members:

<li> Aishwarya Paruchuri ( SJSU ID: 015017639)
<li> Anay Dilip Naik( SJSU ID: 015217358 )
<li> Achal Rajyaguru ( SJSU ID: )
<li> Supreet Chandrasekhar ( SJSU ID: )</li>
<br/>

# Scrum meetings schedule


<br/>
<br/>

# XP Core Values Implemented


# Tools and Languages


# Database Tables

## Customers
id (primary)
first_name
last_name
email
password
<!-- address? -->
active <bool>
created_at
updated_at

CREATE TABLE IF NOT EXISTS customers (
    id PRIMARY int not null,
    email varchar(50) unique not null,
    password varchar(50) not null,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    <!-- address varchar(100) , -->
    active int(1),
    created_at timestamp default_value=current_timestamp
    modified_at timestamp
)

## Rooms
id (primary)
base_price (int)
ammenities <enum> <breakfast, fitness_room, parking, pool, all_meals>
room_type <enum> <double, suites, single>
min_guests
weekEndSurge
festivalSurge

## Ammenities (Can be predefined)
ammenity <string>
hotel_id? <string>

## Bookings
id (primary)
room_id
user_id
hotel_id?
booking_from
booking_to
price
status <enum> success, cancelled

#
Room Price = Room Base Price + Price of every extra guest + Weekday/week-end charge + Seasonal charge

# User
+ Views hotels
+ Views rooms per hotel
    + Pricing
+ Books room(s) in a hotel
    + Assert no previous booking has been done
    + Options: <...>
    + Show room rate
        - Price is based on
            - Type of room
            - Number of guests
            - Based on day/ season/ customer loyalty

+ Views bookings
+ Cancels booking

## Queries 
### User Registration
CREATE TABLE IF NOT EXISTS customers (
    id int NOT NULL PRIMARY KEY,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email varchar(50) UNIQUE NOT NULL,
    password varchar(50) NOT NULL,
    active int(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT current_timestamp,
    modified_at TIMESTAMP
);

###
INSERT INTO customers (id, first_name, last_name, email, password, active)
VALUES (0, "First", "Last", "name@email.com", "passwordasa", 1);

### Hotel creates Room (TBD)
CREATE TABLE IF NOT EXISTS rooms (
    id int NOT NULL PRIMARY KEY,
    name varchar(50) NOT NULL,
    base_price int,
    room_type ENUM('single', 'double', 'suites'),
    ammenities ENUM('breakfast', 'fitness_room', 'parking', 'pool', 'all_meals'),
    min_guests int NOT NULL,
    guest_fee int DEFAULT 0,
    week_end_surge int DEFAULT 0,
    festival_surge int DEFAULT 0,
    created_at TIMESTAMP DEFAULT current_timestamp,
    modified_at TIMESTAMP
);

###
INSERT INTO rooms (id, name, base_price, room_type, min_guests, week_end_surge, festival_surge)
VALUES (0, "Room 0", 10, "single", 2, 1, 1);
### Bookings (User creates Booking TBD)
CREATE TABLE IF NOT EXISTS bookings (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    room_id int NOT NULL,
    user_id int NOT NULL,
    price int NOT NULL,
    from_date TIMESTAMP NOT NULL,
    to_date TIMESTAMP NOT NULL,
    guest_count int DEFAULT 0,
    status ENUM ('created', 'confirmed', 'cancelled'),
    created_at TIMESTAMP DEFAULT current_timestamp,
    modified_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES customers(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);
<!-- ammenities  -->

### Get Hotels

### Update Hotel


### Get rooms

### Update a room

### Book a room

### View hotel bookings
### View user's bookings