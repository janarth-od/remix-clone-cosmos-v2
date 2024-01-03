import { json } from '@remix-run/node';
import type { LinksFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { ContentTypeCollection } from 'contentful';

import styles from '../../styles/articles.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

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
    },
  );
  const res = await fetch(request);
  const articlesCollection: ContentTypeCollection = await res.json();
  console.log({ articlesCollection });

  // ignore ts errors. I didn't copy the article fields type from contentful
  return articlesCollection.items.slice(0, 5).map((article) => ({
    slug: article.fields.slug['en-US'],
    title: article.fields.articleName['en-US'],
  }));
}

// Server-side loader function
// https://remix.run/docs/en/main/route/loader#loader
/*
  This function is only ever run on the server. On the initial server render, it will provide data to the HTML document. 
  On navigations in the browser, Remix will call the function via fetch from the browser.

  This means you can talk directly to your database, use server-only API secrets, etc. Any code that isn't used 
  to render the UI will be removed from the browser bundle.
*/
export const loader = async () => {
  return json({
    articles: await getArticles(),
  });
};

const ArticleCard = ({ article }: {article: Article}) => (
  <div className="article-card">
    <Link to={`${article.slug}`}>{article.title}</Link>
  </div>
);

export default function Articles() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Articles fetched from Contentful on server side!</h1>
      <div>
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </main>
  );
}
