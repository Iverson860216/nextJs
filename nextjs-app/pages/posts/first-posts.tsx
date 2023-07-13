import Head from 'next/head';
import Link from 'next/link';
import ImageComponent from './imageComponent';
import Scripts from '../posts/script';
import Layout from '../../components/layout';

export default function FirstPost(){
    return (
        <Layout home={''}>
            <Head>
                <title>First Post</title>
            </Head>
            <h1>First Post</h1>
            <h2>
                <Link href='/'>Let's back home!</Link>
            </h2>
            <h3>
                <ImageComponent />
            </h3>
            <h4>
                <Scripts/>
            </h4>
        </Layout>
    )
}