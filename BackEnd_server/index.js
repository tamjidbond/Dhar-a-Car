const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId, ListCollectionsCursor } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase payload size limit

const uri = "mongodb+srv://bondtamjid02:88Zw0UQrYoEu129f@carrentingservers.wx69nbt.mongodb.net/?retryWrites=true&w=majority&appName=CarRentingServers";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");

        const database = client.db("listingDB");
        const listingCollection = database.collection("listingCollection");

        app.get('/listing', async (req, res) => {
            try {
                const availableListing = listingCollection.find();
                const results = await availableListing.toArray();
                res.send(results);
            } catch (error) {
                console.error('Error fetching listings:', error);
                res.status(500).send('Error fetching listings');
            }
        });

        app.post('/listing', async (req, res) => {
            try {
                const listing = req.body;
                const result = await listingCollection.insertOne(listing);
                console.log('New listing added:', result);
                res.sendStatus(200);
            } catch (error) {
                console.error('Error adding listing:', error);
                res.status(500).send('Error adding listing');
            }
        });

        app.patch('/listing/:id', async (req, res) => {
            const id = req.params.id;
            const updatedListing = req.body;
            console.log(updatedListing);
            const query = { _id: new ObjectId(id) };
            const updateOperation = { $set: updatedListing }; 
            try {
                const result = await listingCollection.updateOne(query, updateOperation);
                res.send(result);
            } catch (error) {
                console.error('Error updating listing:', error);
                res.status(500).send('Error updating listing');
            }
        });


        app.delete('/listing/:id', async (req, res) => {
            const id = req.params.id;
            console.log('please delete from database', id);
            const query = { _id: new ObjectId(id) };
            const result = await listingCollection.deleteOne(query);
            res.send(result)

        })

        app.get('/', (req, res) => {
            res.send("Server is Running smoothly!!");
        });

        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

run().catch(console.dir);
