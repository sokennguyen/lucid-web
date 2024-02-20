const baseUrl = 'https://lucid-backend.fly.dev/api/dream'

const getAll = async () => {
    const dreams = await fetch(baseUrl)
    return dreams.json()
}
const post = async (newDreamObj:any) => {
    const dream = await fetch(baseUrl, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
        "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(newDreamObj)
    })

    return dream.json()
}

export default 
{
  post,
  getAll
}
