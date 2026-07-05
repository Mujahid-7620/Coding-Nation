import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

describe('UI Components', () => {
  it('renders a button correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('renders a card correctly', () => {
    render(
      <Card>
        <CardContent>Card Content</CardContent>
      </Card>
    );
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });
});
