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

        const guestCollection = client.db("test").collection("guests");

        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        await guestCollection.deleteMany({});

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
        await guestCollection.insertMany(guestData);

        console.log("Guest database seeded! :)");

        const bunkCollection = client.db("test").collection("bunks");
        await bunkCollection.deleteMany({});
        let bunkData = [];

        // For Observation
        for(let i = 0; i < 18; i++) {
            const bunk = {
                number: (Math.floor(i / 2) + 1) + String.fromCharCode(96 + (i % 2 === 0 ? 1 : 2)),
                name: null,
                isMen: false,
                isWomen: false,
                isObservation: true
            };
            bunkData.push(bunk);
        }

        // For Women
        for(let i = 0; i < 18; i++) {
            const bunk = {
                number: (Math.floor(i / 2) + 10) + String.fromCharCode(96 + (i % 2 === 0 ? 1 : 2)),
                name: null,
                isMen: false,
                isWomen: true,
                isObservation: false
            };
            bunkData.push(bunk);
        }

        // For Men
        for(let i = 0; i < 76; i++) {
            const bunk = {
                number: (Math.floor(i / 2) + 19) + String.fromCharCode(96 + (i % 2 === 0 ? 1 : 2)),
                name: null,
                isMen: true,
                isWomen: false,
                isObservation: false
            };
            bunkData.push(bunk);
        }

        await bunkCollection.insertMany(bunkData);

        console.log("Bunk database seeded! :)");

        
    } catch (err) {
        console.log(err.stack);
    } finally { 
        await client.close();
    }
}

seedDB();