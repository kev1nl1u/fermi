export default defineNuxtRouteMiddleware((to, from) => {
  const toDepth   = to.path.split('/').filter(Boolean).length
  const fromDepth = from.path.split('/').filter(Boolean).length

  const name = toDepth > fromDepth ? 'slide-left'
             : toDepth < fromDepth ? 'slide-right'
             : 'page'

  to.meta.pageTransition = { name, mode: '' }
  from.meta.pageTransition = { name, mode: '' }
})
