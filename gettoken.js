const question = require("readline-sync");

const request = require("sync-request")

require('colors')

const email = question.question(`Veuillez Entrer Votre Email: `.yellow)
const password = question.question(`Veuillez Entrer Votre Mot De Passe: `.yellow)


console.clear()

let req = JSON.parse(request("POST", 'https://discord.com/api/v8/auth/login', {
    json: {
        "email": email,
        "password": password
    }
}).body)

function deuxfa0() {
    var deuxfa = question.question((`Veuillez Entrer Le Code De Doubles Vérifications: `.cyan))

    let res = JSON.parse(request("POST", 'https://discord.com/api/v8/auth/mfa/totp', {
        json: {
            "code": deuxfa,
            "ticket": req.ticket
        }
    }).body)
    if (res.message) {
        console.clear()

        console.log(`Le Code A2F est Invalide`.red);
        deuxfa0()

    } else {

        console.clear();

        console.log(`Voici ton token: ${res.token}`.green)
    }
}

if (req.code === 50035) {
    console.clear();
    console.log("Email Ou Mot De Passe Invalide".red)
    
} else if (req.captcha_key) {
    console.clear();
    console.log(("Impossible De Vous Donnez Votre Token".red));
    
} else if (req.ticket) {
    console.clear()
    deuxfa0()

} else {
    console.clear()
    console.log((`Voici ton token: ${req.token}`.green))
}