import React, { useState } from 'react';

export default function SimuladorPH() {
  const [ph, setPh] = useState(7.0);

  const obtenerPropiedades = (val) => {
    const num = Number(val);

    if (num <= 2.5) {
      return { 
        tipo: 'ÁCIDO FUERTE', 
        color: '#e11d48', 
        ejemplo: 'Jugo de limón / Ácido de batería (H₂SO₄)' 
      };
    }
    if (num < 7.0) {
      return { 
        tipo: 'ÁCIDO DÉBIL', 
        color: '#f97316', 
        ejemplo: 'Café negro / Vinagre / Lluvia' 
      };
    }
    if (num === 7.0) {
      return { 
        tipo: 'NEUTRO', 
        color: '#10b981', 
        ejemplo: 'Agua pura (a 25 °C)' 
      };
    }
    if (num <= 11.5) {
      return { 
        tipo: 'BASE DÉBIL', 
        color: '#3b82f6', 
        ejemplo: 'Bicarbonato de sodio / Jabón de manos' 
      };
    }
    return { 
      tipo: 'BASE FUERTE', 
      color: '#8b5cf6', 
      ejemplo: 'Amoníaco casero / Soda cáustica (NaOH)' 
    };
  };

  const valorPh = Number(ph);
  const info = obtenerPropiedades(valorPh);
  const poh = (14 - valorPh).toFixed(1);
  const exponente = Math.round(-valorPh);

  return (
    <div style={{
      maxWidth: '420px',
      margin: '15px auto',
      padding: '20px',
      border: '1px solid #e5e7eb',
      borderRadius: '14px',
      backgroundColor: '#ffffff',
      boxShadow: '0 8px 12px -3px rgba(0, 0, 0, 0.08)',
      fontFamily: "'Segoe UI', Roboto, sans-serif"
    }}>
      <h2 style={{ margin: '0 0 14px 0', color: '#1f2937', fontSize: '1.25rem', fontWeight: '700' }}>
        🧪 Simulador de pH y pOH
      </h2>

      {/* Tarjeta dinámica sin "Ej:" */}
      <div style={{
        backgroundColor: info.color,
        borderRadius: '10px',
        padding: '16px 12px',
        color: '#ffffff',
        textAlign: 'center',
        transition: 'background-color 0.3s ease',
        margin: '14px 0'
      }}>
        <div style={{ fontSize: '2.4rem', fontWeight: '800', lineHeight: '1' }}>
          pH {valorPh.toFixed(1)}
        </div>
        <div style={{ fontWeight: '700', fontSize: '0.85rem', letterSpacing: '0.5px', marginTop: '6px' }}>
          {info.tipo}
        </div>
        <div style={{ fontSize: '0.85rem', opacity: 0.95, marginTop: '6px', fontWeight: '500' }}>
          {info.ejemplo}
        </div>
      </div>

      {/* Control deslizante */}
      <div style={{ margin: '18px 0' }}>
        <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>
          Ajusta la escala de pH (0 - 14):
        </label>
        <input 
          type="range" 
          min="0" 
          max="14" 
          step="0.1" 
          value={ph} 
          onChange={(e) => setPh(parseFloat(e.target.value))}
          style={{ width: '100%', cursor: 'pointer', accentColor: info.color }}
        />
      </div>

      {/* Notación científica */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '10px', 
        backgroundColor: '#f8fafc', 
        padding: '12px', 
        borderRadius: '8px', 
        textAlign: 'center',
        border: '1px solid #f1f5f9'
      }}>
        <div>
          <span style={{ color: '#64748b', fontSize: '0.8rem', display: 'block', fontWeight: '600' }}>pOH</span>
          <strong style={{ color: '#0f172a', fontSize: '1rem' }}>{poh}</strong>
        </div>
        <div>
          <span style={{ color: '#64748b', fontSize: '0.8rem', display: 'block', fontWeight: '600' }}>[H<sup>+</sup>]</span>
          <strong style={{ color: '#0f172a', fontSize: '1rem' }}>
            1.0 × 10<sup>{exponente}</sup> M
          </strong>
        </div>
      </div>
    </div>
  );
}