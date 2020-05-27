import fetch from 'isomorphic-unfetch'
import Config from '../../config/default.json'

export default class RegisterService {
  static async registerUser (userName: string, displayName: string, email: string, password: string, password2: string): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      fetch(Config.apiUrl + '/register', {
        method: 'POST',
        body: JSON.stringify({
          userName: userName,
          displayName: displayName,
          email: email,
          password: password,
          password2: password2
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => resolve(response))
        .catch(err => reject(err))
    })

    return promise
  }
}
