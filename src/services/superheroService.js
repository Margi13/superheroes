const baseUrl = 'http://localhost:3030/data';
//1:30 -> Create
//2:22 -> localStorage
export function getAll() {
    return fetch(`${baseUrl}/superheroes`)
        .then(res => {
            if(res.ok){
                return res.json();
            }else{
                throw new Error('No response:', res.statusText)
            }
        })
        .catch(error=>{
            console.log(error);
        });

}

export function getOne(heroId) {
    console.log(heroId);
    return fetch(`${baseUrl}/superheroes/${heroId}`)
        .then(res => {
            if(res.ok){
                return res.json();
            }else{
                throw new Error('No response:', res.statusText)
            }
        })
        .catch(error=>{
            console.log(error);
        });
}

export function getLatest() {
    return fetch(`${baseUrl}/superheroes`)
        .then(res => {
            if(res.ok){
                return res.json();
            }else{
                throw new Error('No response:', res.statusText)
            }
        })
        .catch(error=>{
            console.log(error);
        });
}

export const create = async(heroData, token) => {
    let response = await fetch(`${baseUrl}/superheroes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(heroData)

    });
    let result = await response.json();
    return result;
}

export const remove = (heroId, token) =>{
    return fetch(`${baseUrl}/superheroes/${heroId}`, {
        method: 'DELETE',
        headers:{
            'X-Authorization': token
        }
    })
    .then(res=>res.json)
}