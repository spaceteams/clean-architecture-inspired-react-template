# Clean Architecture inspired React application with MVVM template

[![Developed during Spacetime at Spaceteams](https://raw.githubusercontent.com/spaceteams/badges/main/developed-during-spacetime.svg)](https://spaceteams.de)

This repository contains a simple clean architecture inspired TODO React application.
Use this repository as an inspiration and browse it and refer to it when setting up your next React application with
clean architecture in mind.
You can also simply use it as a starter template for your next app.

## TL;DR

You don't want to read all the following stuff to understand clean architecture, it's benefits or why you should choose
it to set up your next React application?
Also where and why comes MVVM into play and what is this anyway?

**We got you covered!**

A prior and more basic version of this repository was used by our colleque [Marc](mailto:marc.brehmer@spaceteams.de)
during his talk at the [code.talks 2023](https://codetalks.de/).
In this talk `Developing a clean architecture-inspired React application with MVVM`, he explained the benefits of using
clean architecture, what MVVM is and why it's a good choice to set up a clean architecture inspired React application
and explained the code.

Here is a recoding of the conference talk:

[![https://www.youtube.com/watch?v=v3HkasWQppk](https://img.youtube.com/vi/v3HkasWQppk/0.jpg)](https://www.youtube.com/watch?v=v3HkasWQppk)

You can find the slides on the homepage of
code.talks [here](https://codetalks.de/storage/files/slides/1696_de21819419e395eb58723114080ed621.pdf).

We are also planning to release a blog post based on the conference talk. Once it's published we will provide the link
here.

## Info

The application in the repository was setup using vite and the tests were written with vitest.

### Why have we used vite to set up this application? --> TODO --> Kürzen

In the past you might have used Create React App (CRA) to set up your React application and my ask yourself, why we have
choosen vite over it.
We have taken several considerations into account for this decision, like performance improvements, the recommendations
of the React team regarding CRS, and the evolution of the React ecosystem.
The disconitation of the development or CRA and the recommendation to switch to other tools was made to offer better
customization, performance optimization, and improved management of large-scale projects. While CRA was popular and a
popular tool to quickly set up a React project it faced
limitations and disadvantages for larger and more complex projects.
Vite offeres better build and development speed, supports modern JavaScript features and has a ever growing community
and is growing in popularity.
It was a good choice in our case. However, keep in mind, based on the needs of your project, other tools might be more
suitable.

## Why should I choose clean architecture for developing my next React application? --> TODO --> Kürzen

Developing software can be challenging. During the development of an application, you can face multiple issues like code
duplications, inconsistencies, testing complexity, and tight coupling.
These issues can lead to scalability challenges, difficulties in migrations, reduced maintainability, and an overall
lack of flexibility.

These issues can be avoided by following an architectural pattern, like clean architecture. Clean architecture promotes
a clear separation of concerns and has clear boundaries between its layers.
This helps us to avoid tight couplings, for example. Clean architecture also emphasizes modularity, organization, the
use of consistent patterns, design principles, and abstraction.
By developing an application following this pattern, it becomes scalable, migrations become more manageable, the
application is easier to maintain, and you can easily replace components or even switch to a new technology.
Overall, we are more flexible during development by following the clean architecture pattern.

In the following you will lean about the clean architecture pattern, the MVVM pattern and how to utilize it to develop
clean architecture-inspired React application.

## Clean Architecture

Clean architecture is a software architecture pattern proposed
by [Robert C. Martin (aka. Uncle Bob)](https://cleancoder.com/) that was derived from other architectural guidelines
like hexagonal architecture, onion architecture, etc.

![Clean Architecture Diagram](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)
(Source: [Robert C. Martin (Uncle Bob) - The Clean Code Blog](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html))

Clean Architecture is a design principle that enhances software maintainability, testability, and adaptability by
separating core functionality from external dependencies. At its heart are business rules, the essential logic defining
system behavior. This architecture promotes maintainability through clear layer separation, allowing changes to specific
layers without affecting the whole system. It improves testability by isolating core logic from external dependencies,
simplifying unit and integration testing. Lastly, it enhances adaptability, making it easier to meet new requirements or
adopt new technologies. Thus, Clean Architecture is a powerful tool for creating robust, flexible, and testable software
systems.

As you can see in the diagram, the pattern consists of different layers. Let's take a look at these layers in the
following.

### Layers

#### Entities

The Entities layer is the heart of Clean Architecture, encapsulating the core business logic and rules through domain
objects. Its isolation ensures maintainability and testability, allowing changes in other layers without impacting the
business logic. This modularity enhances flexibility and reusability across different systems.

#### Use Cases

The Use Cases layer defines the application's business actions and rules, detailing system behavior in response to
external actor interactions.

#### Interface Adapters

The Interface Adapters layer serves as a bridge between the system's core logic and external environments, converting
data formats and implementing interfaces for triggering use cases. It houses presenters, views, and controllers, and is
subject to change with evolving external requirements or technologies.

#### Frameworks & Drivers

The Frameworks & Drivers layer, housing external frameworks and libraries, serves as the glue code for the Clean
Architecture pattern. It isolates infrastructure details, allowing easy component replacement without affecting the
application. This layer, providing system access to external resources, is volatile and subject to frequent changes due
to updates in these resources.

### From Abstract to Specific

The Entities layer is the most general or abstract. The more you move outwards, the more concrete or specific the layers
will get.
The clean architecture cone, which you can see in the following image, illustrates this well.

![Clean Architecture Cone](https://www.codingblocks.net/wp-content/uploads/2018/02/The-Clean-Architecture-Cone.jpg)
(Source: [Michael Outlaw - Clean Architecture – Make Your Architecture Scream](https://www.codingblocks.net/podcast/clean-architecture-make-your-architecture-scream/))

The Clean Architecture cone illustrates the separation from the abstract, stable Entities layer at the core to the more
concrete, frequently changing outer layers like Frameworks & Drivers. This structure enhances modularity and
reusability, as the core business logic is independent of external technologies and can be applied across different
systems. It also improves maintainability, as changes in one layer seldom impact others, simplifying system
modifications. Testability benefits from this separation, allowing the core logic to be tested in isolation from
external dependencies. Additionally, the architecture's adaptability facilitates easy updates or technology shifts
without altering the core logic. Finally, the clear delineation of responsibilities across layers aids in understanding
and modifying the system, making it more comprehensible and manageable.

### Crossing Boundaries

TODO

#########################################################
