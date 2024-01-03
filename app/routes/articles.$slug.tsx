import { json, LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log('jp was here')
  return json({
    article: {
      slug: params.slug,
    }
  })
}

export default function Article() {
  console.log('jp was here')
  const { article } = useLoaderData<typeof loader>();
  return (
    <main>
      <h1>{`Dynamic params! Our slug is ${article.slug}`}</h1>
    </main>
  )
}