import React from './react.js';

const isListener = (key) => /^on[A-Z]/.test(key);

const createDomNode = (node, path, usedPaths, instances, rerender) => {
  if (node === null || node === undefined || node === false) return document.createTextNode('');
  if (typeof node === 'string' || typeof node === 'number') return document.createTextNode(node);

  if (Array.isArray(node)) {
    const fragment = document.createDocumentFragment();
    node.forEach((child, index) => {
      fragment.appendChild(createDomNode(child, `${path}.${index}`, usedPaths, instances, rerender));
    });
    return fragment;
  }

  if (node.type === React.Fragment) {
    return createDomNode(node.props.children || [], path, usedPaths, instances, rerender);
  }

  if (typeof node.type === 'function') {
    const instancePath = `${path}.c`;
    let instance = instances.get(instancePath);
    if (!instance) {
      instance = {
        path: instancePath,
        hooks: [],
        effects: [],
        pendingEffects: new Set(),
        scheduleUpdate: () => rerender(),
      };
      instances.set(instancePath, instance);
    } else {
      instance.scheduleUpdate = () => rerender();
    }

    usedPaths.add(instancePath);
    React.__internals.beginComponent(instance);
    const rendered = node.type({ ...(node.props || {}), children: node.props?.children });
    React.__internals.endComponent();
    return createDomNode(rendered, instancePath, usedPaths, instances, rerender);
  }

  const element = document.createElement(node.type);
  const { children = [], ...props } = node.props || {};
  Object.entries(props).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (isListener(key) && typeof value === 'function') {
      const eventName = key.slice(2).toLowerCase();
      element.addEventListener(eventName, value);
      return;
    }
    if (key === 'className') {
      element.setAttribute('class', value);
      return;
    }
    element.setAttribute(key, value);
  });

  const childArray = Array.isArray(children) ? children : [children];
  childArray.forEach((child, index) => {
    element.appendChild(createDomNode(child, `${path}.${index}`, usedPaths, instances, rerender));
  });

  return element;
};

const runEffects = (usedPaths, instances) => {
  usedPaths.forEach((path) => {
    const instance = instances.get(path);
    if (!instance || instance.pendingEffects.size === 0) return;
    instance.pendingEffects.forEach((idx) => {
      const effect = instance.effects[idx];
      if (!effect) return;
      if (typeof effect.cleanup === 'function') {
        try {
          effect.cleanup();
        } catch (error) {
          console.error('Ошибка при очистке эффекта', error);
        }
      }
      try {
        const cleanup = effect.callback();
        effect.cleanup = typeof cleanup === 'function' ? cleanup : undefined;
      } catch (error) {
        console.error('Ошибка в useEffect', error);
      }
    });
    instance.pendingEffects.clear();
  });
};

const cleanupOrphanEffects = (usedPaths, instances) => {
  for (const [path, instance] of [...instances.entries()]) {
    if (usedPaths.has(path)) continue;
    (instance.effects || []).forEach((effect) => {
      if (typeof effect?.cleanup === 'function') {
        try {
          effect.cleanup();
        } catch (error) {
          console.error('Ошибка при очистке эффекта', error);
        }
      }
    });
    instances.delete(path);
  }
};

export const createRoot = (container) => {
  if (!container) throw new Error('Не найден контейнер для рендера');

  const instances = new Map();
  let currentTree = null;

  const rerender = () => {
    if (!currentTree) return;
    render(currentTree);
  };

  const render = (node) => {
    currentTree = node;
    const usedPaths = new Set();
    const dom = createDomNode(node, 'root', usedPaths, instances, rerender);
    container.innerHTML = '';
    container.appendChild(dom);
    cleanupOrphanEffects(usedPaths, instances);
    runEffects(usedPaths, instances);
  };

  return { render };
};

export default { createRoot };
