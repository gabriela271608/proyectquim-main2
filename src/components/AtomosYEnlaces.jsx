import React, { useState } from 'react';

export default function AtomosYEnlaces() {
  // Estado para el Constructor Atómico
  const [protons, setProtons] = useState(1);
  const [electrons, setElectrons] = useState(1);

  // Diccionario de elementos (Número Atómico)
  const elementNames = { 
    1: { name: 'Hidrógeno', symbol: 'H', desc: 'Elemento más ligero y abundante del universo.' }, 
    2: { name: 'Helio', symbol: 'He', desc: 'Gas noble inerte, usado en globos.' }, 
    3: { name: 'Litio', symbol: 'Li', desc: 'Metal alcalino blando usado en baterías.' }, 
    4: { name: 'Berilio', symbol: 'Be', desc: 'Metal ligero de alta resistencia.' }, 
    5: { name: 'Boro', symbol: 'B', desc: 'Semimetal usado en cerámicas y vidrios.' }, 
    6: { name: 'Carbono', symbol: 'C', desc: 'Base fundamental de la química orgánica y la vida.' } 
  };

  // Carga eléctrica neta
  const charge = protons - electrons;
  const getChargeText = () => {
    if (charge === 0) return { text: 'Átomo Neutro (Carga 0)', color: '#16a34a', bg: '#f0fdf4' };
    if (charge > 0) return { text: `Catión (+) Carga +${charge}`, color: '#e11d48', bg: '#fff1f2' };
    return { text: `Anión (-) Carga ${charge}`, color: '#0284c7', bg: '#f0f9ff' };
  };

  const chargeInfo = getChargeText();

  // Estado para Predictor de Enlaces
  const [elem1, setElem1] = useState('Na');
  const [elem2, setElem2] = useState('Cl');

  const electronegatividades = {
    Na: { name: 'Sodio (Na)', val: 0.93, type: 'Metal' },
    Cl: { name: 'Cloro (Cl)', val: 3.16, type: 'No Metal' },
    H: { name: 'Hidrógeno (H)', val: 2.20, type: 'No Metal' },
    O: { name: 'Oxígeno (O)', val: 3.44, type: 'No Metal' },
    K: { name: 'Potasio (K)', val: 0.82, type: 'Metal' },
    F: { name: 'Flúor (F)', val: 3.98, type: 'No Metal' }
  };

  // Cálculo del tipo de enlace
  const calculateBond = () => {
    const diff = Math.abs(electronegatividades[elem1].val - electronegatividades[elem2].val).toFixed(2);
    let bondType = '';
    let explanation = '';
    let color = '';

    if (diff >= 1.7) {
      bondType = 'Enlace Iónico';
      explanation = 'Un elemento cede electrones al otro debido a una gran diferencia de electronegatividad.';
      color = '#e11d48';
    } else if (diff >= 0.4) {
      bondType = 'Enlace Covalente Polar';
      explanation = 'Los átomos comparten electrones, pero de forma desigual.';
      color = '#0284c7';
    } else {
      bondType = 'Enlace Covalente No Polar';
      explanation = 'Los átomos comparten los electrones de manera equitativa.';
      color = '#16a34a';
    }

    return { diff, bondType, explanation, color };
  };

  const bondResult = calculateBond();
  const currentElem = elementNames[protons];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* SECCIÓN 1: CONSTRUCTOR ATÓMICO */}
      <div style={{ 
        background: '#ffffff', 
        borderRadius: '16px', 
        padding: '24px', 
        marginBottom: '32px', 
        border: '1px solid #e9d5ff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
      }}>
        <h3 style={{ color: '#7e22ce', marginTop: 0, marginBottom: '8px' }}>
          🔬 1. Constructor Atómico Didáctico
        </h3>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
          Modifica los protones para cambiar de elemento químico y ajusta los electrones para ver la carga eléctrica del átomo.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          
          {/* Controles */}
          <div style={{ background: '#faf5ff', padding: '20px', borderRadius: '12px', border: '1px solid #f3e8ff' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px', color: '#581c87' }}>
                <span>Protones (Z):</span>
                <span>{protons}</span>
              </label>
              <input 
                type="range" 
                min="1" 
                max="6" 
                value={protons} 
                onChange={(e) => setProtons(Number(e.target.value))} 
                style={{ width: '100%', marginTop: '6px', cursor: 'pointer', accentColor: '#7e22ce' }} 
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px', color: '#581c87' }}>
                <span>Electrones:</span>
                <span>{electrons}</span>
              </label>
              <input 
                type="range" 
                min="1" 
                max="6" 
                value={electrons} 
                onChange={(e) => setElectrons(Number(e.target.value))} 
                style={{ width: '100%', marginTop: '6px', cursor: 'pointer', accentColor: '#0284c7' }} 
              />
            </div>

            {/* Estado de Carga */}
            <div style={{ 
              background: chargeInfo.bg, 
              color: chargeInfo.color, 
              padding: '10px 14px', 
              borderRadius: '8px', 
              fontWeight: 'bold', 
              fontSize: '13px',
              textAlign: 'center',
              border: `1px solid ${chargeInfo.color}`
            }}>
              {chargeInfo.text}
            </div>
          </div>

          {/* Resultado del Átomo */}
          <div style={{ 
            background: '#ffffff', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '2px dashed #d8b4fe',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '12px', color: '#9333ea', fontWeight: 'bold' }}>ELEMENTO RESULTANTE</span>
            <h2 style={{ fontSize: '36px', margin: '8px 0', color: '#6b21a8' }}>
              {currentElem.symbol} <span style={{ fontSize: '20px', color: '#475569' }}>({currentElem.name})</span>
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.4' }}>
              {currentElem.desc}
            </p>
          </div>

        </div>
      </div>

      {/* SECCIÓN 2: PREDICTOR DE ENLACES QUÍMICOS */}
      <div style={{ 
        background: '#ffffff', 
        borderRadius: '16px', 
        padding: '24px', 
        border: '1px solid #bbf7d0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
      }}>
        <h3 style={{ color: '#166534', marginTop: 0, marginBottom: '8px' }}>
          🔗 2. Predictor de Enlaces Químicos
        </h3>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
          Selecciona dos elementos para calcular la diferencia de electronegatividad ($\Delta EN$) y determinar su enlace.
        </p>

        {/* Selección de Elementos */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '180px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#166534', marginBottom: '4px' }}>Elemento 1:</label>
            <select 
              value={elem1} 
              onChange={(e) => setElem1(e.target.value)} 
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #86efac', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {Object.keys(electronegatividades).map(k => (
                <option key={k} value={k}>{electronegatividades[k].name} (EN: {electronegatividades[k].val})</option>
              ))}
            </select>
          </div>

          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#166534', marginTop: '16px' }}>+</span>

          <div style={{ flex: 1, minWidth: '180px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#166534', marginBottom: '4px' }}>Elemento 2:</label>
            <select 
              value={elem2} 
              onChange={(e) => setElem2(e.target.value)} 
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #86efac', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {Object.keys(electronegatividades).map(k => (
                <option key={k} value={k}>{electronegatividades[k].name} (EN: {electronegatividades[k].val})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Resultado del Enlace */}
        <div style={{ 
          padding: '16px 20px', 
          background: '#f0fdf4', 
          borderRadius: '12px', 
          borderLeft: `6px solid ${bondResult.color}`,
          borderTop: '1px solid #dcfce7',
          borderRight: '1px solid #dcfce7',
          borderBottom: '1px solid #dcfce7'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <h4 style={{ margin: 0, color: bondResult.color, fontSize: '18px' }}>
              {bondResult.bondType}
            </h4>
            <span style={{ background: '#ffffff', padding: '4px 10px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', color: '#334155', border: '1px solid #cbd5e1' }}>
              Diferencia EN = {bondResult.diff}
            </span>
          </div>
          <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#334155', lineHeight: '1.4' }}>
            {bondResult.explanation}
          </p>
        </div>

      </div>

    </div>
  );
}