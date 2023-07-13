import Axios from 'axios';
import Layout from '../../components/layout';

const Post =({data:result}) =>{
    console.log('Post');
    console.log(result);
    return <Layout>...</Layout>
}

export async function getServerSideProps(context){
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/?q=${context.params.query}`);
    const result = response.json();
    console.log(context);
    console.log(result);
    console.log(response);
    return{
        props:{
            data:result
        }
    }
}

export default Post;