import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from 'mongodb'
import Head from 'next/head'


export default function MeetupDetails(props) {
    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description} />
            </Head>
            <MeetupDetail {...props.meetupData} />
        </>
    )
}

export async function getStaticPaths() {

    const client = await MongoClient.connect('mongodb+srv://Admin:7880345525@cluster0.vwbqw.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    client.close()

    return {
        fallback: 'blocking',
        paths: meetups.map(m => ({ params: { meetupId: m._id.toString() } }))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://Admin:7880345525@cluster0.vwbqw.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) })
    client.close()

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                description: selectedMeetup.description,
                address: selectedMeetup.address,
                image: selectedMeetup.image
            }
        }
    }
}