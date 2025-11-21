# Clean Architecture-inspired React Application with MVVM

Example code from the conference talk *Developing a Clean Architecture-inspired React Application with MVVM*
demonstrating how to structure a React application using Clean Architecture principles with MVVM as a complementary
pattern.

## What is this?

This is a to-do application that shows Clean Architecture and MVVM in action. Let's be upfront: you would never build a
to-do app like this in the real world. The architectural overhead is completely unjustified for something this simple. A
few components and some state management would do the job just fine.

So why does this exist? Because a to-do app is easy to understand without getting lost in complex business logic, which
makes it useful for learning these patterns. The real value of Clean Architecture shows up when you're dealing with
multiple user types requiring different permissions, systems integrating with several external APIs, or projects where
business rules frequently change and affect multiple parts of the application.

Think of this as a reference implementation that demonstrates the patterns clearly. The architecture is overkill here,
but the same structure scales to handle actual complexity.

## Features

The application covers basic CRUD operations:

- Display a list of to-do's
- Create a new to-do
- Update an existing to-do
- Delete a to-do

These operations represent the foundation of data management in most applications, from simple tools to complex
enterprise systems.

## How it works

This template follows Clean Architecture's layered structure where dependencies flow inward. The outer layers know about
the inner layers, but not vice versa. Here's how the pieces fit together:

**Domain Layer** (innermost, most abstract):

- `Todo` entity - core business object
- `ITodoRepository` interface - contract for data access
- Use cases - application business rules (Get Todos, Create Todo, Update Todo, Delete Todo)

**Interface Adapters**:

- ViewModels - handle presentation logic and coordinate between Views and use cases
- Repository implementation - implements the `ITodoRepository` interface

**Frameworks & Drivers** (outermost, most specific):

- React Views - UI components
- Local storage - data persistence
- React Router - navigation

The ViewModel sits between the View and the domain layer. It calls use cases, manages UI state, and handles presentation
logic. The View stays passive - it displays data and forwards user interactions to the ViewModel without containing
business logic.

## Repository Structure

```
├── src
│   ├── adapter           # implements domain contracts
│   │   └── repository
│   ├── data              # data sources
│   │   └── todoLocalStorageDataSource.ts
│   ├── di                # Awilix container & registrations
│   │   └── container.ts
│   ├── domain            # enterprise & application business rules
│   │   ├── model
│   │   │   └── Todo.ts
│   │   ├── repository
│   │   │   └── ITodoRepository.ts
│   │   └── useCases
│   │       └── todo
│   │           ├── createTodoUseCase.ts
│   │           ├── deleteTodoUseCase.ts
│   │           ├── getTodoUseCase.ts
│   │           ├── getTodosUseCase.ts
│   │           └── updateTodoUseCase.ts
│   ├── presenter         # React-specific presentation layer
│   │   ├── components
│   │   │   ├── atoms
│   │   │   └── molecules
│   │   └── pages
│   │       ├── CreateTodo
│   │       ├── TodoDetails
│   │       └── TodoList
│   ├── App.tsx
│   └── main.tsx
```

The folder structure maps directly to Clean Architecture layers. The `domain` folder contains your business logic and is
independent of React, local storage, or any other external dependency. The `adapter` folder implements the contracts
defined in `domain`. The `presenter` folder contains React-specific code that depends on everything else but nothing
depends on it.

## Why MVVM with Clean Architecture?

MVVM provides clear guidelines for separating UI concerns from business logic in the presentation layer. The ViewModel
abstracts the UI from business logic, keeping them decoupled. This separation makes components easier to test since you
can test the ViewModel independently from React components.

The pattern also supports dependency injection, which is critical for maintaining Clean Architecture's Dependency
Inversion Principle. You can swap implementations without changing business logic - replace local storage with an API,
or React with Angular, without touching your use cases or entities.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/spaceteams/clean-architecture-inspired-react-template.git
cd clean-architecture-inspired-react-template
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

The app was set up using Vite. We chose Vite over Create React App because CRA's development has ceased, and Vite offers
faster builds, better performance, and modern JavaScript support out of the box.

## Conference Talk

The code in this repository comes from the talk *Developing a Clean Architecture-inspired React Application with MVVM*.

**Watch the talk:**

- [Short version (20 min)](https://www.youtube.com/watch?v=v3HkasWQppk) - condensed version covering the key concepts
- [Extended version (45 min)](https://www.youtube.com/watch?v=c8Jq7fNPiXY) - full talk with detailed explanations

## Blog Series

For a detailed written explanation of the concepts from the talk, check out this 5-part blog series:

1. [The Multifaceted Issues of Software Development](https://www.spaceteams.de/en/insights/the-multifaceted-issues-of-software-development) -
   common problems like code duplication, tight coupling, and scalability challenges

2. [Clean Architecture: A Deep Dive into Structured Software Design](https://www.spaceteams.de/en/insights/clean-architecture-a-deep-dive-into-structured-software-design) -
   how Clean Architecture works and why it matters

3. [How Clean Architecture Solves Common Software Development Challenges](https://www.spaceteams.de/en/insights/how-clean-architecture-solves-common-software-development-challenges) -
   practical benefits of using layered architecture

4. [MVVM as a Complementary Pattern for Clean Architecture Applications](https://www.spaceteams.de/en/insights/mvvm-as-a-complementary-pattern-for-clean-architecture-applications) -
   why MVVM works well as a presentation layer within Clean Architecture

5. [Developing a Clean Architecture-inspired React Application with MVVM](https://www.spaceteams.de/en/insights/developing-a-clean-architecture-inspired-react-application-with-mvvm) -
   step-by-step implementation guide

## When to use this approach

This architecture makes sense when you're building:

- Applications with complex business rules that change frequently
- Systems that need to integrate with multiple external APIs
- Projects with multiple user types requiring different permissions
- Long-lived applications where maintainability matters more than initial development speed

For simpler projects, this is overkill. A straightforward component structure with some state management will serve you
better. The complexity trade-off needs to make sense for your specific situation.

## Questions?

Feel free to reach out at [moin@spaceteams.de](mailto:moin@spaceteams.de)

***

**License:** MIT
