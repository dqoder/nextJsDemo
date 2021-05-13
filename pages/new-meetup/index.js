import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function NewMeetupPage() {
    const router = useRouter();
    async function addMeetupHandler(enteredData) {
        const res = await fetch('/api/new-meetup', {
            method: "POST", body: JSON.stringify(enteredData), headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json();
        console.log(data)
        router.push('/')
    }

    return (
        <>
            <Head>
                <title>New meetup</title>
                <meta name='description' content='create new meetup' />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    )
}