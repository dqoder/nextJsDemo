import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb'

import Head from 'next/head'


export default function HomePage(props) {
    return (
        <>
            <Head>
                <title>React meetups</title>
                <meta name="description" content='react next project' />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    )
}

export async function getStaticProps() {

    const client = await MongoClient.connect('mongodb+srv://Admin:7880345525@cluster0.vwbqw.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();


    return {
        props: {
            meetups: meetups.map(m => ({
                title: m.title,
                address: m.address,
                image: m.image,
                id: m._id.toString()
            })),
        },
        revalidate: 100
    }
}

/* export function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;

    return {
        props: {
            meetups: DUMMY_MEETUPS,
        }
    }
} */