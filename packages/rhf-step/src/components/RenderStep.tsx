'use client';

import { useFormContext } from "../contexts/FormContext";

export function RenderStep() {
  const { Component } = useFormContext()
  if (!Component) {
    throw new Error("No component to display")
  }
  return <Component />
}