// Space advances only presenter-led builds. It never submits a form or changes slides.
export function advanceAnimation(scene) {
  const click = selector => {
    const button = scene.querySelector(selector);
    if (!button || button.disabled || button.hidden) return false;
    button.click();
    return true;
  };
  if (scene.classList.contains('scene-consolidation')) {
    if (scene.querySelector('[data-view="0"][aria-pressed="true"]')) {
      return click('[data-view="1"]');
    }
    return click('[data-add-step]');
  }
  for (const selector of ['[data-wc-next]', '[data-reveal]', '[data-next-teaching]', '[data-trust]']) {
    if (scene.querySelector(selector)) return click(selector);
  }
  if (scene.classList.contains('scene-llm')) {
    if (scene.querySelector('[data-llm-output] small')) return false;
    return click('[data-generate]');
  }
  if (scene.classList.contains('scene-testing')) {
    if (scene.querySelector('[data-test-result]')?.textContent !== '—') return false;
    return click('[data-self-test]');
  }
  // Click-driven diagrams, comparisons and timelines already define their own animations.
  for (const attribute of ['data-journey', 'data-project', 'data-category', 'data-block', 'data-architecture', 'data-responsibility', 'data-before', 'data-dimension', 'data-day']) {
    const buttons = [...scene.querySelectorAll(`[${attribute}]`)];
    if (!buttons.length) continue;
    const current = buttons.findIndex(button => button.getAttribute('aria-pressed') === 'true');
    const next = buttons[current + 1];
    if (!next || next.disabled) return false;
    next.click();
    return true;
  }
  return false;
}
