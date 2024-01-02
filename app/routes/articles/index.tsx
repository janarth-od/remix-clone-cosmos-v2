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
  return [
    {
      slug: "my-first-post",
      title: "My First Post",
    },
    {
      slug: "90s-mixtape",
      title: "A Mixtape I Made Just For You",
    },
  ];
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
        Articles will go here!
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