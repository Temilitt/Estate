export const formatPrice = (amount, status) => {
  let price = ''

  if (amount >= 1_000_000_000) {
    price = `₦${(amount / 1_000_000_000).toFixed(1)}B`
  } else if (amount >= 1_000_000) {
    price = `₦${(amount / 1_000_000).toFixed(0)}M`
  } else {
    price = `₦${amount.toLocaleString()}`
  }

  if (status === 'rent')     return price + ' / year'
  if (status === 'shortlet') return price + ' / night'
  return price
}