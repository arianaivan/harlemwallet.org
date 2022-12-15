import type { NextApiRequest, NextApiResponse } from 'next'
import { firebase } from './_firebase'

export type RegisterReqBody = {
  name: string
  mailing_address: string
  email: string
}
export type RegisterResp = {
  success: true
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResp>
) {
  const { name, mailing_address, email } = req.body

  const id = new Date().toISOString() + ' ' + String(Math.random()).slice(2, 7)

  firebase
    .firestore()
    .collection('registrations')
    .doc(id)
    .set({ id, name, mailing_address, email })

  res.status(200).json({ success: true })
}
