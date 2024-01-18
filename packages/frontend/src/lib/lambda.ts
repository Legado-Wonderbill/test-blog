export type TBlogEntry = {
    id: string;
    title: string;
    description: string;
}

const url = 'https://42m8f9snj4.execute-api.eu-west-2.amazonaws.com/staging/';
const apiKey = "EDvoFz1vwJQR2NTYA0Cx6qML6zR0iF24kHE48uz2"

export const createBlogEntry = async (blogEntry: TBlogEntry) => {
  const endpoint = `${url}create-blog-entry`
  try {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: blogEntry.id,
            title: blogEntry.title,
            description: blogEntry.description,
        })
    });

    const result = await response.json();
    return result;
} catch (error) {
    console.error(error);
    throw (error as Error).message;
}
}


export const getBlogEntries = async () => {
  const endpoint = `${url}get-blog-entries`
  try {
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json',
        },
    });
    const result = await response.json();
    console.log("result ---------------------------------------------------------- ", result);
    return result.entries as TBlogEntry[];
} catch (error) {
    console.error(error);
    throw (error as Error).message;
}
}
