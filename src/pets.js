import { del, get, post, put } from "./api.js";

export async function getAllPets() {
   return await get("/data/pets?sortBy=_createdOn%20desc&distinct=name")
}

export async function getPetById(id) {
    return await get(`/data/pets/${id}`)
}

export async function deletePetById(id) {
    return await del(`/data/pets/${id}`)
}

export async function createPet(data) {
   return await post("/data/pets", data)
}

export async function editPetById(id, data) {
    return await put(`/data/pets/${id}`, data)
}