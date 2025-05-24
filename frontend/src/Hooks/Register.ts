export async function RegNewUser(inputs: any, typeAuth: string, email?: string, name?: string) {
    try {
        const data = {
            ...inputs,
            userData: {
                ...inputs.userData,
                authentication: typeAuth === 'google' ? '' : inputs.userData.authentication,
                type_authentication: typeAuth,
                email: email || inputs.userData.email
            },
            user_name: name || inputs.user_name
        };

        const res = await fetch('http://localhost:3000/api/reg', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            throw new Error("Something is wrong with the backend " + res.status);
        }

        const dataRes = await res.json();
        if (!dataRes.data) { throw new Error(dataRes.message) }
        // sessionStorage.setItem('user', String(dataRes.data.user_profile_id))
        
        return { message: "ok", data: dataRes.data };
    } catch (error) {
        console.error(error)
        return { message: error.message, data: false };
    }
}
