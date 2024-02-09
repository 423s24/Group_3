# Warming Center Management System (Rest API)
This custom software solution is designed to enhance the operation of the HRDC’s year-round homeless warming center in Bozeman, Montana. It aims to assist front desk staff in managing incoming and outgoing guests efficiently. This software aims to minimize the learning curve and reduce the operation burden on front desk staff.


## Installation

### Local Machine
1. Ensure that Node.js and npm are installed on your machine.
2. Clone the repository.
3. Run `npm run setup` to configure the recommended environment setup.
_Note: You can also view [`.env.sample`](.env.sample) and manually create a `.env` file in the root directory._

## Usage

To start the project, run `npm start` or `npm run dev` to start the project in development mode.

#### Creating the default development user
- Simply submit a GET request to `/api/users/create-dev-user` to create the default development user.

| Development User | |
|----------|----------|
| Username | `dev` |
| Password | `password` |

## Contributing

Information about contributing to the project.

## License

MIT License (MIT) - see [`LICENSE`](LICENSE) for more details.