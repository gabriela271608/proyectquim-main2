import React, { useState } from 'react';

// LISTA COMPLETA DE LOS 118 ELEMENTOS
const elementsData = [
  // Periodo 1
  { num: 1, symbol: 'H', name: 'Hidrógeno', mass: '1.008', category: 'nonmetal', group: 1, period: 1, config: '1s¹', state: 'Gas', desc: 'Elemento más abundante del universo.' },
  { num: 2, symbol: 'He', name: 'Helio', mass: '4.0026', category: 'noble', group: 18, period: 1, config: '1s²', state: 'Gas', desc: 'Gas noble inerte y ligero.' },

  // Periodo 2
  { num: 3, symbol: 'Li', name: 'Litio', mass: '6.94', category: 'alkali', group: 1, period: 2, config: '[He] 2s¹', state: 'Sólido', desc: 'Metal alcalino blando y reactivo.' },
  { num: 4, symbol: 'Be', name: 'Berilio', mass: '9.0122', category: 'alkaline', group: 2, period: 2, config: '[He] 2s²', state: 'Sólido', desc: 'Metal liviano y rígido.' },
  { num: 5, symbol: 'B', name: 'Boro', mass: '10.81', category: 'metalloid', group: 13, period: 2, config: '[He] 2s² 2p¹', state: 'Sólido', desc: 'Metaloide semiconductor.' },
  { num: 6, symbol: 'C', name: 'Carbono', mass: '12.011', category: 'nonmetal', group: 14, period: 2, config: '[He] 2s² 2p²', state: 'Sólido', desc: 'Base fundamental de la vida orgánica.' },
  { num: 7, symbol: 'N', name: 'Nitrógeno', mass: '14.007', category: 'nonmetal', group: 15, period: 2, config: '[He] 2s² 2p³', state: 'Gas', desc: 'Gas principal en el aire terrestre.' },
  { num: 8, symbol: 'O', name: 'Oxígeno', mass: '15.999', category: 'nonmetal', group: 16, period: 2, config: '[He] 2s² 2p⁴', state: 'Gas', desc: 'Gas vital para la respiración.' },
  { num: 9, symbol: 'F', name: 'Flúor', mass: '18.998', category: 'halogen', group: 17, period: 2, config: '[He] 2s² 2p⁵', state: 'Gas', desc: 'Elemento más electronegativo.' },
  { num: 10, symbol: 'Ne', name: 'Neón', mass: '20.180', category: 'noble', group: 18, period: 2, config: '[He] 2s² 2p⁶', state: 'Gas', desc: 'Gas noble que emite brillo anaranjado.' },

  // Periodo 3
  { num: 11, symbol: 'Na', name: 'Sodio', mass: '22.990', category: 'alkali', group: 1, period: 3, config: '[Ne] 3s¹', state: 'Sólido', desc: 'Componente clave de la sal.' },
  { num: 12, symbol: 'Mg', name: 'Magnesio', mass: '24.305', category: 'alkaline', group: 2, period: 3, config: '[Ne] 3s²', state: 'Sólido', desc: 'Esencial para la clorofila.' },
  { num: 13, symbol: 'Al', name: 'Aluminio', mass: '26.982', category: 'post-transition', group: 13, period: 3, config: '[Ne] 3s² 3p¹', state: 'Sólido', desc: 'Metal ligero e inoxidable.' },
  { num: 14, symbol: 'Si', name: 'Silicio', mass: '28.085', category: 'metalloid', group: 14, period: 3, config: '[Ne] 3s² 3p²', state: 'Sólido', desc: 'Semiconductor de microchips.' },
  { num: 15, symbol: 'P', name: 'Fósforo', mass: '30.974', category: 'nonmetal', group: 15, period: 3, config: '[Ne] 3s² 3p³', state: 'Sólido', desc: 'Elemento vital en el ADN.' },
  { num: 16, symbol: 'S', name: 'Azufre', mass: '32.06', category: 'nonmetal', group: 16, period: 3, config: '[Ne] 3s² 3p⁴', state: 'Sólido', desc: 'No metal de color amarillo.' },
  { num: 17, symbol: 'Cl', name: 'Cloro', mass: '35.45', category: 'halogen', group: 17, period: 3, config: '[Ne] 3s² 3p⁵', state: 'Gas', desc: 'Usado como desinfectante.' },
  { num: 18, symbol: 'Ar', name: 'Argón', mass: '39.948', category: 'noble', group: 18, period: 3, config: '[Ne] 3s² 3p⁶', state: 'Gas', desc: 'Gas noble abundante.' },

  // Periodo 4
  { num: 19, symbol: 'K', name: 'Potasio', mass: '39.098', category: 'alkali', group: 1, period: 4, config: '[Ar] 4s¹', state: 'Sólido', desc: 'Esencial para el sistema nervioso.' },
  { num: 20, symbol: 'Ca', name: 'Calcio', mass: '40.078', category: 'alkaline', group: 2, period: 4, config: '[Ar] 4s²', state: 'Sólido', desc: 'Clave en la formación ósea.' },
  { num: 21, symbol: 'Sc', name: 'Escandio', mass: '44.956', category: 'transition', group: 3, period: 4, config: '[Ar] 3d¹ 4s²', state: 'Sólido', desc: 'Usado en aleaciones aeroespaciales.' },
  { num: 22, symbol: 'Ti', name: 'Titanio', mass: '47.867', category: 'transition', group: 4, period: 4, config: '[Ar] 3d² 4s²', state: 'Sólido', desc: 'Metal resistente y muy liviano.' },
  { num: 23, symbol: 'V', name: 'Vanadio', mass: '50.942', category: 'transition', group: 5, period: 4, config: '[Ar] 3d³ 4s²', state: 'Sólido', desc: 'Refuerza aleaciones de acero.' },
  { num: 24, symbol: 'Cr', name: 'Cromo', mass: '51.996', category: 'transition', group: 6, period: 4, config: '[Ar] 3d⁵ 4s¹', state: 'Sólido', desc: 'Conocido por su brillo e inoxidable.' },
  { num: 25, symbol: 'Mn', name: 'Manganeso', mass: '54.938', category: 'transition', group: 7, period: 4, config: '[Ar] 3d⁵ 4s²', state: 'Sólido', desc: 'Usado en producción de acero.' },
  { num: 26, symbol: 'Fe', name: 'Hierro', mass: '55.845', category: 'transition', group: 8, period: 4, config: '[Ar] 3d⁶ 4s²', state: 'Sólido', desc: 'El metal estructural más usado.' },
  { num: 27, symbol: 'Co', name: 'Cobalto', mass: '58.933', category: 'transition', group: 9, period: 4, config: '[Ar] 3d⁷ 4s²', state: 'Sólido', desc: 'Usado en baterías de ion litio.' },
  { num: 28, symbol: 'Ni', name: 'Níquel', mass: '58.693', category: 'transition', group: 10, period: 4, config: '[Ar] 3d⁸ 4s²', state: 'Sólido', desc: 'Usado en monedas y acero inox.' },
  { num: 29, symbol: 'Cu', name: 'Cobre', mass: '63.546', category: 'transition', group: 11, period: 4, config: '[Ar] 3d¹⁰ 4s¹', state: 'Sólido', desc: 'Excelente conductor eléctrico.' },
  { num: 30, symbol: 'Zn', name: 'Zinc', mass: '65.38', category: 'transition', group: 12, period: 4, config: '[Ar] 3d¹⁰ 4s²', state: 'Sólido', desc: 'Usado para galvanizar metales.' },
  { num: 31, symbol: 'Ga', name: 'Galio', mass: '69.723', category: 'post-transition', group: 13, period: 4, config: '[Ar] 3d¹⁰ 4s² 4p¹', state: 'Sólido', desc: 'Se liquida en la mano humana.' },
  { num: 32, symbol: 'Ge', name: 'Germanio', mass: '72.630', category: 'metalloid', group: 14, period: 4, config: '[Ar] 3d¹⁰ 4s² 4p²', state: 'Sólido', desc: 'Semiconductor en fibra óptica.' },
  { num: 33, symbol: 'As', name: 'Arsénico', mass: '74.922', category: 'metalloid', group: 15, period: 4, config: '[Ar] 3d¹⁰ 4s² 4p³', state: 'Sólido', desc: 'Metaloide famoso por su toxicidad.' },
  { num: 34, symbol: 'Se', name: 'Selenio', mass: '78.971', category: 'nonmetal', group: 16, period: 4, config: '[Ar] 3d¹⁰ 4s² 4p⁴', state: 'Sólido', desc: 'Usado en celdas solares.' },
  { num: 35, symbol: 'Br', name: 'Bromo', mass: '79.904', category: 'halogen', group: 17, period: 4, config: '[Ar] 3d¹⁰ 4s² 4p⁵', state: 'Líquido', desc: 'Único no metal líquido.' },
  { num: 36, symbol: 'Kr', name: 'Kriptón', mass: '83.798', category: 'noble', group: 18, period: 4, config: '[Ar] 3d¹⁰ 4s² 4p⁶', state: 'Gas', desc: 'Usado en flashes fotográficos.' },

  // Periodo 5
  { num: 37, symbol: 'Rb', name: 'Rubidio', mass: '85.468', category: 'alkali', group: 1, period: 5, config: '[Kr] 5s¹', state: 'Sólido', desc: 'Metal alcalino muy reactivo.' },
  { num: 38, symbol: 'Sr', name: 'Estroncio', mass: '87.62', category: 'alkaline', group: 2, period: 5, config: '[Kr] 5s²', state: 'Sólido', desc: 'Da color rojo a los pirotécnicos.' },
  { num: 39, symbol: 'Y', name: 'Itrio', mass: '88.906', category: 'transition', group: 3, period: 5, config: '[Kr] 4d¹ 5s²', state: 'Sólido', desc: 'Usado en tecnología de láseres.' },
  { num: 40, symbol: 'Zr', name: 'Circonio', mass: '91.224', category: 'transition', group: 4, period: 5, config: '[Kr] 4d² 5s²', state: 'Sólido', desc: 'Resistente a la corrosión extrema.' },
  { num: 41, symbol: 'Nb', name: 'Niobio', mass: '92.906', category: 'transition', group: 5, period: 5, config: '[Kr] 4d⁴ 5s¹', state: 'Sólido', desc: 'Superconductor a bajas temperaturas.' },
  { num: 42, symbol: 'Mo', name: 'Molibdeno', mass: '95.95', category: 'transition', group: 6, period: 5, config: '[Kr] 4d⁵ 5s¹', state: 'Sólido', desc: 'Soporta altísimas temperaturas.' },
  { num: 43, symbol: 'Tc', name: 'Tecnecio', mass: '98', category: 'transition', group: 7, period: 5, config: '[Kr] 4d⁵ 5s²', state: 'Sólido', desc: 'Primer elemento sintético.' },
  { num: 44, symbol: 'Ru', name: 'Rutenio', mass: '101.07', category: 'transition', group: 8, period: 5, config: '[Kr] 4d⁷ 5s¹', state: 'Sólido', desc: 'Usado en contactos eléctricos.' },
  { num: 45, symbol: 'Rh', name: 'Rodio', mass: '102.91', category: 'transition', group: 9, period: 5, config: '[Kr] 4d⁸ 5s¹', state: 'Sólido', desc: 'Metal precioso altamente reflectante.' },
  { num: 46, symbol: 'Pd', name: 'Paladio', mass: '106.42', category: 'transition', group: 10, period: 5, config: '[Kr] 4d¹⁰', state: 'Sólido', desc: 'Catalizador industrial importante.' },
  { num: 47, symbol: 'Ag', name: 'Plata', mass: '107.87', category: 'transition', group: 11, period: 5, config: '[Kr] 4d¹⁰ 5s¹', state: 'Sólido', desc: 'El mejor conductor eléctrico.' },
  { num: 48, symbol: 'Cd', name: 'Cadmio', mass: '112.41', category: 'transition', group: 12, period: 5, config: '[Kr] 4d¹⁰ 5s²', state: 'Sólido', desc: 'Metal tóxico usado en pigmentos.' },
  { num: 49, symbol: 'In', name: 'Indio', mass: '114.82', category: 'post-transition', group: 13, period: 5, config: '[Kr] 4d¹⁰ 5s² 5p¹', state: 'Sólido', desc: 'Usado en pantallas táctiles.' },
  { num: 50, symbol: 'Sn', name: 'Estaño', mass: '118.71', category: 'post-transition', group: 14, period: 5, config: '[Kr] 4d¹⁰ 5s² 5p²', state: 'Sólido', desc: 'Usado en soldadura blanda.' },
  { num: 51, symbol: 'Sb', name: 'Antimonio', mass: '121.76', category: 'metalloid', group: 15, period: 5, config: '[Kr] 4d¹⁰ 5s² 5p³', state: 'Sólido', desc: 'Utilizado en retardantes de llama.' },
  { num: 52, symbol: 'Te', name: 'Telurio', mass: '127.60', category: 'metalloid', group: 16, period: 5, config: '[Kr] 4d¹⁰ 5s² 5p⁴', state: 'Sólido', desc: 'Utilizado en aleaciones de cobre.' },
  { num: 53, symbol: 'I', name: 'Yodo', mass: '126.90', category: 'halogen', group: 17, period: 5, config: '[Kr] 4d¹⁰ 5s² 5p⁵', state: 'Sólido', desc: 'Esencial en la dieta humana.' },
  { num: 54, symbol: 'Xe', name: 'Xenón', mass: '131.29', category: 'noble', group: 18, period: 5, config: '[Kr] 4d¹⁰ 5s² 5p⁶', state: 'Gas', desc: 'Gas noble en lámparas de cine.' },

  // Periodo 6
  { num: 55, symbol: 'Cs', name: 'Cesio', mass: '132.91', category: 'alkali', group: 1, period: 6, config: '[Xe] 6s¹', state: 'Sólido', desc: 'Usado en los relojes atómicos.' },
  { num: 56, symbol: 'Ba', name: 'Bario', mass: '137.33', category: 'alkaline', group: 2, period: 6, config: '[Xe] 6s²', state: 'Sólido', desc: 'Usado en contrastes médicos.' },
  { num: 57, symbol: 'La', name: 'Lantano', mass: '138.91', category: 'lanthanide', group: 3, period: 6, config: '[Xe] 5d¹ 6s²', state: 'Sólido', desc: 'Inicia la serie de lantánidos.' },
  { num: 72, symbol: 'Hf', name: 'Hafnio', mass: '178.49', category: 'transition', group: 4, period: 6, config: '[Xe] 4f¹⁴ 5d² 6s²', state: 'Sólido', desc: 'Absorbedor de neutrones.' },
  { num: 73, symbol: 'Ta', name: 'Tántalo', mass: '180.95', category: 'transition', group: 5, period: 6, config: '[Xe] 4f¹⁴ 5d³ 6s²', state: 'Sólido', desc: 'Utilizado en condensadores de celular.' },
  { num: 74, symbol: 'W', name: 'Wolframio', mass: '183.84', category: 'transition', group: 6, period: 6, config: '[Xe] 4f¹⁴ 5d⁴ 6s²', state: 'Sólido', desc: 'Punto de fusión más alto.' },
  { num: 75, symbol: 'Re', name: 'Renio', mass: '186.21', category: 'transition', group: 7, period: 6, config: '[Xe] 4f¹⁴ 5d⁵ 6s²', state: 'Sólido', desc: 'Usado en turbinas de turborreactores.' },
  { num: 76, symbol: 'Os', name: 'Osmio', mass: '190.23', category: 'transition', group: 8, period: 6, config: '[Xe] 4f¹⁴ 5d⁶ 6s²', state: 'Sólido', desc: 'Elemento natural más denso.' },
  { num: 77, symbol: 'Ir', name: 'Iridio', mass: '192.22', category: 'transition', group: 9, period: 6, config: '[Xe] 4f¹⁴ 5d⁷ 6s²', state: 'Sólido', desc: 'Extremadamente resistente a la corrosión.' },
  { num: 78, symbol: 'Pt', name: 'Platino', mass: '195.08', category: 'transition', group: 10, period: 6, config: '[Xe] 4f¹⁴ 5d⁹ 6s¹', state: 'Sólido', desc: 'Metal precioso inerte y valioso.' },
  { num: 79, symbol: 'Au', name: 'Oro', mass: '196.97', category: 'transition', group: 11, period: 6, config: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', state: 'Sólido', desc: 'Metal noble maleable por excelencia.' },
  { num: 80, symbol: 'Hg', name: 'Mercurio', mass: '200.59', category: 'transition', group: 12, period: 6, config: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', state: 'Líquido', desc: 'Único metal líquido a temp. ambiente.' },
  { num: 81, symbol: 'Tl', name: 'Talio', mass: '204.38', category: 'post-transition', group: 13, period: 6, config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹', state: 'Sólido', desc: 'Metal blando y sumamente tóxico.' },
  { num: 82, symbol: 'Pb', name: 'Plomo', mass: '207.2', category: 'post-transition', group: 14, period: 6, config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', state: 'Sólido', desc: 'Metal pesado blindaje contra radiación.' },
  { num: 83, symbol: 'Bi', name: 'Bismuto', mass: '208.98', category: 'post-transition', group: 15, period: 6, config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³', state: 'Sólido', desc: 'Metal pesado no tóxico y cristalino.' },
  { num: 84, symbol: 'Po', name: 'Polonio', mass: '209', category: 'post-transition', group: 16, period: 6, config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴', state: 'Sólido', desc: 'Altamente radiactivo.' },
  { num: 85, symbol: 'At', name: 'Astato', mass: '210', category: 'halogen', group: 17, period: 6, config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵', state: 'Sólido', desc: 'El elemento más raro del planeta.' },
  { num: 86, symbol: 'Rn', name: 'Radón', mass: '222', category: 'noble', group: 18, period: 6, config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶', state: 'Gas', desc: 'Gas noble pesado y radiactivo.' },

  // Periodo 7
  { num: 87, symbol: 'Fr', name: 'Francio', mass: '223', category: 'alkali', group: 1, period: 7, config: '[Rn] 7s¹', state: 'Sólido', desc: 'El segundo elemento más raro.' },
  { num: 88, symbol: 'Ra', name: 'Radio', mass: '226', category: 'alkaline', group: 2, period: 7, config: '[Rn] 7s²', state: 'Sólido', desc: 'Luminiscente y radiactivo.' },
  { num: 89, symbol: 'Ac', name: 'Actinio', mass: '227', category: 'actinide', group: 3, period: 7, config: '[Rn] 6d¹ 7s²', state: 'Sólido', desc: 'Inicia la serie de los actínidos.' },
  { num: 104, symbol: 'Rf', name: 'Rutherfordio', mass: '267', category: 'transition', group: 4, period: 7, config: '[Rn] 5f¹⁴ 6d² 7s²', state: 'Sintético', desc: 'Elemento sintético súper-pesado.' },
  { num: 105, symbol: 'Db', name: 'Dubnio', mass: '268', category: 'transition', group: 5, period: 7, config: '[Rn] 5f¹⁴ 6d³ 7s²', state: 'Sintético', desc: 'Elemento sintético radiactivo.' },
  { num: 106, symbol: 'Sg', name: 'Seaborgio', mass: '269', category: 'transition', group: 6, period: 7, config: '[Rn] 5f¹⁴ 6d⁴ 7s²', state: 'Sintético', desc: 'Nombrado por Glenn Seaborg.' },
  { num: 107, symbol: 'Bh', name: 'Bohrio', mass: '270', category: 'transition', group: 7, period: 7, config: '[Rn] 5f¹⁴ 6d⁵ 7s²', state: 'Sintético', desc: 'Nombrado en honor a Niels Bohr.' },
  { num: 108, symbol: 'Hs', name: 'Hassio', mass: '277', category: 'transition', group: 8, period: 7, config: '[Rn] 5f¹⁴ 6d⁶ 7s²', state: 'Sintético', desc: 'Sintetizado en Alemania.' },
  { num: 109, symbol: 'Mt', name: 'Meitnerio', mass: '278', category: 'transition', group: 9, period: 7, config: '[Rn] 5f¹⁴ 6d⁷ 7s²', state: 'Sintético', desc: 'Nombrado por Lise Meitner.' },
  { num: 110, symbol: 'Ds', name: 'Darmstadtio', mass: '281', category: 'transition', group: 10, period: 7, config: '[Rn] 5f¹⁴ 6d⁸ 7s²', state: 'Sintético', desc: 'Elemento súper-pesado.' },
  { num: 111, symbol: 'Rg', name: 'Roentgenio', mass: '282', category: 'transition', group: 11, period: 7, config: '[Rn] 5f¹⁴ 6d⁹ 7s²', state: 'Sintético', desc: 'Nombrado por los Rayos X.' },
  { num: 112, symbol: 'Cn', name: 'Copernicio', mass: '285', category: 'transition', group: 12, period: 7, config: '[Rn] 5f¹⁴ 6d¹⁰ 7s²', state: 'Sintético', desc: 'Nombrado en honor a Copérnico.' },
  { num: 113, symbol: 'Nh', name: 'Nihonio', mass: '286', category: 'post-transition', group: 13, period: 7, config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹', state: 'Sintético', desc: 'Sintetizado en Japón.' },
  { num: 114, symbol: 'Fl', name: 'Flerovio', mass: '289', category: 'post-transition', group: 14, period: 7, config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²', state: 'Sintético', desc: 'Elemento superpesado inestable.' },
  { num: 115, symbol: 'Mc', name: 'Moscovio', mass: '290', category: 'post-transition', group: 15, period: 7, config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³', state: 'Sintético', desc: 'Sintetizado en Moscú.' },
  { num: 116, symbol: 'Lv', name: 'Livermorio', mass: '293', category: 'post-transition', group: 16, period: 7, config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴', state: 'Sintético', desc: 'Sintetizado en California.' },
  { num: 117, symbol: 'Ts', name: 'Teneso', mass: '294', category: 'halogen', group: 17, period: 7, config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵', state: 'Sintético', desc: 'El segundo más pesado.' },
  { num: 118, symbol: 'Og', name: 'Oganesón', mass: '294', category: 'noble', group: 18, period: 7, config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶', state: 'Sintético', desc: 'El elemento más pesado existente.' },

  // Lantánidos (Fila 9)
  { num: 58, symbol: 'Ce', name: 'Cerio', mass: '140.12', category: 'lanthanide', group: 4, period: 9, config: '[Xe] 4f¹ 5d¹ 6s²', state: 'Sólido', desc: 'Lantánido abundante.' },
  { num: 59, symbol: 'Pr', name: 'Praseodimio', mass: '140.91', category: 'lanthanide', group: 5, period: 9, config: '[Xe] 4f³ 6s²', state: 'Sólido', desc: 'Usado en lentes de soldador.' },
  { num: 60, symbol: 'Nd', name: 'Neodimio', mass: '144.24', category: 'lanthanide', group: 6, period: 9, config: '[Xe] 4f⁴ 6s²', state: 'Sólido', desc: 'Famoso por sus imanes potentes.' },
  { num: 61, symbol: 'Pm', name: 'Prometio', mass: '145', category: 'lanthanide', group: 7, period: 9, config: '[Xe] 4f⁵ 6s²', state: 'Sólido', desc: 'Lantánido radiactivo.' },
  { num: 62, symbol: 'Sm', name: 'Samario', mass: '150.36', category: 'lanthanide', group: 8, period: 9, config: '[Xe] 4f⁶ 6s²', state: 'Sólido', desc: 'Usado en imanes que soportan calor.' },
  { num: 63, symbol: 'Eu', name: 'Europio', mass: '151.96', category: 'lanthanide', group: 9, period: 9, config: '[Xe] 4f⁷ 6s²', state: 'Sólido', desc: 'Da el pigmento rojo en pantallas.' },
  { num: 64, symbol: 'Gd', name: 'Gadolinio', mass: '157.25', category: 'lanthanide', group: 10, period: 9, config: '[Xe] 4f⁷ 5d¹ 6s²', state: 'Sólido', desc: 'Usado en contraste de resonancias.' },
  { num: 65, symbol: 'Tb', name: 'Terbio', mass: '158.93', category: 'lanthanide', group: 11, period: 9, config: '[Xe] 4f⁹ 6s²', state: 'Sólido', desc: 'Emite color verde brillante.' },
  { num: 66, symbol: 'Dy', name: 'Disprosio', mass: '162.50', category: 'lanthanide', group: 12, period: 9, config: '[Xe] 4f¹⁰ 6s²', state: 'Sólido', desc: 'Absorbedor de neutrones.' },
  { num: 67, symbol: 'Ho', name: 'Holmio', mass: '164.93', category: 'lanthanide', group: 13, period: 9, config: '[Xe] 4f¹¹ 6s²', state: 'Sólido', desc: 'Alto momento magnético.' },
  { num: 68, symbol: 'Er', name: 'Erbio', mass: '167.26', category: 'lanthanide', group: 14, period: 9, config: '[Xe] 4f¹² 6s²', state: 'Sólido', desc: 'Usado en amplificadores ópticos.' },
  { num: 69, symbol: 'Tm', name: 'Tulio', mass: '168.93', category: 'lanthanide', group: 15, period: 9, config: '[Xe] 4f¹³ 6s²', state: 'Sólido', desc: 'Lantánido muy poco abundante.' },
  { num: 70, symbol: 'Yb', name: 'Iterbio', mass: '173.05', category: 'lanthanide', group: 16, period: 9, config: '[Xe] 4f¹⁴ 6s²', state: 'Sólido', desc: 'Usado en relojes atómicos.' },
  { num: 71, symbol: 'Lu', name: 'Lutecio', mass: '174.97', category: 'lanthanide', group: 17, period: 9, config: '[Xe] 4f¹⁴ 5d¹ 6s²', state: 'Sólido', desc: 'Cierra el grupo de lantánidos.' },

  // Actínidos (Fila 10)
  { num: 90, symbol: 'Th', name: 'Torio', mass: '232.04', category: 'actinide', group: 4, period: 10, config: '[Rn] 6d² 7s²', state: 'Sólido', desc: 'Futuro combustible limpio nuclear.' },
  { num: 91, symbol: 'Pa', name: 'Protactinio', mass: '231.04', category: 'actinide', group: 5, period: 10, config: '[Rn] 5f² 6d¹ 7s²', state: 'Sólido', desc: 'Elemento tóxico y radiactivo.' },
  { num: 92, symbol: 'U', name: 'Uranio', mass: '238.03', category: 'actinide', group: 6, period: 10, config: '[Rn] 5f³ 6d¹ 7s²', state: 'Sólido', desc: 'Principal fuente energética nuclear.' },
  { num: 93, symbol: 'Np', name: 'Neptunio', mass: '237', category: 'actinide', group: 7, period: 10, config: '[Rn] 5f⁴ 6d¹ 7s²', state: 'Sólido', desc: 'Subproducto de reactores.' },
  { num: 94, symbol: 'Pu', name: 'Plutonio', mass: '244', category: 'actinide', group: 8, period: 10, config: '[Rn] 5f⁶ 7s²', state: 'Sólido', desc: 'Fisionable de alta energía.' },
  { num: 95, symbol: 'Am', name: 'Americio', mass: '243', category: 'actinide', group: 9, period: 10, config: '[Rn] 5f⁷ 7s²', state: 'Sólido', desc: 'Presente en detectores de humo.' },
  { num: 96, symbol: 'Cm', name: 'Curio', mass: '247', category: 'actinide', group: 10, period: 10, config: '[Rn] 5f⁷ 6d¹ 7s²', state: 'Sólido', desc: 'Nombrado por los Curie.' },
  { num: 97, symbol: 'Bk', name: 'Berkelio', mass: '247', category: 'actinide', group: 11, period: 10, config: '[Rn] 5f⁹ 7s²', state: 'Sólido', desc: 'Sintetizado en Berkeley.' },
  { num: 98, symbol: 'Cf', name: 'Californio', mass: '251', category: 'actinide', group: 12, period: 10, config: '[Rn] 5f¹⁰ 7s²', state: 'Sólido', desc: 'Utilizado en detectores metálicos.' },
  { num: 99, symbol: 'Es', name: 'Einstenio', mass: '252', category: 'actinide', group: 13, period: 10, config: '[Rn] 5f¹¹ 7s²', state: 'Sólido', desc: 'Nombrado por Albert Einstein.' },
  { num: 100, symbol: 'Fm', name: 'Fermio', mass: '257', category: 'actinide', group: 14, period: 10, config: '[Rn] 5f¹² 7s²', state: 'Sólido', desc: 'Nombrado por Enrico Fermi.' },
  { num: 101, symbol: 'Md', name: 'Mendelevio', mass: '258', category: 'actinide', group: 15, period: 10, config: '[Rn] 5f¹³ 7s²', state: 'Sólido', desc: 'Nombrado por Mendeleev.' },
  { num: 102, symbol: 'No', name: 'Nobelio', mass: '259', category: 'actinide', group: 16, period: 10, config: '[Rn] 5f¹⁴ 7s²', state: 'Sólido', desc: 'Nombrado por Alfred Nobel.' },
  { num: 103, symbol: 'Lr', name: 'Laurencio', mass: '266', category: 'actinide', group: 17, period: 10, config: '[Rn] 5f¹⁴ 6d¹ 7s²', state: 'Sólido', desc: 'Cierra la serie de actínidos.' }
];

// PALETA DE COLORES PASTELES DE LA IMAGEN
const categoryStyles = {
  nonmetal: { bg: '#e0f2fe', text: '#0284c7' },       // Azul Pastel
  noble: { bg: '#ffe4e6', text: '#e11d48' },          // Rojo/Rosa Pastel
  alkali: { bg: '#ccfbf1', text: '#0d9488' },         // Menta Pastel
  alkaline: { bg: '#fee2e2', text: '#dc2626' },       // Coral Pastel
  transition: { bg: '#f3e8ff', text: '#7e22ce' },     // Morado Pastel
  'post-transition': { bg: '#dcfce7', text: '#15803d' }, // Verde Pastel
  metalloid: { bg: '#fef3c7', text: '#b45309' },      // Amarillo Pastel
  halogen: { bg: '#e0f2fe', text: '#0369a1' },        // Azul Suave Pastel
  lanthanide: { bg: '#e0f2fe', text: '#0369a1' },     // Azul Claro
  actinide: { bg: '#ffedd5', text: '#c2410c' }        // Naranja Pastel
};

export default function PeriodicTable() {
  const [activeElement, setActiveElement] = useState(null);

  return (
    <div 
      translate="no" 
      className="notranslate"
      style={{
        backgroundColor: '#ffffff',
        padding: '24px 16px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(18, minmax(48px, 1fr))',
        gridTemplateRows: 'repeat(10, 60px)',
        gap: '4px',
        maxWidth: '1200px',
        width: '100%'
      }}>
        {elementsData.map((elem) => {
          const style = categoryStyles[elem.category] || { bg: '#f1f5f9', text: '#334155' };

          return (
            <div
              key={elem.num}
              onClick={() => setActiveElement(elem)}
              translate="no"
              className="notranslate"
              style={{
                gridColumn: elem.group,
                gridRow: elem.period,
                backgroundColor: style.bg,
                borderRadius: '6px',
                height: '100%',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '3px 4px',
                userSelect: 'none',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                transition: 'transform 0.1s ease, box-shadow 0.1s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.zIndex = '10';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.zIndex = '1';
                e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)';
              }}
            >
              {/* NÚMERO ATÓMICO (Arriba a la izquierda) */}
              <span style={{ 
                fontSize: '11px', 
                color: style.text, 
                fontWeight: '500',
                lineHeight: '1' 
              }}>
                {elem.num}
              </span>

              {/* SÍMBOLO QUÍMICO (Centro, letra grande y clara) */}
              <span 
                translate="no" 
                className="notranslate" 
                style={{ 
                  fontSize: '22px', 
                  fontWeight: 'bold', 
                  color: style.text, 
                  textAlign: 'center',
                  lineHeight: '1'
                }}
              >
                {elem.symbol}
              </span>

              {/* NOMBRE DEL ELEMENTO (Abajo en letra pequeña) */}
              <span style={{ 
                fontSize: '9px', 
                color: style.text, 
                textAlign: 'center',
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis',
                fontWeight: '400',
                lineHeight: '1'
              }}>
                {elem.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* DETALLE AL HACER CLIC EN UN ELEMENTO */}
      {activeElement && (
        <div 
          onClick={() => setActiveElement(null)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '380px',
              width: '90%',
              borderTop: `6px solid ${categoryStyles[activeElement.category]?.text}`,
              boxShadow: '0 12px 28px rgba(0,0,0,0.12)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div 
                translate="no" 
                className="notranslate"
                style={{
                  backgroundColor: categoryStyles[activeElement.category]?.bg,
                  color: categoryStyles[activeElement.category]?.text,
                  width: '60px',
                  height: '60px',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}
              >
                <span style={{ fontSize: '10px' }}>{activeElement.num}</span>
                <span style={{ fontSize: '22px' }}>{activeElement.symbol}</span>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '20px', color: '#1e293b' }}>{activeElement.name}</h3>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>{activeElement.state}</p>
              </div>
            </div>

            <div style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5' }}>
              <p style={{ margin: '4px 0' }}><strong>Masa Atómica:</strong> {activeElement.mass} g/mol</p>
              <p style={{ margin: '4px 0' }}><strong>Configuración:</strong> <code translate="no" className="notranslate">{activeElement.config}</code></p>
              <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#64748b' }}>{activeElement.desc}</p>
            </div>

            <button 
              onClick={() => setActiveElement(null)}
              style={{
                marginTop: '16px',
                width: '100%',
                padding: '8px',
                borderRadius: '8px',
                border: 'none',
                background: '#f1f5f9',
                color: '#475569',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}