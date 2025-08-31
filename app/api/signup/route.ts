import { NextResponse } from 'next/server'

export async function POST(req: Request) {
   const data = await req.json()

   if (data.name !== 'cesar') {
      return NextResponse.json({ success: false }), { status: 400 }
   }

   if (data.email !== 'cesar99dev@gmail.com') {
      return NextResponse.json({ success: false }), { status: 400 }
   }

   if (data.password !== '123456') {
      return NextResponse.json({ success: false }), { status: 400 }
   }

   // Simulación de validación / registro
   if (data.email && data.password && data.name) {
      return NextResponse.json({ success: true })
   }

   return NextResponse.json({ success: false }, { status: 400 })
}
