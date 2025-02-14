import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener la URL base de la API desde las variables de entorno
  const getApiUrl = () => import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}/api/auth/check-auth`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Auth check response:', data);

        if (data.isAuthenticated && data.user) {
          setUser(data.user);
        } else {
          console.log('No autenticado, redirigiendo a login');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        setError(error.message);
        setTimeout(() => navigate('/login'), 2000);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/auth/logout`, {
        method: 'POST', // Usar POST para evitar caché en navegadores
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = '/login'; // Redirección segura después del logout
      } else {
        throw new Error('Error durante el logout');
      }
    } catch (error) {
      console.error('Error durante el logout:', error);
      setError('Error al cerrar sesión');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">¡Bienvenido!</h1>
        <p className="mb-2"><span className="font-semibold">Email:</span> {user.email}</p>
        {user.displayName && (
          <p className="mb-4"><span className="font-semibold">Nombre:</span> {user.displayName}</p>
        )}
        <button
          onClick={handleLogout}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Welcome;
