'use client'

import { useEffect, useState } from 'react'

export default function ThankYouPage() {
   const [data, setData] = useState<{ name: string; email: string } | null>(
      null
   )
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const stored = localStorage.getItem('signupData')
      if (stored) {
         const parsed = JSON.parse(stored)
         setData({ name: parsed.name, email: parsed.email })
      }
      setLoading(false)
   }, [])

   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-200">
            <p className="text-white text-lg">Cargando...</p>
         </div>
      )
   }

   return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-200">
         <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
               ¡Registro exitoso!
            </h1>
            {data ? (
               <div className="space-y-2 text-gray-700">
                  <p>
                     <span className="font-medium">Nombre:</span> {data.name}
                  </p>
                  <p>
                     <span className="font-medium">Email:</span> {data.email}
                  </p>
               </div>
            ) : (
               <p>No se encontraron datos de registro</p>
            )}
         </div>
      </div>
   )
}
