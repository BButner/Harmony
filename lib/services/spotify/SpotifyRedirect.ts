export const spotifyAuthRedirect = (): void => {
  window.location.href = 'https://accounts.spotify.com/authorize' + 
    '?response_type=code' +
    '&client_id=' + process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID + 
    '&scope=' + encodeURIComponent('playlist-read-private') + 
    '&redirect_uri=' + encodeURIComponent('http://10.0.0.97:3000/spotify')
}