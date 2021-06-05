const requireAll = function(requireContext: any) {
  return requireContext.keys().map(requireContext)
}
const req = require.context('./svg', false, /\.svg$/)

requireAll(req)

export default req
