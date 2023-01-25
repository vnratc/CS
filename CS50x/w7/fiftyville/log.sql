-- Keep a log of any SQL queries you execute as you solve the mystery.

-- Find all relevant descriptions
SELECT description
  FROM crime_scene_reports
 WHERE year = 2021
   AND month = 7
   AND day = 28
   AND street = 'Humphrey Street';

-- Theft of the CS50 duck took place at
-- 10:15am
-- at the Humphrey Street bakery.
-- Interviews were conducted today with three witnesses who were present at the time –
-- each of their interview transcripts mentions the bakery. |

-- Find all relevant interviews
SELECT name, transcript
  FROM interviews
 WHERE year = 2021
   AND month = 7
   AND day = 28;

-- | Ruth    |
-- Sometime within ten minutes of the theft,
-- I saw the thief get into a car in the bakery parking lot and drive away.
-- If you have security footage from the bakery parking lot, you might want to look for cars that left the parking lot in that time frame.

-- | Eugene  |
-- I don't know the thief's name, but it was someone I recognized.
-- Earlier this morning, before I arrived at Emma's bakery, I was walking by the ATM on Leggett Street and saw the thief there withdrawing some money.                                                                                                 |

-- | Raymond |
-- As the thief was leaving the bakery, they called someone who talked to them for less than a minute.
-- In the call, I heard the thief say that they were planning to take the earliest flight out of Fiftyville tomorrow.
-- The thief then asked the person on the other end of the phone to purchase the flight ticket. |

-- Find all relevant license plates
SELECT *
  FROM bakery_security_logs
 WHERE year = 2021
  AND month = 7
  AND day = 28
  AND hour = 10
  AND minute BETWEEN 10 AND 30;


-- | 28  | 8    | 18     | entrance | L93JTIZ       |
-- | 28  | 8    | 23     | entrance | 94KL13X       |
-- | 28  | 8    | 36     | entrance | 322W7JE       |
-- | 28  | 8    | 42     | entrance | 0NTHK55       |
-- | 28  | 9    | 14     | entrance | 4328GD8       |
-- | 28  | 9    | 15     | entrance | 5P2BI95       |
-- | 28  | 9    | 20     | entrance | 6P58WS2       |
-- | 28  | 9    | 28     | entrance | G412CB7       |
-- | 28  | 10   | 14     | entrance | 13FNH73       |
-- | 28  | 10   | 16     | exit     | 5P2BI95       |
| 28  | 10   | 18     | exit     | 94KL13X       | -- DID LEAVE PARKING, DID CALL AND DID WITHDRAW CASH
-- | 28  | 10   | 18     | exit     | 6P58WS2       |
-- | 28  | 10   | 19     | exit     | 4328GD8       |
-- | 28  | 10   | 20     | exit     | G412CB7       |
-- | 28  | 10   | 21     | exit     | L93JTIZ       | -- DID WITHDRAW CASH AND LEAVE PARKINGS LOT BUT DID NOT CALL WITHIN 10 MIN
-- | 28  | 10   | 23     | exit     | 322W7JE       |
-- | 28  | 10   | 23     | exit     | 0NTHK55       |

-- Find all relevant account nubers
SELECT *
  FROM atm_transactions
 WHERE atm_location = 'Leggett Street'
   AND year = 2021
   AND month = 7
   AND day = 28;
-- | id  | account_number | year | month | day |  atm_location  | transaction_type | amount |
-- +-----+----------------+------+-------+-----+----------------+------------------+--------+
-- | 246 | 28500762       | 2021 | 7     | 28  | Leggett Street | withdraw         | 48     |
-- | 264 | 28296815       | 2021 | 7     | 28  | Leggett Street | withdraw         | 20     |
-- | 266 | 76054385       | 2021 | 7     | 28  | Leggett Street | withdraw         | 60     |
| 267 | 49610011       | 2021 | 7     | 28  | Leggett Street | withdraw         | 50     |
-- | 269 | 16153065       | 2021 | 7     | 28  | Leggett Street | withdraw         | 80     |
-- | 275 | 86363979       | 2021 | 7     | 28  | Leggett Street | deposit          | 10     |
-- | 288 | 25506511       | 2021 | 7     | 28  | Leggett Street | withdraw         | 20     |
-- | 313 | 81061156       | 2021 | 7     | 28  | Leggett Street | withdraw         | 30     |
-- | 336 | 26013199       | 2021 | 7     | 28  | Leggett Street | withdraw         | 35     |

-- Find all relevant phone numbers
SELECT *
  FROM phone_calls
 WHERE year = 2021
   AND month = 7
   AND day = 28
   AND duration < 60;

--   +-----+----------------+----------------+------+-------+-----+----------+
-- | id  |     caller     |    receiver    | year | month | day | duration |
-- +-----+----------------+----------------+------+-------+-----+----------+
-- | 221 | (130) 555-0289 | (996) 555-8899 | 2021 | 7     | 28  | 51       |
-- | 224 | (499) 555-9472 | (892) 555-8872 | 2021 | 7     | 28  | 36       |
| 233 | (367) 555-5533 | (375) 555-8161 | 2021 | 7     | 28  | 45       |
-- | 251 | (499) 555-9472 | (717) 555-1342 | 2021 | 7     | 28  | 50       |
-- | 254 | (286) 555-6063 | (676) 555-6554 | 2021 | 7     | 28  | 43       |
| 255 | (770) 555-1861 | (725) 555-3243 | 2021 | 7     | 28  | 49       |
-- | 261 | (031) 555-6622 | (910) 555-3251 | 2021 | 7     | 28  | 38       |
-- | 279 | (826) 555-1652 | (066) 555-9701 | 2021 | 7     | 28  | 55       |
-- | 281 | (338) 555-6650 | (704) 555-2131 | 2021 | 7     | 28  | 54       | DID CALL AND WITHDRAW CASH BUT CAR DID NOT EXIT PARKING LOT
-- +-----+----------------+----------------+------+-------+-----+----------+

-- Search for matching bank accounts
SELECT *
  FROM people
       JOIN bank_accounts
       ON people.id = bank_accounts.person_id
 WHERE account_number = '26013199';
-- +--------+-------+----------------+-----------------+---------------+----------------+-----------+---------------+
-- |   id   | name  |  phone_number  | passport_number | license_plate | account_number | person_id | creation_year |
-- +--------+-------+----------------+-----------------+---------------+----------------+-----------+---------------+
THIEF
| 686048 | Bruce | (367) 555-5533 | 5773159633      | 94KL13X       | 49610011       | 686048    | 2010          |
-- +--------+-------+----------------+-----------------+---------------+----------------+-----------+---------------+
-- | 514354 | Diana | (770) 555-1861 | 3592750733      | 322W7JE       | 26013199       | 514354    | 2012          |
-- +--------+-------+----------------+-----------------+---------------+----------------+-----------+---------------+

-- Find the earliest flight out of Fiftyville on 2021.7.29
-- | id | origin_airport_id | destination_airport_id | year | month | day | hour | minute |
-- | 36 | 8                 | 4                      | 2021 | 7     | 29  | 8    | 20     |

-- Whoever bought it AND received a call from either of 2 suspected numbers is the accomplice.
(375) 555-8161

-- Look for a person with the number
SELECT *
  FROM people
 WHERE phone_number = '(375) 555-8161';

ACCOMPLICE
--  |   id   | name  |  phone_number  | passport_number | license_plate |
-- +--------+-------+----------------+-----------------+---------------+
-- | 864400 | Robin | (375) 555-8161 |                 | 4V16VO0       |

-- Show all airports
SELECT *
  FROM airports;

-- Show all flights on 2021.07.29
SELECT *
  FROM flights
 WHERE origin_airport_id = 8
   AND day = 29
 ORDER BY day, hour, minute;

-- Show all passengers on relevant flights
SELECT *
  FROM passengers
      JOIN flights
      ON passengers.flight_id = flights.id
WHERE flight_id = 36;

-- | flight_id | passport_number | seat | id | origin_airport_id | destination_airport_id | year | month | day | hour | minute |
-- | 36        | 5773159633      | 4A   | 36 | 8                 | 4                      | 2021 | 7     | 29  | 8    | 20     |

-- Find the destiantion airport
SELECT *
  FROM airports;
-- | 4  | LGA          | LaGuardia Airport                       | New York City |