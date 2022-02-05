// Pour vérifier que l'utilisateur a bien un token pour accéder à la page demandée
export default function auth (to, from, next) {
    if (!localStorage.getItem('token')) {
      next({ name: 'Home' });
      return false
    }
    return next()
}