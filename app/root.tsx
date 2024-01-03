import {
  Links,
  Meta,
  Outlet,
  Scripts,
  Link,
  LiveReload
, useRouteError } from "@remix-run/react";


export default function App() {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/x-icon;base64,AA"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            padding: "1rem",
            backgroundColor: "#eee",
          }}
        >
          <p>
            <Link to="/articles" >Articles</Link>
          </p>
          <p>Hi Im the Navbar!</p>
          <p>Log in</p>
        </div>
        <Outlet />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html lang="en">
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        {/* add the UI you want your users to see */}
        <h1>Uh oh! Global Error boundary</h1>
        <Scripts />
      </body>
    </html>
  );
}