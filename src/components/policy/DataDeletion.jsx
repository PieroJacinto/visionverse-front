import React from 'react';
import './DataDeletion.css';

const DataDeletion = () => {
  return (
    <div className="page-container">
     
      
      <div className="policy-container">
        <div className="policy-card">
          <h1 className="policy-title">
            Instrucciones para Eliminación de Datos
          </h1>
          
          <div className="policy-content">
            <section className="policy-section">
              <h2>¿Cómo solicitar la eliminación de sus datos?</h2>
              <p>En VisionVerse, respetamos su privacidad y le proporcionamos un control total sobre sus datos personales. Para solicitar la eliminación de sus datos, puede seguir cualquiera de estos métodos:</p>
              
              <h3>Método 1: Desde su cuenta</h3>
              <ol>
                <li>Inicie sesión en su cuenta de VisionVerse</li>
                <li>Vaya a Configuración de la cuenta</li>
                <li>Seleccione la opción "Eliminar cuenta y datos"</li>
                <li>Confirme la eliminación</li>
              </ol>
              
              <h3>Método 2: Por correo electrónico</h3>
              <p>Envíe un correo electrónico a <strong>privacy@visionverse.com</strong> con el asunto "Solicitud de eliminación de datos" incluyendo:</p>
              <ul>
                <li>Su nombre completo</li>
                <li>Correo electrónico asociado a su cuenta</li>
                <li>Motivo de la eliminación (opcional)</li>
              </ul>
            </section>
            
            <section className="policy-section">
              <h2>Información importante</h2>
              <ul>
                <li>El proceso de eliminación puede tardar hasta 30 días</li>
                <li>Una vez eliminados, los datos no podrán ser recuperados</li>
                <li>Se eliminarán todos los datos asociados a su cuenta</li>
              </ul>
            </section>
            
            <section className="contact-section">
              <h3>¿Necesita ayuda?</h3>
              <p>Si tiene alguna pregunta o necesita asistencia, contáctenos en:</p>
              <p>Email: support@visionverse.com</p>
              <p>Horario de atención: Lunes a Viernes, 9:00 - 18:00 (GMT-5)</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDeletion;