import Stripe from 'stripe';
import { version } from '../../package.json';

// lib do stripe, mas tbm poderia ser a API
export const stripe = new Stripe(
  process.env.STRIPE_API_KEY,
  {
    apiVersion: "2020-08-27",
    appInfo: {
      name: "Ignews",
      version,
    }
  }
)