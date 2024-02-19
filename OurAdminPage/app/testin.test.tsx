// import { render } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import DashboardLayout from './(dashboard)/[storeId]/layout'; // Pfad entsprechend anpassen
// import { useRouter } from 'next/router';

// import { NextRouter } from 'next/router';

// // Mock für next/router mit Typisierung
// jest.mock('next/router', () => ({
//   useRouter: jest.fn(),
// }));

// // Typisierung für den gemockten useRouter Hook
// const mockedUseRouter = useRouter as jest.MockedFunction<() => NextRouter>;

// // Beispielhafte Implementierung für einen Test
// describe('DashboardLayout', () => {
//   beforeEach(() => {
//     // Mock-Implementierung zurücksetzen
//     mockedUseRouter.mockImplementation(() => ({
//       push: jest.fn(),
//     }));
//   });

//   it('should redirect if no store is in localStorage', () => {
//     window.localStorage.clear(); // Stelle sicher, dass localStorage leer ist
//     const { getByText } = render(<DashboardLayout params={{ storeId: 'test-store' }}>Test Child</DashboardLayout>);

//     // Überprüfen, ob push aufgerufen wurde
//     expect(mockedUseRouter().push).toHaveBeenCalledWith('/');
//   });
// });
