// require the necessary libraries
const { faker } = require('@faker-js/faker');
const MongoClient = require("mongodb").MongoClient;

async function seedDB() {
    // Connection URL
    const uri = "mongodb+srv://api_user:1Ivc1FP8YB53fO2f@hrdc.ipzzoq8.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("test").collection("guests");

        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        await collection.deleteMany({});

        // make a bunch of time series data
        let guestData = [];

        for (let i = 0; i < 100; i++) {
            let guest = { 
                firstName : faker.person.firstName(),
                lastName : faker.person.lastName(),
                DOB : faker.date.birthdate(),
                isActive : false,
                consecutiveDaysStayed : faker.number.int({ min: 1, max: 30 }),
                latestCheckInDate : faker.date.recent(),
                HMIS : {
                    isValid : faker.datatype.boolean(),
                    enterDate : faker.date.past()
                },
                accommodation : {
                    hasAcc : faker.datatype.boolean(),
                    accDesc : faker.string.sample()
                },
                bunkReservation : {
                    hasRes : faker.datatype.boolean(),
                    resNum : faker.number.int({ min: 1, max: 100 })
                },
                locker : faker.number.int({ min: 1, max: 100 }),
                laundry : faker.datatype.boolean(),
                Bx : {
                    warning : faker.datatype.boolean(),
                    suspension : faker.datatype.boolean(),
                    noTrespass : faker.datatype.boolean(),
                    probation : faker.datatype.boolean(),
                    bxNotes : faker.string.sample()
                }
            }
            guestData.push(guest);
        }
        await collection.insertMany(guestData);

        console.log("Database seeded! :)");
        
    } catch (err) {
        console.log(err.stack);
    } finally { 
        await client.close();
    }
}

seedDB();