import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '../test/render';

import { TodoItem } from './TodoItem';

const baseTodo = { createdAt: 1000, done: false, id: '1', text: 'Buy milk' };

describe('TodoItem', () => {
  it('renders the todo text', () => {
    renderWithProviders(<TodoItem onRemove={vi.fn()} onToggle={vi.fn()} todo={baseTodo} />);
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
  });

  it('text has no strikethrough when todo is not done', () => {
    renderWithProviders(<TodoItem onRemove={vi.fn()} onToggle={vi.fn()} todo={baseTodo} />);
    expect(screen.getByText('Buy milk')).not.toHaveStyle({ textDecoration: 'line-through' });
  });

  it('text has strikethrough when todo is done', () => {
    renderWithProviders(
      <TodoItem onRemove={vi.fn()} onToggle={vi.fn()} todo={{ ...baseTodo, done: true }} />,
    );
    expect(screen.getByText('Buy milk')).toHaveStyle({ textDecoration: 'line-through' });
  });

  it('calls onToggle with the todo id when the checkbox is clicked', async () => {
    const onToggle = vi.fn();
    renderWithProviders(<TodoItem onRemove={vi.fn()} onToggle={onToggle} todo={baseTodo} />);

    // Chakra's Checkbox.Root (Ark UI) uses a pointer-event state machine.
    // fireEvent.click/change alone don't trigger onCheckedChange in jsdom —
    // userEvent.click fires the full pointer → mouse → click sequence it expects.
    await userEvent.click(screen.getByRole('checkbox'));

    expect(onToggle).toHaveBeenCalledWith('1');
  });

  it('calls onRemove with the todo id when the remove button is clicked', () => {
    const onRemove = vi.fn();
    renderWithProviders(<TodoItem onRemove={onRemove} onToggle={vi.fn()} todo={baseTodo} />);

    fireEvent.click(screen.getByRole('button', { name: 'Remove task' }));

    expect(onRemove).toHaveBeenCalledWith('1');
  });

  it('checkbox is checked when todo is done', () => {
    renderWithProviders(
      <TodoItem onRemove={vi.fn()} onToggle={vi.fn()} todo={{ ...baseTodo, done: true }} />,
    );
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('checkbox is unchecked when todo is not done', () => {
    renderWithProviders(<TodoItem onRemove={vi.fn()} onToggle={vi.fn()} todo={baseTodo} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});
