import React from "react";
import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props){ super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error){ return { hasError: true, error }; }
  componentDidCatch(error, info){ console.error("ErrorBoundary", error, info); }
  render(){
    if (this.state.hasError) return <main className="max-w-3xl mx-auto p-6">Something went wrong.</main>;
    return this.props.children;
  }
}

