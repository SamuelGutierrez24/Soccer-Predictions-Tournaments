import Cookies from "js-cookie";

export function getAuthorizationHeader(){
    const currentUser = Cookies.get("currentUser");
    if (!currentUser) {
        console.warn('No currentUser cookie found');
        return {};
    }
    const parsed = JSON.parse(currentUser);
    const companyId = parsed.company;
    return {
        Authorization: `Bearer ${parsed.accessToken}`
    };
}