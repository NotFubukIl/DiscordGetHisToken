const rs = require("readline-sync")
const fetch = require("node-fetch")
console.clear()
const email = rs.question("\x1B[32mEnter Your EMAIL: \x1B[0m", {
    hideEchoBack: true
})
const password = rs.question("\x1B[34mEnter Your PASSWORD: \x1B[0m", {
    hideEchoBack: true
})
console.clear()
fetch("https://discord.com/api/v9/auth/login", {
    method: "POST",
    body: JSON.stringify({
        email: email,
        password: password
    }),
    headers: {
        "content-type": "application/json"
    }
}).then(res => res.json()).then(r => {
    if (r.code == 50035) console.error("\x1B[91mEmail Or Password INVALID\x1B[0m")
    else if (r.captcha_key[0] == "captcha-required") console.error("\x1B[91mUnfortunately I Can't Give You Your Token Because There Is A Captcha To Do.\x1B[0m")
    else if (r.ticket) mfa()
    else console.log(`\x1B[34There Is Your Token: ${r.token}\x1B[0m`)
    function mfa() {
        console.clear()
        var code = rs.question("\x1B[32mInput Your MFA Code: \x1B[0m")
        fetch("https://discord.com/api/v9/auth/mfa/totp", {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                code: code,
                ticket: r.ticket
            })
        }).then(resp => resp.json()).then(rs => {
            if (rs.message) console.log("\x1B[91mMFA CODE INVALID\x1B[0m"), mfa()
            else console.log(`\x1B[34There Is Your Token: ${r.token}\x1B[0m`)
        })
    }
})

