const Fragment = Symbol('Fragment');

let currentInstance = null;

const beginComponent = (instance) => {
  currentInstance = instance;
  currentInstance.hookIndex = 0;
};

const endComponent = () => {
  currentInstance = null;
};

const isFunction = (value) => typeof value === 'function';

const shallowEqual = (a = [], b = []) => a.length === b.length && a.every((item, idx) => item === b[idx]);

const createElement = (type, props, ...children) => {
  const flatChildren = children.flat();
  return { type, props: { ...(props || {}), children: flatChildren } };
};

const useState = (initial) => {
  if (!currentInstance) throw new Error('useState must be used inside a component');
  const idx = currentInstance.hookIndex++;
  if (!currentInstance.hooks[idx]) {
    currentInstance.hooks[idx] = {
      kind: 'state',
      value: isFunction(initial) ? initial() : initial,
    };
  }
  const setState = (next) => {
    const nextValue = isFunction(next) ? next(currentInstance.hooks[idx].value) : next;
    if (Object.is(nextValue, currentInstance.hooks[idx].value)) return;
    currentInstance.hooks[idx].value = nextValue;
    currentInstance.scheduleUpdate();
  };
  return [currentInstance.hooks[idx].value, setState];
};

const useMemo = (factory, deps) => {
  if (!currentInstance) throw new Error('useMemo must be used inside a component');
  const idx = currentInstance.hookIndex++;
  const record = currentInstance.hooks[idx];
  if (!record || record.kind !== 'memo' || !shallowEqual(record.deps || [], deps || [])) {
    currentInstance.hooks[idx] = { kind: 'memo', value: factory(), deps: deps || [] };
  }
  return currentInstance.hooks[idx].value;
};

const useEffect = (effect, deps) => {
  if (!currentInstance) throw new Error('useEffect must be used inside a component');
  const idx = currentInstance.hookIndex++;
  const prev = currentInstance.effects[idx];
  const changed = !prev || !shallowEqual(prev.deps || [], deps || []);
  currentInstance.effects[idx] = { callback: effect, deps: deps || [], cleanup: prev?.cleanup };
  if (changed) {
    currentInstance.pendingEffects.add(idx);
  }
};

const React = {
  createElement,
  Fragment,
  useState,
  useEffect,
  useMemo,
  __internals: {
    beginComponent,
    endComponent,
  },
};

export { createElement, Fragment, useEffect, useMemo, useState };
export default React;
