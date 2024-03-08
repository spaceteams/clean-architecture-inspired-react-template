# Clean Architecture inspired React application with MVVM template

[![Developed during Spacetime at Spaceteams](https://raw.githubusercontent.com/spaceteams/badges/main/developed-during-spacetime.svg)](https://spaceteams.de)

This repository contains a simple, clean architecture-inspired TODO React application. Use this repository as
inspiration, browse it, and refer to it when setting up your next React application with clean architecture in mind.
<br />
You can use it as a starter template for your next app.

## TL;DR

You don't want to read all the following stuff to understand clean architecture, its benefits, or why you should choose
it to set up your next React application?
Also, where and why does MVVM come into play, and what is this anyway?

**We've got you covered!**

Our colleague [Marc](mailto:marc.brehmer@spaceteams.de) used a prior and more basic version of this repository during
his talk at the [code.talks 2023](https://codetalks.de/).
In his talk `Developing a clean architecture-inspired React application with MVVM`, he explained the benefits of using
clean architecture, what MVVM is, and why it's a good choice to set up a clean architecture-inspired React application
and explained the code.

Here is a recording of the conference talk:

[![https://www.youtube.com/watch?v=v3HkasWQppk](https://img.youtube.com/vi/v3HkasWQppk/0.jpg)](https://www.youtube.com/watch?v=v3HkasWQppk)

The slides are available [here](./slides/Developing%20a%20clean%20architecture-inspired%20React%20application%20with%20MVVM.pdf).

We also plan to release a blog post based on the conference talk. Once it's published, we will provide the link here.

## Info

The application in the repository was set up using vite, and the tests were written with vitest.

### Why have we used vite to set up this application?

We chose Vite over Create React App (CRA) for our React setup due to performance gains, React team recommendations, and
the ecosystem's evolution. CRA's development has ceased, prompting a shift to tools that better handle customization,
optimization, and large projects. Vite excels with faster builds, modern JavaScript support, and a growing community,
making it a fitting choice for us, though your project's requirements may warrant different tools.

## Why should I choose clean architecture for developing my next React application?

Software development can be complex, with challenges such as code duplication, inconsistencies, and tight coupling.
These can hinder scalability, maintainability, and flexibility. However, adopting an architectural pattern like clean
architecture can mitigate these issues. Clean architecture promotes separation of concerns, modularity, and abstraction,
leading to scalable, maintainable applications with easier migrations and component replacement. The following will
introduce the clean architecture and Model-View-ViewModel (MVVM) patterns and their application in developing a React
application.

## Clean Architecture

Clean architecture is a software architecture pattern proposed
by [Robert C. Martin (aka. Uncle Bob)](https://cleancoder.com/) that was derived from other architectural guidelines
like hexagonal architecture, onion architecture, etc.

![Clean Architecture Diagram](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)
[Source: [Robert C. Martin (Uncle Bob) - The Clean Code Blog](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)]

Clean Architecture is a design principle that enhances software maintainability, testability, and adaptability by
separating core functionality from external dependencies. At its heart are business rules, the essential logic defining
system behavior. This architecture promotes maintainability through clear layer separation, allowing changes to specific
layers without affecting the whole system. It improves testability by isolating core logic from external dependencies
and simplifying unit and integration testing. Lastly, it enhances adaptability, making it easier to meet new
requirements or adopt new technologies. Thus, Clean Architecture is a powerful tool for creating robust, flexible, and
testable software systems.

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
data formats and implementing interfaces for triggering use cases. It houses presenters, views, and controllers and is
subject to change with evolving external requirements or technologies.

#### Frameworks & Drivers

The Frameworks & Drivers layer, housing external frameworks, and libraries, serves as the glue code for the Clean
Architecture pattern. It isolates infrastructure details, allowing easy component replacement without affecting the
application. This layer, providing system access to external resources, is volatile and subject to frequent changes due
to updates in these resources.

### From Abstract to Specific

The Entities layer is the most general or abstract. The more you move outwards, the more concrete or specific the layers
will get.
The clean architecture cone, which you can see in the following image, illustrates this well.

![Clean Architecture Cone](https://www.codingblocks.net/wp-content/uploads/2018/02/The-Clean-Architecture-Cone.jpg)
[Source: [Michael Outlaw - Clean Architecture – Make Your Architecture Scream](https://www.codingblocks.net/podcast/clean-architecture-make-your-architecture-scream/)]

The Clean Architecture cone illustrates the separation from the abstract, stable Entities layer at the core to the more
concrete, frequently changing outer layers like Frameworks & Drivers. This structure enhances modularity and
reusability, as the core business logic is independent of external technologies and can be applied across different
systems. It also improves maintainability, as changes in one layer seldom impact others, simplifying system
modifications. Testability benefits from this separation, allowing the core logic to be tested in isolation from
external dependencies. The architecture's adaptability also facilitates easy updates or technology shifts without
altering the core logic. Finally, the clear delineation of responsibilities across layers aids in understanding and
modifying the system, making it more understandable and manageable.

### Crossing Boundaries

As you have noticed while looking at the clean architecture diagram, arrows point from the outside to the inside.

In Clean Architecture, control flows inward, with outer layers aware of inner layers but not vice versa. For instance,
use cases are aware of entities but not vice versa. Interfaces are used to facilitate interaction across layers,
adhering to the Dependency Inversion Principle. For example, an email-sending interface in the Interface Adapters layer
allows the Use Cases layer to send emails without knowing the implementation details. This enables the same Use Cases
layer to be used with different email providers in other systems, showcasing the architecture's modularity and
reusability. Dependency injection is employed to maintain this separation and ease maintenance.

## Using MVVM to create a clean architecture-inspired React application

We previously learned that using clean architecture as our architectural pattern of choice is beneficial when developing
an application since it separates our system's core business logic from its external dependencies and makes it more
maintainable, testable, and adaptable to change.
To create a clean architecture-inspired React application, we utilize the MVVM pattern. The MVVM pattern aligns with the
clean architecture principles by separating the user interface from the business logic. This makes our code more modular
and reusable. Also, it will be easier to test our components in isolation.

### MV* Patterns

The MVVM pattern is part of the well-known MV* patterns. The MV* patterns are a group of software design patterns that
promote a clear separation of concerns.
The group's most popular patterns are Model-View-Controller (MVC), Model-View-ViewModel (MVVM), and
Model-View-Presenter (MVP).

The group's oldest and most widely used pattern is the MVC pattern, which was introduced in the 1970s. It separates a
system into the following three components:

* **Model:** The Model represents the data of the system.
* **View:** The View displays the data from the Model to the user.
* **Controller:** The Controller handles the user input and updates the Model and view accordingly.

The other MV* patterns are structured similarly but have peculiarities. In general, they share the following
characteristics:

* They all promote a clear separation of concerns, which makes the code more modular and reusable. It also eases testing
  of the different components of the system by enabling us to test them in isolation.
* They all use a Model-View separation, meaning that the system's data is kept separate from the code that displays it.
* They all use a Controller or Presenter to handle user input and update the Model and View accordingly.

The overall goals of the MV* patterns are:

* A clear separation of concerns
* Make the code more modular and reusable
* Make the code easier to test
* Make the code more maintainable
* Make the code more adaptable to changes

### The MVVM Pattern

The MVVM pattern is a newer addition to the MV* patterns and was introduced by Microsoft in the early 2000s. It is a
more modern take on the MVC pattern that replaced the Controller with a new ViewModel component. The pattern consists of
the following components:

![MVVM Pattern](https://cdn1.vogel.de/unsafe/1000x0/smart/images.vogel.de/vogelonline/bdb/1364000/1364019/original.jpg)
[Source: [T. Drilling & S. Augsten - Durchblick im JavaScript-Ökosystem](https://www.dev-insider.de/durchblick-im-javascript-oekosystem-a-693026/)]

* **Model:** The Model represents the system's data and business logic. It is responsible for storing and managing the
  data.
* **View:** The View is responsible for displaying the data from the Model to the user and sending the user input back
  to the ViewModel.
* **ViewModel:** The ViewModel bridges the Model and the View. It exposes the data from the Model to the View, and it
  handles user interactions and processes them into actions on the Model.

### Why is MVVM a good fit to create a clean architecture-inspired React application?

The MVVM pattern is well-suited for a clean architecture-inspired React application as it enforces separation of
concerns, dividing UI (View), presentation logic (ViewModel), and data (Model). This separation enhances code modularity
and testability, allowing for isolated component testing. MVVM's ViewModel abstracts the UI from business logic,
aligning with clean architecture's principles by keeping UI and business concerns distinct. It also ensures a controlled
data flow from ViewModel to View, centralizing presentation logic and business rules. Furthermore, MVVM supports
dependency injection, a critical clean architecture principle that enables the decoupling of components for greater
maintainability and adaptability and upholds the Dependency Inversion Principle.

## Template

This template consists of a simple TODO application. Since this is a relatively simple example, some parts or components
of the application may be fairly basic. For instance, the use cases are very simple and will only call corresponding
repository methods and return the result of these method calls. Of course, Use Cases can be more complex. For example,
they may call different repositories and may map data. The example application is only a basic template for creating
your clean architecture-inspired React application.

### Example: TODO App - Features

The TODO application's features are:

* Get and display a list of Todos
* Create a new Todo
* Update an existing Todo
* Delete an existing Todo

### Which part of the application belongs to what layer of clean architecture?

Since this template's TODO application is a clean architecture-inspired React application, let us look at which part of
the app belongs to which layer of clean architecture. As previously mentioned, clean architecture consists of four
different layers. The inner one is the most abstract or
general, and the more we move outward, the more specific the layers get and the more frequently they change.

The following list will give us an overview of which part of our application belongs to what layer of clean
architecture:

**Entities (Enterprise Business Rules):**

* Todo

**Use Cases (Application Business Rules):**

* Get Todos Use Case
* Get Todo Use Case
* Create Todo Use Case
* Update Todo Use Case
* Delete Todo Use Case

**Interface Adapters:**

* Presenters
    * Todo List View & ViewModel
    * Create Todo View & ViewModel
    * Todo Details View & ViewModel
* Todo Repository

**Frameworks & Drivers:**

* Todo Database / Store

As you can see, the application is clearly inspired by clean architecture and follows its structure and principles.

### Structure

If you look at this template's code and structure, you will see that its structure reflects the clean architecture
pattern.

As you can see, the `src` directory contains an `adapter` sub-folder that contains the repository `todoRepository`. The
sub-folder `data` includes the data source `todoLocalStorageDataSource`, in this case, the browser's local storage.
<br />
Below `data,` you can see a folder `di`. This folder contains the container used for dependency injection.
Furthermore, you can see a `domain` folder. In this folder, you can find the `Todo` entities, the interface of the
repository, and the use cases, for example, the Create Todo Use Case `createTodoUseCase.`
<br />
Finally, the folder, `presenter`, contains the presenter. You can see a sub-folder `pages` here. This folder includes
all the application's pages, namely the `CreateTodo` page, the `TodoDetails` page, and the `TodoList` page. Each
sub-folder of `pages` contains a View and a ViewModel. For example, the `TodoList` folder contains the
View `TodoList` and the ViewModel `TodoListViewModel`.
<br />
The folder `presenter` also contains a sub-folder `components`. This folder is structured by following the Atomic Design
principles. You can learn more about Atomic Design [here](https://atomicdesign.bradfrost.com/). In our case,
the `components` folder contains the folders `atoms` and `molecules`. `atoms` are the smallest parts and simplest
components of an application. For example, a button is an `atom`. `molecules` are more complex components that consist
of multiple `atoms`. In our case, we have a `List` component. This list consists of multiple list items. The list items
are `atoms`. Depending on how complex the list items are, they could be themself `molecules`, and the list would then be
an `organism`. Atomic Design furthermore knows `templates` and `pages`. But in the case of this TODO app, we don't need
such complex components.

## Conclusion

Software development faces challenges like code duplication, tight coupling, and maintenance difficulties. Adopting
architectural patterns like Clean Architecture and the MVVM pattern is beneficial to address these. Clean Architecture
separates business logic from external dependencies, enhancing maintainability, testability, and adaptability. It allows
for easier code maintenance, effective layer testing without external dependencies, and flexible design for new
requirements. The MVVM pattern, complementing Clean Architecture, divides UI (View) from presentation logic (ViewModel)
and data (Model), promoting modularity and simplifying testing. This approach enables independent ViewModel testing,
facilitates UI design changes without affecting business logic, and supports modular, maintainable, and adaptable
software development. Clean Architecture and MVVM offer a robust framework for creating high-quality applications.

For further inquiries, feel free to contact us at [moin@spaceteams.de](mailto:moin@spaceteams.de).
