var Instagram = require('instagram-web-api')
const fs = require('fs')

const getInstagramPost = async () => {
  const client = new Instagram({
    username: 'Ln4246',
    password: 'thitluoc.mamnem',
  })

  let posts = []
  try {
    await client.login()
    // request photos for a specific instagram user
    const instagram = await client.getPhotosByUsername({
      username: '_tessjean_',
    })

    if (instagram['user']['edge_owner_to_timeline_media']['count'] > 0) {
      // if we receive timeline data back
      //  update the posts to be equal
      // to the edges that were returned from the instagram API response
      posts = instagram['user']['edge_owner_to_timeline_media']['edges']
    }
  } catch (err) {
    console.log(
      'Something went wrong while fetching content from Instagram',
      err
    )
  }

  return {
    instagramPosts: posts, // returns either [] or the edges returned from the Instagram API based on the response from the `getPhotosByUsername` API call
  }
}
async function generateJsonFile() {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const { instagramPosts } = await getInstagramPost()

  fs.writeFileSync(
    'public/instagramPosts.json',
    JSON.stringify(instagramPosts.map((item) => item.node))
  )
}
generateJsonFile()
