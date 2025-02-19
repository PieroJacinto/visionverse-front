import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./KYCVerification.css";

const KYCVerification = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verificationUrl, setVerificationUrl] = useState(null);
  const [status, setStatus] = useState('initiating'); // 'initiating', 'redirecting', 'polling', 'error'

  useEffect(() => {
    let pollInterval;
    
    const initiateKYC = async () => {
      try {
        setStatus('initiating');
        const apiUrl = import.meta.env.VITE_API_URL;
        
        console.log('Initiating KYC verification:', {
          apiUrl,
          endpoint: `${apiUrl}/api/auth/kyc/initiate`
        });

        const response = await fetch(`${apiUrl}/api/auth/kyc/initiate`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (!response.ok) {
          console.error('KYC initiation failed:', {
            status: response.status,
            data
          });
          throw new Error(data.details || `Error ${response.status}: ${data.error || 'Failed to initiate KYC verification'}`);
        }

        console.log('KYC initiation successful:', {
          verificationUrl: data.verificationUrl ? 'Received' : 'Missing',
          verificationId: data.verificationId
        });

        if (!data.verificationUrl) {
          throw new Error('No verification URL received from server');
        }

        setVerificationUrl(data.verificationUrl);
        setStatus('redirecting');
        startPolling();
      } catch (error) {
        console.error('KYC initiation error:', {
          message: error.message,
          stack: error.stack
        });
        setError(error.message);
        setStatus('error');
      } finally {
        setLoading(false);
      }
    };

    const startPolling = () => {
      setStatus('polling');
      pollInterval = setInterval(async () => {
        try {
          const apiUrl = import.meta.env.VITE_API_URL;
          const response = await fetch(`${apiUrl}/api/auth/kyc/status`, {
            credentials: 'include'
          });
          
          if (!response.ok) {
            console.error('KYC status check failed:', {
              status: response.status
            });
            throw new Error('Failed to check KYC status');
          }
          
          const data = await response.json();
          console.log('KYC status check:', {
            status: data.kycStatus,
            verified: data.kycVerified
          });
          
          if (data.kycVerified) {
            clearInterval(pollInterval);
            navigate('/welcome');
          }
        } catch (error) {
          console.error('Error checking KYC status:', error);
          // No detenemos el polling por errores de status
        }
      }, 5000);
    };

    initiateKYC();

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [navigate]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setStatus('initiating');
    window.location.reload();
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Iniciando verificación KYC...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error">
          <h3>Error en la verificación</h3>
          <p>{error}</p>
          <div className="button-group">
            <button onClick={handleRetry} className="retry-button">
              Reintentar
            </button>
            <button onClick={() => navigate('/login')} className="back-button">
              Volver al login
            </button>
          </div>
        </div>
      );
    }

    if (verificationUrl) {
      window.location.href = verificationUrl;
      return (
        <div className="redirect">
          <p>Redirigiendo a la verificación KYC...</p>
          <p className="redirect-message">
            Si no eres redirigido automáticamente,{' '}
            <a href={verificationUrl} className="manual-redirect">
              haz clic aquí
            </a>
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="kyc-container">
      <div className="kyc-card">
        {renderContent()}
      </div>
    </div>
  );
};

export default KYCVerification;