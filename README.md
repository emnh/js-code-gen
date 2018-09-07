# js-code-gen
JavaScript Code Generation Library

# Glossary
 - JPC: Program code, target, 1st level output
 - JGC: Generator code, source, 2nd degree generator

# Vague Ideas
 - Expression builder
 - Meta-level code generation
 - Refactoring panacea
 - Dependent typing
 - Two-stage compilation
 - Degree 2 macro language
 - JavaScript syntax
 - Programming language library without syntax, piggybacking on JavaScript, so no compiler necessary
 - Typed API generation from running examples
 - Output can be strongly typed
 - Is type inference (Hindley-Milner algo or such) necessary, or will it be a natural consequence of 2nd degree PL?
 - Too lazy to implement type inference, so piggyback on existing language (ReasonML?)
 - Change oriented
 - Propagation of changed values
 - Append only?
 - Record polymorphism for joins (implicit function calls)

# Goals or less vague ideas
 - Propagate arguments from top level into deeply nested functions
 - Immutable state tree aka redux
 - Program evolution via versioned immutable state tree
 - Persistence to localStorage
 - Handling of generated data, JS objects, WebGL context and state outside of immutable state tree
 - Versioned functions for runtime behavior switching
 - Generation of UI for switching between compatible versioned functions to create a combinatorially explosive visualization modifier
 - Free (no performance impact) records
 - Hot reloading with idempotent re-execution
 - Abstract enough to compile to WebAssembly via C (at least a subset for perf-sensitive parts), JavaScript, TypeScript
 - Live code editing
 - Integration of GLSL and JavaScript, easily pass uniforms and attributes
 - Gradual transition from literal vanilla JS to iteratively building AST.
