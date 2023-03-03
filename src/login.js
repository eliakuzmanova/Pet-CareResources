import { html } from "../node_modules/lit-html/lit-html.js";
import { updateNav } from "./nav.js";
import {login} from "./user.js";
import { createSubmitHandler} from "./util.js";


function loginTemplate(onSubmit) {
    return html`
       <section id="loginPage">
            <form @submit = ${onSubmit} class="loginForm">
                <img src="./images/logo.png" alt="logo" />
                <h2>Login</h2>

                <div>
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div>
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Login</button>

                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </form>
        </section>
    `
}

export function showLogin(ctx) {

    ctx.render(loginTemplate(createSubmitHandler(onSubmit)))

    async function onSubmit({email, password}) {
    
        if (!email || !password) {
            alert("All fields are required")
            return
        } 
    
            await login(email, password)
            updateNav()
            ctx.page.redirect("/")
        
        
    }
}
