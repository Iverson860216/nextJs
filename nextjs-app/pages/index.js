import Head from 'next/head';
import Layout, {siteTitle} from '../components/layout';
// import utilStyles from '../styles/utils.module.css';
// import {getSortedPostsData} from '../lib/posts';
import DataBar from './posts/input';

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <DataBar/>
    </Layout>
  )
}
