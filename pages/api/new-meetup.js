// mongoDB (email: @outlook.com - rishOneToFour)
// this app's cred vvvv
// [cred] Admin : 7880......

import { MongoClient } from 'mongodb'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const { title, image, description, address } = data;
        const client = await MongoClient.connect('mongodb+srv://Admin:7880345525@cluster0.vwbqw.mongodb.net/meetups?retryWrites=true&w=majority')

        const db = client.db();

        const meetupsCollection = db.collection('meetups')

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({ message: 'Meetup inserted!' })
    }

}