import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarEmpresa } from "../../config/api";


const Register = () => {
  const navigate = useNavigate();
  

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
     const response:any = await registrarEmpresa({
        email: form.email,
        password: form.password,
        profile: {
          name: form.name,
          category: "Tecnología",
          location: "Ciudad",
          instagram: "https://instagram.com/empresa_insta",
          facebook: "https://facebook.com/empresa_fb",
          tiktok: "https://tiktok.com/@empresa_tt"
        },
      });

        // Aquí cambiamos response.ok a response.success
    if (response.success) {
      console.log('registro exitoso');
      navigate("/"); // Redirigir a la página principal o a otro lugar
    } else {
      if (response.message === "Validation failed.") {
        const validationErrors = response.data.map((error: any) => {
          return `${error.field}: ${error.message}`;
        });

        // Aquí puedes ajustar el error para mostrarlo como una lista de validación
        setError(validationErrors.join("\n"));  // Se concatenan los errores en un solo string con saltos de línea
      } else {
        setError(response.message || "Error desconocido");  // Para otros errores no relacionados con la validación
      }
    }


      
    } catch (err:any) {
     setError(err.message);
     
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Registro de Empresa</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="name"
          placeholder="Nombre de la empresa"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
};

export default Register;
