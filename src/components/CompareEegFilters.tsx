'use client';

import { useEffect } from 'react';

export default function CompareEegFilters({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;

    const rows = Array.prototype.slice.call(
      root.querySelectorAll('tr[data-id]'),
    ) as HTMLTableRowElement[];
    const chips = Array.prototype.slice.call(
      root.querySelectorAll('.chip[data-need]'),
    ) as HTMLButtonElement[];
    const clearNode = root.querySelector('#clear');
    const countNode = root.querySelector('#count');
    if (!(clearNode instanceof HTMLButtonElement) || !countNode) return;
    const clearButton: HTMLButtonElement = clearNode;
    const countEl: Element = countNode;

    const total = rows.length;
    const tests: Record<string, (row: HTMLTableRowElement) => boolean> = {
      ch16: (row) => Number(row.dataset.ch) >= 16,
      rate: (row) => Number(row.dataset.rate) >= 500,
      raw: (row) => row.dataset.raw === '1',
      open: (row) => row.dataset.open === '1',
      bio: (row) => row.dataset.bio === '1',
      wireless: (row) => row.dataset.wireless === '1',
      now: (row) => row.dataset.now === '1',
    };

    function update() {
      const active = chips
        .filter((chip) => chip.getAttribute('aria-pressed') === 'true')
        .map((chip) => chip.dataset.need || '');
      let match = 0;
      let ours = 0;
      rows.forEach((row) => {
        const ok = active.every((need) => tests[need]?.(row));
        row.classList.toggle('dim', active.length > 0 && !ok);
        if (ok) {
          match += 1;
          if (row.classList.contains('us-row')) ours += 1;
        }
      });
      clearButton.hidden = active.length === 0;
      if (!active.length) countEl.textContent = `Showing all ${total} devices.`;
      else if (!match) {
        countEl.textContent =
          'No device meets every need. Remove one to see the closest options.';
      } else {
        countEl.textContent = `${match} of ${total} devices match, ${ours} of them from PiEEG.`;
      }
    }

    const onChipClick = (event: Event) => {
      const chip = event.currentTarget as HTMLButtonElement;
      chip.setAttribute(
        'aria-pressed',
        chip.getAttribute('aria-pressed') === 'true' ? 'false' : 'true',
      );
      update();
    };
    const onClear = () => {
      chips.forEach((chip) => chip.setAttribute('aria-pressed', 'false'));
      update();
    };

    chips.forEach((chip) => chip.addEventListener('click', onChipClick));
    clearButton.addEventListener('click', onClear);
    return () => {
      chips.forEach((chip) => chip.removeEventListener('click', onChipClick));
      clearButton.removeEventListener('click', onClear);
    };
  }, [rootId]);

  return null;
}
