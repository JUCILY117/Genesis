// pages/api/get-prices.ts
import Stripe from 'stripe'
import type { NextApiRequest, NextApiResponse } from 'next'

const stripe = new Stripe(process.env.STRIPE_SECRET!, { apiVersion: '2023-10-16' })

// Sample product array (use your actual product array structure)
const products = [
  { id: 'product_1', stripeProductId: 'prod_ABC123', nickname: 'Free' },
  { id: 'product_2', stripeProductId: 'prod_DEF456', nickname: 'Pro' },
  { id: 'product_3', stripeProductId: 'prod_GHI789', nickname: 'Unlimited' },
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch prices from Stripe and expand product data
    const prices = await stripe.prices.list({
      active: true, // Only active prices
      expand: ['data.product'], // Expand the associated product for each price
    })

    // Map prices to the correct products
    const productsWithPrices = products.map((product) => {
      // Find the corresponding price for the product using product.stripeProductId
      const matchedPrice = prices.data.find(
        (price) => price.product.id === product.stripeProductId
      )

      // If no price found, set to null, else map the price object
      const price = matchedPrice
        ? {
            id: matchedPrice.id,
            amount: matchedPrice.unit_amount ? matchedPrice.unit_amount / 100 : 0, // Convert cents to dollars
            currency: matchedPrice.currency || 'usd', // Default to USD if not found
          }
        : null // If no matching price, set as null

      // Return product with the attached price data
      return {
        ...product,
        price,
      }
    })

    // Send back the products with their associated price data
    res.status(200).json(productsWithPrices)
  } catch (error) {
    console.error('Error fetching prices from Stripe:', error)
    res.status(500).json({ error: 'Failed to fetch prices' })
  }
}
