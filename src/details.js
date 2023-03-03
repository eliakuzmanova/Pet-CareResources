import {html, nothing} from "../node_modules/lit-html/lit-html.js";
import { deletePetById, getPetById } from "./pets.js";
import { createSubmitHandler, getUserData } from "./util.js";

export async function showDetails(ctx) {
    
    const id = ctx.params.id
    const pet = await getPetById(id)
    
    const user = getUserData()
    let isUser = Boolean(user)
    let isOwner = isUser && user._id == pet._ownerId

    ctx.render(detailsTemplate(pet, isUser, isOwner, onDelete, onEdit))

    async function onDelete(ev) {
       const isConfirm = confirm("Are you sure you want to delete")

       if (isConfirm) {
        await deletePetById(id)
        ctx.page.redirect(`/`)
       } else {
        return
       }
        
    }

    async function onEdit(ev) {
        //TODO
        
        ctx.page.redirect(`/edit/${id}`)
    }
}



function detailsTemplate(pet, isUser, isOwner, onDelete, onEdit) {
return html`
 <section id="detailsPage">
<div class="details">
    <div class="animalPic">
        <img src="${pet.image}">
    </div>
    <div>
        <div class="animalInfo">
            <h1>Name: ${pet.name}</h1>
            <h3>Breed: ${pet.breed}</h3>
            <h4>Age: ${pet.age}</h4>
            <h4>Weight: ${pet.weight}</h4>
            <h4 class="donation">Donation: 0$</h4>
        </div>

        <!-- if there is no registered user, do not display div-->
        ${isUser
        ? html`<div class="actionBtn">
            <!-- Only for registered user and creator of the pets-->
            ${isOwner
            ? html` 
                <a @click = ${onEdit} href="/edit/${pet._id}" class="edit">Edit</a>
                <a @click = ${onDelete} href="javascript:void(0)" class="remove">Delete</a>`
            :nothing }
          
            <!--(Bonus Part) Only for no creator and user <a href="#" class="donate">Donate</a>-->
        </div>`
        :nothing}
        
    </div>
</div>
</section>
`
}