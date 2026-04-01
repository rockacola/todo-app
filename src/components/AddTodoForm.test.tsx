import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '../test/render';

import { AddTodoForm } from './AddTodoForm';

describe('AddTodoForm', () => {
  it('submit button is disabled when input is empty', () => {
    renderWithProviders(<AddTodoForm onAdd={vi.fn()} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('submit button is enabled once the user types something', () => {
    renderWithProviders(<AddTodoForm onAdd={vi.fn()} />);
    fireEvent.change(screen.getByPlaceholderText('Add a task...'), {
      target: { value: 'Buy milk' },
    });
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('calls onAdd with trimmed text when the button is clicked', async () => {
    const onAdd = vi.fn().mockResolvedValue(undefined);
    renderWithProviders(<AddTodoForm onAdd={onAdd} />);

    fireEvent.change(screen.getByPlaceholderText('Add a task...'), {
      target: { value: '  Buy milk  ' },
    });
    fireEvent.click(screen.getByRole('button'));

    expect(onAdd).toHaveBeenCalledWith('Buy milk');
  });

  it('clears the input after submitting', async () => {
    const onAdd = vi.fn().mockResolvedValue(undefined);
    renderWithProviders(<AddTodoForm onAdd={onAdd} />);

    const input = screen.getByPlaceholderText('Add a task...');
    fireEvent.change(input, { target: { value: 'Buy milk' } });
    fireEvent.click(screen.getByRole('button'));

    expect(input).toHaveValue('');
  });

  it('calls onAdd when Enter is pressed', () => {
    const onAdd = vi.fn().mockResolvedValue(undefined);
    renderWithProviders(<AddTodoForm onAdd={onAdd} />);

    const input = screen.getByPlaceholderText('Add a task...');
    fireEvent.change(input, { target: { value: 'Buy milk' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onAdd).toHaveBeenCalledWith('Buy milk');
  });

  it('does not call onAdd for whitespace-only input', () => {
    const onAdd = vi.fn();
    renderWithProviders(<AddTodoForm onAdd={onAdd} />);

    const input = screen.getByPlaceholderText('Add a task...');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onAdd).not.toHaveBeenCalled();
  });
});
