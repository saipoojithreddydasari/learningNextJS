import gif from "../../public/not-found.gif"

export async function results(url: RequestInfo | URL) {
    const response = await fetch(url);
    const data = await response.json();
    return data.results.map((result: { multimedia: { url: any; }[]; media: { [x: string]: { url: any; }[]; }[]; uri: any; url: any; title: any; }) => {
        let img = null
        if (!!result.multimedia) {
            img = result.multimedia[0].url
        } else {
            img = result.media[0] ? result.media[0]["media-metadata"][0].url : gif
        }
        return {
            uri: result.uri,
            url: result.url,
            title: result.title,
            img
        }
    })
}

export async function handler(url: RequestInfo | URL) {
    const response = await fetch(url);
    const data = await response.json();
    return data.results
}

export async function search(url: RequestInfo | URL) {
    const response = await fetch(url);
    const data = await response.json();
    const docs = data.response.docs ?? [];
    const results = docs.map((doc: { headline: { main: any; }; web_url: any; uri: any; multimedia: { url: string; }[]; }) => {
        return {
            title: doc?.headline?.main,
            url: doc.web_url,
            uri: doc.uri,
            img: "https://static01.nyt.com/"+ doc.multimedia[0].url
        }
    })
    return results
}
