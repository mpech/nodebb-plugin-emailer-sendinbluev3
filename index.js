const meta = require.main.require('./src/meta')
const https = require('https')
const defaultOptions = {
  hostname: 'api.sendinblue.com',
  path: '/v3/smtp/email',
  method: 'POST'
}

const sendmail = async data => {
  const apiKey = meta.config['email:smtpTransport:pass']
  const sender = meta.config['email:smtpTransport:user']
  return new Promise((resolve, reject) => {
    try {
      const postData = {
        sender: {
          name: data.from_name,
          email: data.from
        },
        to: [{
          email: data.to,
        }],
        subject: data.subject,
        htmlContent: data.html
      }

      const options = Object.assign({}, defaultOptions, {
        headers: {
          'accept': 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json'
        }
      })

      const req = https.request(options, res => {
        let buf = ''
        res.on('data', d => buf += d)
        res.on('error', e => { throw e })
        res.on('end', () => {
          if (res.complete) {
            const parsed = JSON.parse(buf)
            if (!parsed.messageId) {
              throw new Error(parsed.code || parsed)
            }
            return resolve()
          }
          throw new Error('The connection was terminated while the message was still being sent')
        })
      })

      req.write(JSON.stringify(postData))
      req.end()
    } catch (e) {
      console.log('rejecting', e)
      reject(e)
    }
  })
}

module.exports.sendmail = sendmail
