import fetch from 'isomorphic-unfetch'
import Config from '../../config/default.json'

export default class RegisterService {
  static async registerUser(userName: string, displayName: string, email: string, password: string, password2: string, avatar?: File): Promise<any> {
    const imageData = await this.getAvatarBase64(avatar)

    const promise = new Promise((resolve, reject) => {
      fetch(Config.apiUrl + '/register', {
        method: 'POST',
        body: JSON.stringify({
          userName: userName,
          displayName: displayName,
          email: email,
          password: password,
          password2: password2,
          avatar: imageData ? imageData : ''
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

  private static async getAvatarBase64(avatar: File) {
    var promise = new Promise((resolve, reject) => {
      if (avatar !== null) {
        const reader = new FileReader()
        reader.readAsDataURL(avatar)
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject(reader.onerror)
      } else {
        resolve(null)
      }
    })

    return promise
  }
}