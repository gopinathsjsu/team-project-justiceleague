# FINAL PROJECT ON HOTEL BOOKING APPLICATION

## Team Name:

Team 08 JusticeLeague

## Team Members:

<li> Aishwarya Paruchuri ( SJSU ID: 015017639)
<li> Anay Dilip Naik( SJSU ID: 015217358 )
<li> Achal Rajyaguru ( SJSU ID: 015958670 )
<li> Supreet Chandrasekhar ( SJSU ID:015919566 )</li>
<br/>


## Sprint Meeting

Every Friday 
<br/>
## Technology Stack

<li> Frontend: ReactJS
<li> Backend: NodeJS and ExpressJS
<li> Database: MongoDB
<li> Deployment: AWS EC2 </li>

## XP Values Implemented

• Communication: During these tough times, in which meeting in person is not well suited we still were able to get
things done by communicating through online video conferencing platforms and we all have been
"Communicating" and Collaborating through Whatsapp and Zoom conversations pertaining to the project
discussion.
• Feedback: We believe in feedback. We have given valuable feedback to the team to create a better product.
After every development item is completed, the team gave feedback on the delivered item for
changes/suggestions.
• Respect: In every discussion, be it about tech stack, database design or project level discussions, we
acknowledged each others' unique ideas and individual viewpoints and came to a common consensus. All the
team members were empathetic towards others in resolving challenges. Hencé, We distributed responsibilities
such that everyone gets to learn everything and restrict one person to solely one aspect of programming
• Simplicity: The team was always working towards delivering products with absolutely necessary features though
which we were able to omit unnecessary development items. Even in terms of UI development, we maintained a
simple and elegant design that is easier to maintain and revise.

## Tools

<li> Frontend: Visual Studio Code,Atom,AdobeXD,Zeplin,Git
<li> Backend: </li>

## Steps to Run the Project

1. Open your terminal and clone this github repo
2. Open the cloned folder and delete the node modules and package-lock.json file
3. Type npm install
4. Type npm i
5. Type npm start

## Features Integerated

### Customer

<li> can register for the hotel
<li>can login for the hotel
<li>search for hotel rooms from chains of the hotel
<li>can create a reservation
<li>can update the hotel
<li>can see promo codes available for season
<li>can filter according to needs
<li>can select froma  set of amanities available in the hotel
<li>can update the reservation
<li>can checkout of the hotel room
<li>confirm booking and select a payment method
<li>can select a checkin and checkout date
<li>can select a type of hotel room from all the available rooms

### Admin
<li>can check the profile of all the people who booked the hotel
<li>can edit the hotel room features
<li>can add more bookings
<li>can checkout users
<li>can change the staying period of a customer
<li>can add images and more features to each room
<li>can logout of the admin module
<li>can add rooms in different location of the hotel chain
  
  ## Use Case Diagram
  ![use_case_diagram](https://user-images.githubusercontent.com/45312477/167570893-3be66308-1e14-4d66-ad9c-e4ac54436b2b.jpg)
  
  
  ## Activity Diagram
  ![activity_diagram_202](https://user-images.githubusercontent.com/45312477/167570934-a1e5abe0-0566-4bf6-97a1-9c6ec3a091a8.jpg)
  
  ## State Diagram
  ![state_diagram_202](https://user-images.githubusercontent.com/45312477/167570966-9bc0d5d2-db3d-4ae9-bac5-fa899b7f700b.jpg)
  
  ## Architecture Diagram
  ![architecture_diagram_202](https://user-images.githubusercontent.com/45312477/167571013-f7a63890-4166-44ca-aaf0-37b1af80952a.jpg)
  
  ## Class Diagram
  
  [Class Diagram.pdf](https://github.com/gopinathsjsu/team-project-justiceleague/files/8684385/Class.Diagram.pdf)


  

  


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
