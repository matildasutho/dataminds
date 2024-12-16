const GET_ARTISTS = `
   query {
       artistCollection (limit: 10) {
           items {
               artistName
               artistBiography { json }
               artworksCollection (limit: 10) {
                   items {
                       sys { id }
                       __typename
                       ... on Artwork {
                           title
                           imagesCollection {
                               items {
                                   url
                                   title
                                   description
                                   contentType
                                   fileName
                                   size
                                   width
                                   height
                               }
                           }
                           artworkDescription { json }
                       }
                   }
               }
              listOrder
           }
       }
   }
`;

const fetchContentfulData = async (query) => {
  const SPACE_ID = "427seept14u5";
  const ACCESS_TOKEN = "Dbt7GtXTZtVX8aU01EXzRC6pKme_MRvqt82G24SgSLI";

  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    }
  );

  const { data, errors } = await response.json();

  if (errors) {
    console.error(errors);
    throw new Error("Failed to fetch data");
  }

  return data;
};

export const fetchData = () => fetchContentfulData(GET_ARTISTS);
