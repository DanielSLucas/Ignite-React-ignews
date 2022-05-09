import { NextApiRequest, NextApiResponse } from "next";

// https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local

export default async function webhooks (req: NextApiRequest, res: NextApiResponse) {
  console.log('Evento Recebido');

  res.status(200).json({ ok: true });
}