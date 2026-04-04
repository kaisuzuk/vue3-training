import CryptoJS from "crypto-js"

function generateSignature(token: string, t: EpochTimeStamp, nonce: string) {
  const secret = import.meta.env.VITE_SWITCHBOT_SECRET
  return CryptoJS.HmacSHA256(`${token}${t}${nonce}`, secret)
}

export async function switchBotFetch(url: string) {
  const t: EpochTimeStamp = Date.now()
  const nonce = crypto.randomUUID()
  const token = import.meta.env.VITE_SWITCHBOT_TOKEN
  const signeture = generateSignature(token, t, nonce)

  return await fetch(url, {
    headers: {
      "Authorization": token,
      "sign": signeture.toString(),
      "t": t.toString(),
      "nonce": nonce,
      "Content-Type": "application/json"
    },
  })
}