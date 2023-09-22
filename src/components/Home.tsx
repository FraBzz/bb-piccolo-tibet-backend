import { Button } from "@material-tailwind/react";


export const Home = () => {
    const consentCookie ="{stamp:%27d+YwkYRUYKvgsSmvGHwXJYxsPn1qDsqzHdc7yQKKMCxDsy5fnlLlSA==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cmethod:%27explicit%27%2Cver:1%2Cutc:1681910768956%2Cregion:%27it%27}";
    
    // Verifica se il cookie è presente e non è vuoto
if (consentCookie) {
    // Trova la posizione di "marketing" all'interno del cookie
    const marketingIndex = consentCookie.indexOf("marketing");
    
    // Se "marketing" è presente all'interno del cookie
    if (marketingIndex !== -1) {
        // Estrai il valore di "marketing" dalla stringa
        const startIndex = consentCookie.indexOf(":", marketingIndex) + 1;
        const endIndex = consentCookie.indexOf(",", startIndex);
        const marketingValue = consentCookie.slice(startIndex, endIndex).trim();
        
        // Verifica se il valore di "marketing" è true
        if (marketingValue === "true") {
            console.log("Marketing è consentito.");
        } else {
            console.log("Marketing non è consentito.");
        }
    } else {
        console.log("Il campo 'marketing' non è presente nel cookie.");
    }
} else {
    console.log("Il cookie CookieConsent non è presente.");
}
    
    return <Button>Home</Button>;
}