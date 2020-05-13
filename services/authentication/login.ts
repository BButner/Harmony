import fetch from 'isomorphic-unfetch'
import Config from '../../config/default.json'

export default class LoginService {
  static async loginUser (email: string, password: string): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      fetch(Config.apiUrl + '/login', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
        .then(response => resolve(response))
        .catch(err => reject(err))
    })

    return promise
  }
}
