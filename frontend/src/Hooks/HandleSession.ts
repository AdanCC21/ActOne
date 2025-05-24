import { E_UPD } from "../entities/UPD.entity";
/**
 * Send the sessionStorage string and get the E_UPD object Or Null
 * @param sessionStorage string
 * @returns E_UPD || Null
 */
export function HandleSession(sessionStorage: string) {
    try {
        if(!sessionStorage) throw new Error("session invalid");
        const userJson = JSON.parse(sessionStorage);
        const userUPD = new E_UPD(userJson);
        return userUPD;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export function UpdateSession(upd: any) {
    try {
        sessionStorage.removeItem('user');
        sessionStorage.setItem('user', JSON.stringify(upd));
        const user = sessionStorage.getItem('user');
        return user;
    } catch (e) {
        console.error(e);
        return null;
    }
}