### Conceptual Exercise

Answer the following questions below:

- What is RESTful routing?
"RESTful routing" is a paradigm of conventions by which different internet computer systems can communicate with each other. It offers a standardized structure for creating, reading, 
updating and deleting (CRUD) resources by mapping the HTTP verbs (GET, POST, PUT, DELETE etc) to specific actions.

- What is a resource?
A 'resource' is anything in a system that can be reached by an API to be manipulated in some way. 

- When building a JSON API why do you not include routes to render a form that when submitted creates a new user?
With a JSON API, the intent is to have a machine-readable interface for clients (which are generally other tech: applciations or services.) A form is indictave of front-end/client side application, whereas a JSON API should only e focused on the process and return of JSON data.

- What does idempotent mean? Which HTTP verbs are idempotent?
"Idempotency" refers to the potential for an outcome to be the same no matter how many times an operation is performed. GET, PUT, DELETE, HEAD, OPTIONS and TRACE are idempotent.

- What is the difference between PUT and PATCH?
PUT is idempotent and replaces the entire resource.
PATCH is not idempotent and (generally) replaces part of the resource.

- What is one way encryption?
"Hashing", transforms data into a fixed-length, unique representation that cannot be reversed. This means that if the hashed data is compromised, the encrypted information still cannot be retrieved.
- What is the purpose of a `salt` when hashing a password?
A 'salt' increases the security of an encryption process by adding a random string to the hashed password, meaning that even if two passwords are themselves identical, their encrypted forms are not.

- What is the purpose of the Bcrypt module?
Bcrypt itself is a hashing algorithm, the module is a library for enacting password hashing. The intent of bcrypt is that it be hard to 'brute-force' an attack.

- What is the difference between authorization and authentication?
Authentication verifies user or system identity.
Authorization determines what actions said user or system can access.