import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node"; // or cloudflare/deno

import styles from "../../styles/articles.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

type Article = {
  slug: string;
  title: string;
};

async function getArticles(): Promise<Article[]> {
  const request = new Request(
    `https://api.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}/entries?&metadata.tags.sys.id[all]=blog&sys.contentType.sys.id=article`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_MANAGEMENT_API_TOKEN}`,
      },
    }
  )
  const res = await fetch(request)
  const articles = await res.json()
  console.log({articles})

  return articles.items.slice(0,5).map ((article) => ({
    slug: article.fields.slug['en-US'],
    title: article.fields.articleName['en-US'],
  }))
}

export const loader = async () => {
  return json({
    articles: await getArticles(),
  });
};

const ArticleCard = ({article}) => (
  <div 
    key={article.slug}
    className="article-card"
  >
    <Link to={`/articles/${article.slug}`}>
      {article.title}
    </Link>
  </div> 
)

export default function Articles() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>
        Articles fetched from Contentful on server side!
      </h1>
      <div>
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            article={article}
          />
        ))}
      </div>
    </main>
  )
}