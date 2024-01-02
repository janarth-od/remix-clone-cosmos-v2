import {
  Links,
  Meta,
  Outlet,
  Scripts,
  Link,
  LiveReload
} from "@remix-run/react";

export default function App() {
  return (
    <html>
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
          <p>Hi I'm the Navbar!</p>
          <p>Log in</p>
        </div>
        <Outlet />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}