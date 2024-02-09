import { connect, connection, Connection, ConnectOptions, Mongoose } from 'mongoose';

/**
 * A MongoDB connection class that handles connecting and disconnecting from the database using Mongoose
 */
export default class Database {
    private readonly URI: string;
    private readonly options: ConnectOptions;
    private readonly mongoose: Mongoose;

    constructor() {
        this.URI = process.env.MONGO_URI! || 'mongodb://localhost:27017/dev_db';
        this.mongoose = new Mongoose();
    }

    /**
     * Connect to the database using the URI and options provided in environment variables or defaults
     * @returns {Promise<Connection>} The connection object
     * @throws {Error} If there is an error connecting to the database
     */
    public async connect(): Promise<Connection> {
        try {
            await connect(this.URI, this.options);
            console.log(`Connected to database at: ${this.URI}`);
            return connection;
        } catch (error) {
            console.log(error);
            throw new Error('Error connecting to database');
        }
    }

    /**
     * Disconnect from the database
     * @returns {Promise<void>} A promise that resolves when the database is disconnected
     * @throws {Error} If there is an error disconnecting from the database
     */
    public async disconnect(): Promise<void> {
        try {
            await this.mongoose.disconnect();
        } catch (error) {
            console.log(error);
            throw new Error('Error disconnecting from database');
        }
    }
}