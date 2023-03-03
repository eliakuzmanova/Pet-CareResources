import {render} from "../node_modules/lit-html/lit-html.js"
import page from "../node_modules/page/page.mjs"

import { showCatalog } from "./catalog.js"
import { showCreate } from "./create.js"
import { showDetails } from "./details.js"
import { showEdit } from "./edit.js"
import { showHome } from "./home.js"
import { showLogin } from "./login.js"
import { updateNav } from "./nav.js"
import { showRegister } from "./register.js"



const root = document.querySelector("main")

page(middleWare)
page("/", showHome)
page("/catalog", showCatalog)
page("/create", showCreate)
page("/details/:id", showDetails)
page("/edit/:id", showEdit)
page("/register", showRegister)
page("/login", showLogin)

updateNav()
page.start()



function middleWare(ctx, next) {

    ctx.render = (content) => render(content, root)
    ctx.updateNav = updateNav
    next()
}

