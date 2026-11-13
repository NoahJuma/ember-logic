(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.EmberChapter39Models = factory();
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  const h = 6.62607015e-34, c = 299792458, e = 1.602176634e-19;
  const electronMass = 9.1093837015e-31;
  function electronWave(energyEV) {
    if (energyEV === '' || energyEV === null) throw new RangeError('positive finite energy required');
    const energy = Number(energyEV);
    if (!Number.isFinite(energy) || energy <= 0) throw new RangeError('positive finite energy required');
    // Evaluate in electron-volts to avoid squaring extremely small SI energies.
    const restEV = electronMass * c * c / e;
    const momentumC = Math.sqrt(energy) * Math.sqrt(energy + 2 * restEV);
    const classicalMomentumC = Math.sqrt(energy) * Math.sqrt(2 * restEV);
    const wavelength = h * c / e / momentumC * 1e9;
    const classicalWavelength = h * c / e / classicalMomentumC * 1e9;
    const speedFraction = momentumC / (energy + restEV);
    if (![wavelength, classicalWavelength, speedFraction].every(Number.isFinite) || wavelength <= 0 || speedFraction <= 0) throw new RangeError('energy out of range');
    return { wavelength, classicalWavelength, speedFraction, classicalPercentError: 100 * (classicalWavelength / wavelength - 1) };
  }
  return { electronWave };
});
