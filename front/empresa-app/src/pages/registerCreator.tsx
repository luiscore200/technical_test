import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarCreador } from "../../config/api";


const RegisterCreator = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      location,
      instagram,
      facebook,
      tiktok,
      categories,
    };

    const response = await registrarCreador(data);

    if (response.success) {
      navigate("/");  // O redirigir a alguna página de éxito
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <main className="flex w-full max-w-md flex-col items-center justify-center space-y-6 rounded-lg border bg-white p-6 text-center shadow-lg">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-gray-900">Registrar Creador</h1>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ubicación"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="Instagram"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            placeholder="Facebook"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={tiktok}
            onChange={(e) => setTiktok(e.target.value)}
            placeholder="TikTok"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={categories.join(", ")}
            onChange={(e) => setCategories(e.target.value.split(",").map((item) => item.trim()))}
            placeholder="Categorías (separadas por coma)"
            className="p-2 border border-gray-300 rounded"
            
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Registrar Creador
          </button>
        </form>
      </main>
    </div>
  );
};

export default RegisterCreator;
