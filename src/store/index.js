export const actions = {
  nuxtServerInit({commit}, {req, redirect}) {
    console.log(req)
    console.log(req.query)
    if (req && req.query && req.query.path) {
      redirect(req.query.path)
    }
  }
}
