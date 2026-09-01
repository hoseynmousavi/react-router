import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router"
import type {Route} from "./+types/root"
import Footer from "./components/Footer"
import Header from "./components/Header"
import {QueryProvider} from "./components/QueryProvider"
import "./app.css"

export const links: Route.LinksFunction = () => [
    {rel: "icon", href: "/favicon.ico", type: "image/x-icon"},
]

export function meta() {
    return [
        {title: "Stayfinder"},
        {name: "description", content: "Find a stay that feels just right."},
    ]
}

export function Layout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" className="h-full antialiased">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body className="flex min-h-full flex-col">
        {children}
        <ScrollRestoration/>
        <Scripts/>
        </body>
        </html>
    )
}

export default function App() {
    return (
        <>
            <Header/>
            <QueryProvider>
                <main className="flex flex-1 flex-col"><Outlet/></main>
            </QueryProvider>
            <Footer/>
        </>
    )
}

export function ErrorBoundary({error}: Route.ErrorBoundaryProps) {
    let title = "Something went wrong"
    let message = "An unexpected error occurred."

    if (isRouteErrorResponse(error)) {
        title = error.status === 404 ? "Page not found" : "Could not load this page"
        message = error.statusText || message
    } else if (error instanceof Error) {
        message = error.message
    }

    return (
        <div className="grid flex-1 place-items-center bg-slate-50 px-5 py-20 text-center dark:bg-zinc-950">
            <div>
                <h1 className="text-3xl font-bold text-slate-950 dark:text-white">{title}</h1>
                <p className="mt-3 text-slate-600 dark:text-zinc-400">{message}</p>
            </div>
        </div>
    )
}
