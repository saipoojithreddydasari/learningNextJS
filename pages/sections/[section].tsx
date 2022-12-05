import Head from 'next/head'
import Layout from "../../components/Layout"
import List from "../../components/List"
import { results, handler } from "../api";

function Posts(props) {
    // Render post...
    return (
        <Layout>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <List {...props}/>
        </Layout>);
}
// to register for a new New York Times API KEY, visit :
const API_KEY = "9hUvOqGGdnCBvGKg4EB3L7mGdBC8hKKJ"

// This function gets called at build time
export async function getStaticPaths() {
    // Get the paths we want to pre-render based on posts
    const results = await handler(`https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${API_KEY}`)
    return {
        paths: results.map((result: { section: any; }) => {
            return { params : { section : result.section }}
        }),
        fallback: false
    };
}


// This also gets called at build time
export async function getStaticProps({ params }) {

    // Pass post data to the page via props
    const data = await results(`https://api.nytimes.com/svc/news/v3/content/nyt/${params.section}.json?api-key=${API_KEY}`)
    return {
        props: {
            results: data,
            title:  "Section: " + params.section
        }
    }
}

export default Posts;