import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

// Mock matchmedia
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () { },
    removeListener: function () { }
  };
};