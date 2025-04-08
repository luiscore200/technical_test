
import { useNavigate } from "react-router-dom"
import { Icon } from "@iconify/react"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <main className="flex w-full max-w-md flex-col items-center justify-center space-y-6 rounded-lg border bg-white p-6 text-center shadow-lg">
        <div className="flex items-center space-x-2">
          <Icon icon="mdi:camera" className="h-6 w-6 text-gray-800" />
          <h1 className="text-2xl font-bold text-gray-900">CreatoConnect</h1>
        </div>

        <p className="text-lg text-gray-600">Conecta empresas con creadores</p>

        <div className="flex w-full flex-col space-y-3 pt-4">
          <button
            onClick={() => navigate("/registerCompany")}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Registrarse como empresa
          </button>

          <button
            onClick={() => navigate("/registerCreator")}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Registrarse como creador
          </button>

          <button
            onClick={() => navigate("/solicitud")}
            className="w-full border border-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Hacer una solicitud
          </button>
        </div>
      </main>
    </div>
  )
}
