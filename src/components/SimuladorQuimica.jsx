import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Atom } from 'lucide-react';

// ==========================================
// 1. BASE DE DATOS COMPLETA (118 ELEMENTOS)
// ==========================================

// Configuración de capas electrónicas por período (aproximación visual de capas de Bohr)
const getShells = (z) => {
  const maxPerShell = [2, 8, 18, 32, 32, 18, 8];
  let remaining = z;
  const shells = [];
  for (let max of maxPerShell) {
    if (remaining <= 0) break;
    const count = Math.min(remaining, max);
    shells.push(count);
    remaining -= count;
  }
  return shells;
};

const ELEMENT_DATA = [
  ["H", "Hidrógeno", 1, "nonmetal", "#FFFFFF", "1.008", 2.2],
  ["He", "Helio", 2, "noble", "#D9FFFF", "4.0026", 0],
  ["Li", "Litio", 3, "alkali", "#CC80FF", "6.94", 0.98],
  ["Be", "Berilio", 4, "alkaline", "#C2FF00", "9.0122", 1.57],
  ["B", "Boro", 5, "metalloid", "#FFB5B5", "10.81", 2.04],
  ["C", "Carbono", 6, "nonmetal", "#909090", "12.011", 2.55],
  ["N", "Nitrógeno", 7, "nonmetal", "#3050F8", "14.007", 3.04],
  ["O", "Oxígeno", 8, "nonmetal", "#FF0D0D", "15.999", 3.44],
  ["F", "Flúor", 9, "halogen", "#90E0E0", "18.998", 3.98],
  ["Ne", "Neón", 10, "noble", "#B3E3F5", "20.180", 0],
  ["Na", "Sodio", 11, "alkali", "#AB5CF2", "22.990", 0.93],
  ["Mg", "Magnesio", 12, "alkaline", "#8AFF00", "24.305", 1.31],
  ["Al", "Aluminio", 13, "post-transition", "#FAFAFA", "26.982", 1.61],
  ["Si", "Silicio", 14, "metalloid", "#F0C8A0", "28.085", 1.90],
  ["P", "Fósforo", 15, "nonmetal", "#FF8000", "30.974", 2.19],
  ["S", "Azufre", 16, "nonmetal", "#FFFF30", "32.06", 2.58],
  ["Cl", "Cloro", 17, "halogen", "#1FF01F", "35.45", 3.16],
  ["Ar", "Argón", 18, "noble", "#80D1E3", "39.948", 0],
  ["K", "Potasio", 19, "alkali", "#8F40D4", "39.098", 0.82],
  ["Ca", "Calcio", 20, "alkaline", "#3DFF00", "40.078", 1.00],
  ["Sc", "Escandio", 21, "transition", "#E6E6E6", "44.956", 1.36],
  ["Ti", "Titanio", 22, "transition", "#BFC2C7", "47.867", 1.54],
  ["V", "Vanadio", 23, "transition", "#A6A6AB", "50.942", 1.63],
  ["Cr", "Cromo", 24, "transition", "#8A99C7", "51.996", 1.66],
  ["Mn", "Manganeso", 25, "transition", "#9C7AC7", "54.938", 1.55],
  ["Fe", "Hierro", 26, "transition", "#E06633", "55.845", 1.83],
  ["Co", "Cobalto", 27, "transition", "#F090A0", "58.933", 1.88],
  ["Ni", "Níquel", 28, "transition", "#50D050", "58.693", 1.91],
  ["Cu", "Cobre", 29, "transition", "#C88033", "63.546", 1.90],
  ["Zn", "Zinc", 30, "transition", "#7D80B0", "65.38", 1.65],
  ["Ga", "Galio", 31, "post-transition", "#C28F8F", "69.723", 1.81],
  ["Ge", "Germanio", 32, "metalloid", "#668F8F", "72.630", 2.01],
  ["As", "Arsénico", 33, "metalloid", "#BD80E3", "74.922", 2.18],
  ["Se", "Selenio", 34, "nonmetal", "#FFA100", "78.971", 2.55],
  ["Br", "Bromo", 35, "halogen", "#A62929", "79.904", 2.96],
  ["Kr", "Kriptón", 36, "noble", "#5CB8D1", "83.798", 3.00],
  ["Rb", "Rubidio", 37, "alkali", "#702EB0", "85.468", 0.82],
  ["Sr", "Estroncio", 38, "alkaline", "#00FF00", "87.62", 0.95],
  ["Y", "Itrio", 39, "transition", "#94FFFF", "88.906", 1.22],
  ["Zr", "Circonio", 40, "transition", "#94E6E6", "91.224", 1.33],
  ["Nb", "Niobio", 41, "transition", "#73C2C9", "92.906", 1.60],
  ["Mo", "Molibdeno", 42, "transition", "#54B5B5", "95.95", 2.16],
  ["Tc", "Tecnecio", 43, "transition", "#3B9E9E", "98", 1.90],
  ["Ru", "Rutenio", 44, "transition", "#248D8D", "101.07", 2.20],
  ["Rh", "Rodio", 45, "transition", "#0A7D8C", "102.91", 2.28],
  ["Pd", "Paladio", 46, "transition", "#006985", "106.42", 2.20],
  ["Ag", "Plata", 47, "transition", "#C0C0C0", "107.87", 1.93],
  ["Cd", "Cadmio", 48, "transition", "#FFD98F", "112.41", 1.69],
  ["In", "Indio", 49, "post-transition", "#A67573", "114.82", 1.78],
  ["Sn", "Estaño", 50, "post-transition", "#668080", "118.71", 1.96],
  ["Sb", "Antimonio", 51, "metalloid", "#9E63B5", "121.76", 2.05],
  ["Te", "Telurio", 52, "metalloid", "#D47A00", "127.60", 2.10],
  ["I", "Yodo", 53, "halogen", "#940094", "126.90", 2.66],
  ["Xe", "Xenón", 54, "noble", "#429EB0", "131.29", 2.60],
  ["Cs", "Cesio", 55, "alkali", "#57178F", "132.91", 0.79],
  ["Ba", "Bario", 56, "alkaline", "#00C900", "137.33", 0.89],
  ["La", "Lantano", 57, "lanthanide", "#70D4FF", "138.91", 1.10],
  ["Ce", "Cerio", 58, "lanthanide", "#FFFFC7", "140.12", 1.12],
  ["Pr", "Praseodimio", 59, "lanthanide", "#D9FFC7", "140.91", 1.13],
  ["Nd", "Neodimio", 60, "lanthanide", "#C7FFC7", "144.24", 1.14],
  ["Pm", "Prometio", 61, "lanthanide", "#A3FFC7", "145", 1.13],
  ["Sm", "Samario", 62, "lanthanide", "#8CFFC7", "150.36", 1.17],
  ["Eu", "Europio", 63, "lanthanide", "#61FFC7", "151.96", 1.20],
  ["Gd", "Gadolinio", 64, "lanthanide", "#45FFC7", "157.25", 1.20],
  ["Tb", "Terbio", 65, "lanthanide", "#30FFC7", "158.93", 1.22],
  ["Dy", "Disprosio", 66, "lanthanide", "#1FFFC7", "162.50", 1.23],
  ["Ho", "Holmio", 67, "lanthanide", "#00FF9C", "164.93", 1.24],
  ["Er", "Erbio", 68, "lanthanide", "#00E675", "167.26", 1.24],
  ["Tm", "Tulio", 69, "lanthanide", "#00D452", "168.93", 1.25],
  ["Yb", "Iterbio", 70, "lanthanide", "#00BF38", "173.05", 1.10],
  ["Lu", "Lutecio", 71, "lanthanide", "#00AB24", "174.97", 1.27],
  ["Hf", "Hafnio", 72, "transition", "#4DC2FF", "178.49", 1.30],
  ["Ta", "Tántalo", 73, "transition", "#4DA6FF", "180.95", 1.50],
  ["W", "Wolframio", 74, "transition", "#2194D6", "183.84", 2.36],
  ["Re", "Renio", 75, "transition", "#267DAB", "186.21", 1.90],
  ["Os", "Osmio", 76, "transition", "#266691", "190.23", 2.20],
  ["Ir", "Iridio", 77, "transition", "#175487", "192.22", 2.20],
  ["Pt", "Platino", 78, "transition", "#D0D0E0", "195.08", 2.28],
  ["Au", "Oro", 79, "transition", "#FFD700", "196.97", 2.54],
  ["Hg", "Mercurio", 80, "transition", "#B8B8D0", "200.59", 2.00],
  ["Tl", "Talio", 81, "post-transition", "#A6544D", "204.38", 1.62],
  ["Pb", "Plomo", 82, "post-transition", "#575961", "207.2", 2.33],
  ["Bi", "Bismuto", 83, "post-transition", "#9E4FB5", "208.98", 2.02],
  ["Po", "Polonio", 84, "metalloid", "#AB5C00", "209", 2.00],
  ["At", "Astato", 85, "halogen", "#754747", "210", 2.20],
  ["Rn", "Radón", 86, "noble", "#428296", "222", 2.20],
  ["Fr", "Francio", 87, "alkali", "#420066", "223", 0.70],
  ["Ra", "Radio", 88, "alkaline", "#007D00", "226", 0.90],
  ["Ac", "Actinio", 89, "actinide", "#70ABFA", "227", 1.10],
  ["Th", "Torio", 90, "actinide", "#00BAFF", "232.04", 1.30],
  ["Pa", "Protactinio", 91, "actinide", "#00A1FF", "231.04", 1.50],
  ["U", "Uranio", 92, "actinide", "#008FFF", "238.03", 1.38],
  ["Np", "Neptunio", 93, "actinide", "#0080FF", "237", 1.36],
  ["Pu", "Plutonio", 94, "actinide", "#006BFF", "244", 1.28],
  ["Am", "Americio", 95, "actinide", "#545CF2", "243", 1.13],
  ["Cm", "Curio", 96, "actinide", "#785CF2", "247", 1.28],
  ["Bk", "Berkelio", 97, "actinide", "#8A4FE3", "247", 1.30],
  ["Cf", "Californio", 98, "actinide", "#A136D4", "251", 1.30],
  ["Es", "Einstenio", 99, "actinide", "#B31FD4", "252", 1.30],
  ["Fm", "Fermio", 100, "actinide", "#B31FBA", "257", 1.30],
  ["Md", "Mendelevio", 101, "actinide", "#B30D96", "258", 1.30],
  ["No", "Nobelio", 102, "actinide", "#B0007A", "259", 1.30],
  ["Lr", "Lawrencio", 103, "actinide", "#C80066", "262", 1.30],
  ["Rf", "Rutherfordio", 104, "transition", "#CC0059", "267", 0],
  ["Db", "Dubnio", 105, "transition", "#D1004F", "268", 0],
  ["Sg", "Seaborgio", 106, "transition", "#D90045", "269", 0],
  ["Bh", "Bohrio", 107, "transition", "#E00038", "270", 0],
  ["Hs", "Hassio", 108, "transition", "#E6002E", "277", 0],
  ["Mt", "Meitnerio", 109, "transition", "#EB0024", "278", 0],
  ["Ds", "Darmstadtio", 110, "transition", "#ED001A", "281", 0],
  ["Rg", "Roentgenio", 111, "transition", "#F0000F", "282", 0],
  ["Cn", "Copernicio", 112, "transition", "#F00005", "285", 0],
  ["Nh", "Nihonio", 113, "post-transition", "#A1A1A1", "286", 0],
  ["Fl", "Flerovio", 114, "post-transition", "#A1A1A1", "289", 0],
  ["Mc", "Moscovio", 115, "post-transition", "#A1A1A1", "290", 0],
  ["Lv", "Livermorio", 116, "post-transition", "#A1A1A1", "293", 0],
  ["Ts", "Tenesino", 117, "halogen", "#A1A1A1", "294", 0],
  ["Og", "Oganesón", 118, "noble", "#A1A1A1", "294", 0]
];

const PERIODIC_TABLE = ELEMENT_DATA.map(([symbol, name, z, category, color, mass, en]) => ({
  symbol, name, z, category, color, mass, en, shells: getShells(z)
}));

// Base de datos extensa de reacciones
const KNOWN_MOLECULES = [
  { formula: 'H2O', name: 'Agua', composition: { H: 2, O: 1 }, type: 'Covalente Polar', diffEn: 1.24 },
  { formula: 'CO2', name: 'Dióxido de Carbono', composition: { C: 1, O: 2 }, type: 'Covalente Apolar', diffEn: 0.89 },
  { formula: 'NaCl', name: 'Cloruro de Sodio (Sal)', composition: { Na: 1, Cl: 1 }, type: 'Iónico', diffEn: 2.23 },
  { formula: 'CH4', name: 'Metano', composition: { C: 1, H: 4 }, type: 'Covalente Apolar', diffEn: 0.35 },
  { formula: 'NH3', name: 'Amoníaco', composition: { N: 1, H: 3 }, type: 'Covalente Polar', diffEn: 0.84 },
  { formula: 'HCl', name: 'Ácido Clorhídrico', composition: { H: 1, Cl: 1 }, type: 'Covalente Polar', diffEn: 0.96 },
  { formula: 'LiF', name: 'Fluoruro de Litio', composition: { Li: 1, F: 1 }, type: 'Iónico', diffEn: 3.00 },
  { formula: 'KCl', name: 'Cloruro de Potasio', composition: { K: 1, Cl: 1 }, type: 'Iónico', diffEn: 2.34 },
  { formula: 'SiH4', name: 'Silano', composition: { Si: 1, H: 4 }, type: 'Covalente Apolar', diffEn: 0.30 },
  { formula: 'H2S', name: 'Sulfuro de Hidrógeno', composition: { H: 2, S: 1 }, type: 'Covalente Polar', diffEn: 0.38 },
  { formula: 'O2', name: 'Oxígeno Molecular', composition: { O: 2 }, type: 'Covalente Apolar', diffEn: 0.00 },
  { formula: 'H2', name: 'Hidrógeno Molecular', composition: { H: 2 }, type: 'Covalente Apolar', diffEn: 0.00 },
  { formula: 'HF', name: 'Ácido Fluorhídrico', composition: { H: 1, F: 1 }, type: 'Covalente Polar', diffEn: 1.78 },
  { formula: 'KBr', name: 'Bromuro de Potasio', composition: { K: 1, Br: 1 }, type: 'Iónico', diffEn: 2.14 },
  { formula: 'SO2', name: 'Dióxido de Azufre', composition: { S: 1, O: 2 }, type: 'Covalente Polar', diffEn: 0.86 },
  { formula: 'CaO', name: 'Óxido de Calcio (Cal)', composition: { Ca: 1, O: 1 }, type: 'Iónico', diffEn: 2.44 }
];

const getElement = (symbol) => PERIODIC_TABLE.find((e) => e.symbol === symbol);

// ==========================================
// 2. COMPONENTES 3D
// ==========================================

function Electron({ radius, speed, offset, color = '#00f0ff' }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.07, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
    </mesh>
  );
}

function OrbitRing({ radius, rotation = [Math.PI / 2, 0, 0] }) {
  return (
    <mesh rotation={rotation}>
      <ringGeometry args={[radius - 0.012, radius + 0.012, 64]} />
      <meshBasicMaterial color="#ffffff" opacity={0.15} transparent side={THREE.DoubleSide} />
    </mesh>
  );
}

function Atom3D({ element, position = [0, 0, 0] }) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.2;
  });

  if (!element) return null;

  return (
    <group ref={groupRef} position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh>
          <sphereGeometry args={[0.4 + Math.min(element.z * 0.005, 0.4), 32, 32]} />
          <meshStandardMaterial color={element.color} roughness={0.3} metalness={0.2} />
        </mesh>
      </Float>

      {element.shells.map((count, shellIndex) => {
        const radius = 1.0 + shellIndex * 0.5;
        const tilt = (shellIndex * Math.PI) / 4;
        return (
          <group key={shellIndex} rotation={[tilt, tilt * 0.5, 0]}>
            <OrbitRing radius={radius} />
            {Array.from({ length: count }).map((_, eIndex) => (
              <Electron
                key={eIndex}
                radius={radius}
                speed={1.5 - shellIndex * 0.15}
                offset={(eIndex * Math.PI * 2) / count}
              />
            ))}
          </group>
        );
      })}
    </group>
  );
}

function Bond({ start, end, isIonic = false }) {
  const p1 = new THREE.Vector3(...start);
  const p2 = new THREE.Vector3(...end);
  const distance = p1.distanceTo(p2);
  const midPoint = p1.clone().add(p2).multiplyScalar(0.5);

  const orientation = new THREE.Matrix4();
  orientation.lookAt(p2, p1, new THREE.Object3D().up);
  const rotation = new THREE.Euler().setFromRotationMatrix(orientation);

  return (
    <mesh position={midPoint.toArray()} rotation={rotation}>
      <cylinderGeometry args={[isIonic ? 0.08 : 0.05, isIonic ? 0.08 : 0.05, distance, 16]} />
      <meshStandardMaterial color={isIonic ? '#ff0055' : '#ffffff'} wireframe={isIonic} transparent opacity={0.7} />
    </mesh>
  );
}

function ReactionViewer({ reaction }) {
  const isIonic = reaction.type === 'Iónico';

  if (reaction.formula === 'H2O' || reaction.formula === 'H2S' || reaction.formula === 'SO2') {
    const centerSymbol = reaction.formula === 'H2O' ? 'O' : 'S';
    const otherSymbol = reaction.formula === 'SO2' ? 'O' : 'H';
    return (
      <group>
        <Atom3D element={getElement(centerSymbol)} position={[0, 0, 0]} />
        <Atom3D element={getElement(otherSymbol)} position={[-1.5, -1, 0]} />
        <Atom3D element={getElement(otherSymbol)} position={[1.5, -1, 0]} />
        <Bond start={[0, 0, 0]} end={[-1.5, -1, 0]} />
        <Bond start={[0, 0, 0]} end={[1.5, -1, 0]} />
      </group>
    );
  }

  if (reaction.formula === 'CH4' || reaction.formula === 'SiH4') {
    const centerSymbol = reaction.formula === 'CH4' ? 'C' : 'Si';
    const hPositions = [[1.3, 1.3, 1.3], [-1.3, -1.3, 1.3], [-1.3, 1.3, -1.3], [1.3, -1.3, -1.3]];
    return (
      <group>
        <Atom3D element={getElement(centerSymbol)} position={[0, 0, 0]} />
        {hPositions.map((pos, idx) => (
          <React.Fragment key={idx}>
            <Atom3D element={getElement('H')} position={pos} />
            <Bond start={[0, 0, 0]} end={pos} />
          </React.Fragment>
        ))}
      </group>
    );
  }

  // Renderizado genérico para diatómicas o compuestos binarios simples
  const symbols = [];
  Object.entries(reaction.composition).forEach(([sym, count]) => {
    for (let i = 0; i < count; i++) symbols.push(sym);
  });

  return (
    <group>
      {symbols.map((sym, idx) => {
        const angle = (idx / symbols.length) * Math.PI * 2;
        const radius = symbols.length > 2 ? 1.8 : 1.5;
        const pos = [Math.cos(angle) * radius, Math.sin(angle) * radius, 0];
        return (
          <React.Fragment key={idx}>
            <Atom3D element={getElement(sym)} position={pos} />
            <Bond start={[0, 0, 0]} end={pos} isIonic={isIonic} />
          </React.Fragment>
        );
      })}
    </group>
  );
}

// ==========================================
// 3. COMPONENTE PRINCIPAL
// ==========================================
export default function SimuladorQuimica() {
  const [selectedElement, setSelectedElement] = useState(PERIODIC_TABLE[0]);
  const [beaker, setBeaker] = useState([]);
  const [activeReaction, setActiveReaction] = useState(null);
  const [filter, setFilter] = useState('');

  const addToBeaker = (elem) => {
    setBeaker([...beaker, elem]);
    setActiveReaction(null);
  };

  const clearBeaker = () => {
    setBeaker([]);
    setActiveReaction(null);
  };

  const evaluateReaction = () => {
    const counts = beaker.reduce((acc, el) => {
      acc[el.symbol] = (acc[el.symbol] || 0) + 1;
      return acc;
    }, {});

    const matched = KNOWN_MOLECULES.find((mol) => {
      const keys = Object.keys(mol.composition);
      if (keys.length !== Object.keys(counts).length) return false;
      return keys.every((k) => mol.composition[k] === counts[k]);
    });

    if (matched) {
      setActiveReaction(matched);
    } else {
      alert('No se detectó una molécula conocida estable con esta combinación.');
    }
  };

  const filteredElements = PERIODIC_TABLE.filter(
    (e) => e.name.toLowerCase().includes(filter.toLowerCase()) || e.symbol.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', backgroundColor: '#121212', color: 'white', overflow: 'hidden' }}>
      {/* BARRA LATERAL */}
      <div style={{ width: '380px', padding: '16px', backgroundColor: '#1e1e1e', borderRight: '1px solid #2a2a2a', overflowY: 'auto', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#22d3ee' }}>
          <Atom size={28} />
          <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Quimic3D Lab (118 Elementos)</h1>
        </div>

        <input
          type="text"
          placeholder="Buscar elemento (ej: Oro, Au)..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            marginBottom: '12px',
            borderRadius: '6px',
            border: '1px solid #3f3f46',
            backgroundColor: '#121212',
            color: 'white',
            fontSize: '12px'
          }}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', maxHeight: '200px', overflowY: 'auto', marginBottom: '16px', paddingRight: '4px' }}>
          {filteredElements.map((elem) => (
            <button
              key={elem.symbol}
              onClick={() => setSelectedElement(elem)}
              style={{
                padding: '6px 2px',
                borderRadius: '6px',
                border: `1px solid ${elem.color}`,
                backgroundColor: selectedElement.symbol === elem.symbol ? '#2a2a2a' : '#121212',
                color: 'white',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: elem.color }}>{elem.symbol}</div>
              <div style={{ fontSize: '8px', color: '#a1a1aa' }}>{elem.z}</div>
            </button>
          ))}
        </div>

        {/* FICHA TÉCNICA */}
        <div style={{ backgroundColor: '#121212', padding: '12px', borderRadius: '10px', border: '1px solid #2a2a2a', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#67e8f9' }}>{selectedElement.name} ({selectedElement.symbol})</h3>
              <p style={{ fontSize: '11px', color: '#a1a1aa' }}>Z = {selectedElement.z} | Masa: {selectedElement.mass}</p>
              <p style={{ fontSize: '11px', color: '#71717a' }}>Electronegatividad: {selectedElement.en || 'N/A'}</p>
            </div>
            <button
              onClick={() => addToBeaker(selectedElement)}
              style={{ backgroundColor: '#0891b2', color: 'white', padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '12px' }}
            >
              + Vaso
            </button>
          </div>
        </div>

        {/* VASO DE MEZCLA */}
        <div style={{ backgroundColor: '#121212', padding: '12px', borderRadius: '10px', border: '1px solid #2a2a2a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#eab308', textTransform: 'uppercase' }}>Vaso de Reacción</span>
            {beaker.length > 0 && (
              <button onClick={clearBeaker} style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px' }}>Limpiar</button>
            )}
          </div>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', minHeight: '36px', padding: '6px', backgroundColor: '#1e1e1e', borderRadius: '6px', marginBottom: '10px' }}>
            {beaker.length === 0 ? (
              <span style={{ fontSize: '11px', color: '#71717a' }}>Selecciona y agrega átomos...</span>
            ) : (
              beaker.map((el, idx) => (
                <span key={idx} style={{ padding: '2px 6px', backgroundColor: '#2a2a2a', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', color: el.color }}>
                  {el.symbol}
                </span>
              ))
            )}
          </div>
          <button
            disabled={beaker.length < 2}
            onClick={evaluateReaction}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: beaker.length >= 2 ? '#0284c7' : '#3f3f46',
              color: 'white',
              fontWeight: 'bold',
              cursor: beaker.length >= 2 ? 'pointer' : 'not-allowed',
              fontSize: '13px'
            }}
          >
            Probar Reacción
          </button>
        </div>
      </div>

      {/* LIENZO 3D */}
      <div style={{ flex: 1, height: '100%', position: 'relative' }}>
        {activeReaction && (
          <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, textAlign: 'center', pointerEvents: 'none' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#22d3ee' }}>{`${activeReaction.name} (${activeReaction.formula})`}</h2>
            <p style={{ fontSize: '14px', color: '#a1a1aa' }}>{`Tipo: ${activeReaction.type} | ΔEN: ${activeReaction.diffEn}`}</p>
          </div>
        )}

        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <color attach="background" args={['#121212']} />
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00f0ff" />

          <Suspense fallback={null}>
            {activeReaction ? (
              <ReactionViewer reaction={activeReaction} />
            ) : (
              <Atom3D element={selectedElement} />
            )}
            <OrbitControls enablePan={true} enableZoom={true} minDistance={3} maxDistance={20} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}