import React, { useState } from 'react';

export default function EstadosYMezclas() {
  const [temperature, setTemperature] = useState(25);
  const [feedback, setFeedback] = useState({});

  // Determinar estado de la materia según la temperatura
  const getPhysicalState = (temp) => {
    if (temp <= 0) {
      return { 
        state: 'Sólido (Hielo)', 
        color: '#0284c7', 
        bg: '#e0f2fe',
        desc: 'Las partículas están fuertemente unidas en una estructura fija y solo vibran.',
        speed: 'vibration' 
      };
    }
    if (temp < 100) {
      return { 
        state: 'Líquido (Agua)', 
        color: '#0d9488', 
        bg: '#ccfbf1',
        desc: 'Las partículas están cercanas pero pueden deslizarse unas sobre otras.',
        speed: 'flowing' 
      };
    }
    return { 
      state: 'Gaseoso (Vapor de Agua)', 
      color: '#e11d48', 
      bg: '#ffe4e6',
      desc: 'Las partículas están muy alejadas y se mueven libremente a gran velocidad.',
      speed: 'fast' 
    };
  };

  const currentState = getPhysicalState(temperature);

  // Cuestionario de clasificación
  const mixtureQuestions = [
    { 
      id: 1, 
      name: 'Agua con Sal totalmente disuelta', 
      correct: 'homogenea', 
      explanation: 'Es una mezcla homogénea porque forma una sola fase visual y uniforme.',
      options: [
        { id: 'pura', label: 'Sustancia Pura' }, 
        { id: 'homogenea', label: 'Mezcla Homogénea' }, 
        { id: 'heterogenea', label: 'Mezcla Heterogénea' }
      ] 
    },
    { 
      id: 2, 
      name: 'Agua y Aceite', 
      correct: 'heterogenea', 
      explanation: 'Es una mezcla heterogénea porque se aprecian claramente dos fases inmiscibles.',
      options: [
        { id: 'pura', label: 'Sustancia Pura' }, 
        { id: 'homogenea', label: 'Mezcla Homogénea' }, 
        { id: 'heterogenea', label: 'Mezcla Heterogénea' }
      ] 
    },
    { 
      id: 3, 
      name: 'Oro Puro de 24 Quilates (Au)', 
      correct: 'pura', 
      explanation: 'Es una sustancia pura (elemento químico) compuesta únicamente por átomos de oro.',
      options: [
        { id: 'pura', label: 'Sustancia Pura' }, 
        { id: 'homogenea', label: 'Mezcla Homogénea' }, 
        { id: 'heterogenea', label: 'Mezcla Heterogénea' }
      ] 
    },
    { 
      id: 4, 
      name: 'Ensalada de Frutas', 
      correct: 'heterogenea', 
      explanation: 'Es una mezcla heterogénea ya que sus componentes se distinguen a simple vista.',
      options: [
        { id: 'pura', label: 'Sustancia Pura' }, 
        { id: 'homogenea', label: 'Mezcla Homogénea' }, 
        { id: 'heterogenea', label: 'Mezcla Heterogénea' }
      ] 
    }
  ];

  const handleAnswer = (questionId, selectedOption, correctOption, explanation) => {
    const isCorrect = selectedOption === correctOption;
    setFeedback({ 
      ...feedback, 
      [questionId]: { 
        isCorrect, 
        msg: isCorrect ? '¡Correcto! 🎉 ' + explanation : 'Incorrecto ❌ ' + explanation 
      } 
    });
  };

  // Posiciones estáticas o dinámicas simuladas para las moléculas según estado
  const renderParticles = () => {
    const particles = Array.from({ length: 16 });
    
    return particles.map((_, index) => {
      let style = {
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        backgroundColor: currentState.color,
        display: 'inline-block',
        transition: 'all 0.5s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      };

      if (temperature <= 0) {
        // Sólido: Estructura compacta ordenada en cuadrícula con pequeña vibración
        style.transform = `translate(${(index % 4) * 24 - 36}px, ${Math.floor(index / 4) * 24 - 36}px)`;
      } else if (temperature < 100) {
        // Líquido: Desordenadas en la parte inferior del recipiente
        const randomX = (index % 4) * 28 - 42 + (index % 2 === 0 ? 5 : -5);
        const randomY = Math.floor(index / 4) * 18 + 10;
        style.transform = `translate(${randomX}px, ${randomY}px)`;
      } else {
        // Gas: Dispersas por todo el recipiente
        const posX = ((index * 37) % 180) - 90;
        const posY = ((index * 53) % 110) - 55;
        style.transform = `translate(${posX}px, ${posY}px)`;
      }

      return <div key={index} style={style} />;
    });
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* SECCIÓN 1: SIMULADOR DE CAMBIOS DE ESTADO */}
      <div style={{ 
        background: '#ffffff', 
        borderRadius: '16px', 
        padding: '24px', 
        marginBottom: '32px', 
        border: `2px solid ${currentState.color}`,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ color: currentState.color, marginTop: 0, marginBottom: '16px' }}>
          🧊 1. Simulador Interactivo de Estados de la Materia
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'center' }}>
          
          {/* Controles */}
          <div>
            <label style={{ fontSize: '15px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
              Temperatura del agua: <span style={{ color: currentState.color, fontSize: '18px' }}>{temperature} °C</span>
            </label>
            
            <input 
              type="range" 
              min="-30" 
              max="140" 
              value={temperature} 
              onChange={(e) => setTemperature(Number(e.target.value))} 
              style={{ width: '100%', cursor: 'pointer', accentColor: currentState.color }} 
            />

            {/* Botones de acceso rápido */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <button onClick={() => setTemperature(-15)} style={{ flex: 1, padding: '6px', borderRadius: '8px', border: '1px solid #93c5fd', background: '#eff6ff', cursor: 'pointer', fontSize: '12px' }}>🧊 Hielo (-15°C)</button>
              <button onClick={() => setTemperature(25)} style={{ flex: 1, padding: '6px', borderRadius: '8px', border: '1px solid #99f6e4', background: '#f0fdfa', cursor: 'pointer', fontSize: '12px' }}>💧 Agua (25°C)</button>
              <button onClick={() => setTemperature(115)} style={{ flex: 1, padding: '6px', borderRadius: '8px', border: '1px solid #fca5a5', background: '#fff1f1', cursor: 'pointer', fontSize: '12px' }}>💨 Vapor (115°C)</button>
            </div>

            <div style={{ marginTop: '16px', background: currentState.bg, padding: '12px 16px', borderRadius: '12px' }}>
              <h4 style={{ margin: '0 0 6px 0', color: currentState.color }}>{currentState.state}</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#334155', lineHeight: '1.4' }}>{currentState.desc}</p>
            </div>
          </div>

          {/* Contenedor Visual de Moléculas */}
          <div style={{
            height: '180px',
            background: '#f8fafc',
            border: '3px solid #cbd5e1',
            borderRadius: '16px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <span style={{ position: 'absolute', top: '8px', left: '12px', fontSize: '11px', color: '#94a3b8', fontWeight: 'bold' }}>
              RECIPIENTE MOLECULAR
            </span>
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {renderParticles()}
            </div>
          </div>

        </div>
      </div>

      {/* SECCIÓN 2: CUESTIONARIO INTERACTIVO DE MEZCLAS Y SUSTANCIAS */}
      <div style={{ 
        background: '#ffffff', 
        borderRadius: '16px', 
        padding: '24px', 
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ color: '#a21caf', marginTop: 0, marginBottom: '8px' }}>
          🥣 2. Clasificador de Sustancias y Mezclas
        </h3>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
          Identifica la categoría correcta para cada uno de los siguientes ejemplos:
        </p>

        <div style={{ display: 'grid', gap: '16px' }}>
          {mixtureQuestions.map((q) => (
            <div key={q.id} style={{ 
              background: '#faf5ff', 
              padding: '16px', 
              borderRadius: '12px', 
              border: '1px solid #f3e8ff' 
            }}>
              <strong style={{ color: '#581c87', fontSize: '15px' }}>{q.id}. {q.name}</strong>
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                {q.options.map((opt) => (
                  <button 
                    key={opt.id} 
                    onClick={() => handleAnswer(q.id, opt.id, q.correct, q.explanation)} 
                    style={{ 
                      padding: '8px 14px', 
                      borderRadius: '8px', 
                      border: '1px solid #c084fc', 
                      background: '#ffffff', 
                      color: '#7e22ce', 
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      transition: 'all 0.2s'
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {feedback[q.id] && (
                <div style={{ 
                  marginTop: '10px', 
                  padding: '10px 12px', 
                  borderRadius: '8px', 
                  fontSize: '13px', 
                  lineHeight: '1.4',
                  fontWeight: '500',
                  background: feedback[q.id].isCorrect ? '#f0fdf4' : '#fef2f2',
                  color: feedback[q.id].isCorrect ? '#15803d' : '#b91c1c',
                  border: `1px solid ${feedback[q.id].isCorrect ? '#bbf7d0' : '#fecaca'}`
                }}>
                  {feedback[q.id].msg}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}