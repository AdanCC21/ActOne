export async function logInBack(email: string, type_authentication: string, authentication: string) {
    //cokies:
    const data = {
        "email": email,
        "type_authentication": type_authentication,
        "authentication": authentication
    }
    try {
        const res = await fetch(`http://localhost:3000/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            throw new Error("Something is wrong with the backend " + res.status);
        }
        const dataRes = await res.json();

        if (dataRes.status !== 200) {
            throw Error(dataRes.message)
        }
        return dataRes.data;

    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}