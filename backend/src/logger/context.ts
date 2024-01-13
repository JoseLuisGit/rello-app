import { Namespace, createNamespace, getNamespace } from "cls-hooked";

const namespace = "RELLO_APP";

export function getContext(): Namespace | undefined {
  return getNamespace(namespace);
}

export function createContext(): Namespace {
  return createNamespace(namespace);
}

export function get(key: string): string | null {
  const context = getContext();
  if (!context?.active) {
    return null;
  }
  return context.get(key);
}

export function set(key: string, value: string): void {
  const context = getContext();
  if (!context?.active) {
    return;
  }
  context.set(key, value);
}

export default { getContext, createContext, get, set };
