import React from 'react';
import './TermsOfService.css';

const TermsOfService = () => {
  return (
    <div className="page-container">
      
      
      <div className="policy-container">
        <div className="policy-card">
          <h1 className="policy-title">
            Términos de Servicio
          </h1>
          
          <div className="update-date">
            Última actualización: 15 de febrero, 2025
          </div>
          
          <div className="policy-content">
            <section className="policy-section">
              <h2>1. Aceptación de los términos</h2>
              <p>Al acceder y utilizar VisionVerse, usted acepta estar sujeto a estos Términos de Servicio y a nuestra Política de Privacidad. Si no está de acuerdo con alguno de estos términos, no podrá utilizar nuestros servicios.</p>
            </section>
            
            <section className="policy-section">
              <h2>2. Servicios ofrecidos</h2>
              <p>VisionVerse proporciona una plataforma de servicios digitales. Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del servicio en cualquier momento.</p>
            </section>
            
            <section className="policy-section">
              <h2>3. Cuenta de usuario</h2>
              <p>Para utilizar nuestros servicios, debe crear una cuenta. Usted es responsable de mantener la confidencialidad de su cuenta y contraseña. Las cuentas pueden crearse mediante:</p>
              <ul>
                <li>Correo electrónico y contraseña</li>
                <li>Inicio de sesión con Google</li>
                <li>Inicio de sesión con Facebook</li>
              </ul>
            </section>
            
            <section className="policy-section">
              <h2>4. Privacidad y protección de datos</h2>
              <p>Recopilamos y procesamos datos personales de acuerdo con nuestra Política de Privacidad. Al utilizar nuestros servicios, usted acepta nuestras prácticas de procesamiento de datos.</p>
            </section>
            
            <section className="policy-section">
              <h2>5. Uso aceptable</h2>
              <p>Usted se compromete a no:</p>
              <ul>
                <li>Violar leyes o regulaciones aplicables</li>
                <li>Infringir derechos de propiedad intelectual</li>
                <li>Distribuir malware o código malicioso</li>
                <li>Intentar acceso no autorizado a nuestros sistemas</li>
              </ul>
            </section>
            
            <section className="contact-section">
              <h2>Contacto</h2>
              <p>Si tiene preguntas sobre estos términos, contáctenos en:</p>
              <p>Email: legal@visionverse.com</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;