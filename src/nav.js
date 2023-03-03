import { html, render } from "../node_modules/lit-html/lit-html.js";
import { logout } from "./user.js";
import { getUserData } from "./util.js";
import page from "../node_modules/page/page.mjs"

const header = document.querySelector("header")

export function updateNav() {
    const user = getUserData()
    render(navTemplate(user,onLogout), header)
    

    function onLogout(ev) {
        ev.preventDefault()
        logout();
        updateNav()
       page.redirect("/")
    }
}

function navTemplate(user,onLogout) {
    return html`<nav>
    <section class="logo">
        <img src="./images/logo.png" alt="logo">
    </section>
    <ul>
        <!--Users and Guest-->
        <li><a href="/">Home</a></li>
        <li><a href="/catalog">Dashboard</a></li>
        ${!user
            ? html`<li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>` 
            : html`<li><a href="/create">Create Postcard</a></li>
        <li><a @click = ${onLogout} href="/javascipt:void(0)">Logout</a></li>`}
  
    </ul>
</nav>`
}

