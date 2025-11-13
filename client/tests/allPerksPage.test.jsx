import { fireEvent, screen } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';

import AllPerks from '../src/pages/AllPerks.jsx';
import { renderWithRouter } from './utils/renderWithRouter.js';

describe('AllPerks page (Directory)', () => {
  test('lists public perks and responds to name filtering', async () => {
    const seededPerk = global.__TEST_CONTEXT__.seededPerk;

    renderWithRouter(
      <Routes>
        <Route path="/explore" element={<AllPerks />} />
      </Routes>,
      { initialEntries: ['/explore'] }
    );

    // Wait for the seeded perk to appear
    const perkCard = await screen.findByText(seededPerk.title);
    expect(perkCard).toBeInTheDocument();

    // Interact with the name filter
    const nameFilter = screen.getByPlaceholderText('Enter perk name...');
    fireEvent.change(nameFilter, { target: { value: seededPerk.title } });

    // Verify filtered result is shown
    expect(await screen.findByText(seededPerk.title)).toBeInTheDocument();

    // Summary text should reflect filtered state
    expect(screen.getByText(/showing/i)).toHaveTextContent('Showing');
  });

  test('lists public perks and responds to merchant filtering', async () => {
    const seededPerk = global.__TEST_CONTEXT__.seededPerk;


    renderWithRouter(
      <Routes>
        <Route path="/explore" element={<AllPerks />} />
      </Routes>,
      { initialEntries: ['/explore'] }
    );

    // Wait for perks to load
    const perkCard = await screen.findByText(seededPerk.title);
    expect(perkCard).toBeInTheDocument();

    // Wait for merchant options to render
    const merchantSelect = await screen.findByRole('combobox');

    // Select the seeded merchant
    fireEvent.change(merchantSelect, { target: { value: seededPerk.merchant.name } });

    // Wait for filtered results
    expect(await screen.findByText(seededPerk.title)).toBeInTheDocument();

    // Verify summary reflects filtered state
    expect(screen.getByText(/showing/i)).toHaveTextContent('Showing');
  });
});