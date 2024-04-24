# Warming Center Management System API
This custom software solution is designed to enhance the operation of the HRDC’s year-round homeless warming center in Bozeman, Montana. It aims to assist front desk staff in managing incoming and outgoing guests efficiently. This software aims to minimize the learning curve and reduce the operation burden on front desk staff.

---
## Installation

### Local Machine
Ensure you have Node.js installed on your machine. If not, you can download it [here](https://nodejs.org/en/download/).

1. Clone the repository to your local machine.
2. Run `npm install` to install all dependencies.
3. Create a `.env` file in the root directory of the project and add the following environment variables:
    ```
    NODE_ENV=development
    PORT=8000
    MONGODB_URI=mongodb://localhost:27017/warming-center
    JWT_SECRET=change_me
    JWT_EXPIRES_IN=1d
    SESSION_SECRET=change_me
    ```
4. Run `npm run dev` to start the project.

---
## Usage
To use the API, you can use a tool like Postman to make requests to the API. The API has the following endpoints:

#### User Endpoints
| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/users/login` | Login a user |
| GET | `/api/users/details` | Get the details of the logged in user |
| DELETE | `/api/users/delete/:id` | Delete a user |
| GET | `/api/users/all` | Get all users |
| POST | `/api/users/create` | Create a user |
| PUT | `/api/users/update/:id` | Update a user |

#### Guest Endpoints
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/guests/all` | Get all guests |
| GET | `/api/guests/viewProfile/:id` | Get the profile of a guest |
| GET | `api/guests/current` | Get current guests |
| PUT | `/api/guests/update` | Update a guest |
| POST | `/api/guests/new` | Create a new guest |
| GET | `/api/guests/reservations` | Get bunk reservations |

#### Bunk Endpoints
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/bunks/all` | Get all bunks |
| PUT | `/api/bunks/update` | Update a bunk |

#### Lockers Endpoints
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/lockers/all` | Get all lockers |
| PUT | `/api/lockers/update` | Update a locker |
| GET | `/api/lockers/numbers` | Get lockers by their respective numbers |

--- 

## Contributing

This project is open to contributions. If you would like to contribute, please follow the steps below:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/feature-name`).
3. Make the appropriate changes in the files.
4. Add changes to reflect the changes made.
5. Commit your changes (`git commit -am 'Add new feature'`).
6. Push to the branch (`git push origin feature/feature-name`).
7. Create a Pull Request.

---

## License

MIT License (MIT) - see [`LICENSE`](LICENSE) for more details.

---
