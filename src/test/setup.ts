// @testing-library/jest-dom extends Vitest's expect with DOM-aware matchers:
// toBeInTheDocument, toBeDisabled, toHaveValue, toHaveStyle, toBeChecked, etc.
// Without this import, those matchers don't exist and tests throw "Invalid Chai property".
import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// After each test, unmount any React trees that renderHook/render created.
// Without this, components from one test can bleed state into the next.
afterEach(cleanup);
