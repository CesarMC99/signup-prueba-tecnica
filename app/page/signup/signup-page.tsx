'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
   const router = useRouter()
   const [form, setForm] = useState({ name: '', email: '', password: '' })
   const [errors, setErrors] = useState<{ [key: string]: string }>({})

   const validate = () => {
      const newErrors: { [key: string]: string } = {}

      if (!form.name) newErrors.name = 'El nombre es obligatorio'
      if (!form.email) {
         newErrors.email = 'El email es obligatorio'
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
         newErrors.email = 'Email inválido'
      }
      if (!form.password) {
         newErrors.password = 'La contraseña es obligatoria'
      } else if (form.password.length < 6) {
         newErrors.password = 'Mínimo 6 caracteres'
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
   }

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!validate()) return

      try {
         const res = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
         })

         if (res.ok) {
            // Guardar datos en localStorage (mock de sesión)
            localStorage.setItem('signupData', JSON.stringify(form))
            // window.location.href =
            // 'https://landing-page-prueba-tecnica-47yuaxmvw-cesarmcs-projects.vercel.app/'
            router.push('/thank-you')
         } else {
            alert(
               'Datos incorrectos, los datos son\n nombre: cesar \n email: cesar99dev@gmail.com \n contraseña:123456'
            )
         }
      } catch (err) {
         alert('Datos')
      }
   }

   return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800">
         <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
               Iniciar Session
            </h1>
            <form
               onSubmit={handleSubmit}
               className="space-y-4"
            >
               <div>
                  <label className="block text-sm font-medium text-gray-700">
                     Nombre
                  </label>
                  <input
                     type="text"
                     className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                     value={form.name}
                     onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                     }
                  />
                  {errors.name && (
                     <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700">
                     Email
                  </label>
                  <input
                     type="email"
                     className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                     value={form.email}
                     onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                     }
                  />
                  {errors.email && (
                     <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700">
                     Contraseña
                  </label>
                  <input
                     type="password"
                     className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                     value={form.password}
                     onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                     }
                  />
                  {errors.password && (
                     <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
               </div>

               <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
               >
                  Registrarse
               </button>
            </form>
         </div>
      </div>
   )
}
