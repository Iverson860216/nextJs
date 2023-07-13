import Head from 'next/head';
import Layout, {siteTitle} from '../components/layout';
// import utilStyles from '../styles/utils.module.css';
// import {getSortedPostsData} from '../lib/posts';
import DataBar from './posts/input';
// import Post from './posts/[userInfo]';

// export async function getStaticProps(){
//   const allPostsData = getSortedPostsData();
//   return {
//     props:{
//       allPostsData,
//     }
//   }
// }

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {/* <section className={utilStyles.headingMd}> */}
        {/* <p>[Hi,I'm Iverson]</p> */}
        {/* <p>
          <a href='https://nextjs.org/learn'>Next.js</a>
        </p> */}
      {/* </section> */}
      {/* <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section> */}
      <DataBar/>
      {/* <Post/> */}
    </Layout>
  )
}
