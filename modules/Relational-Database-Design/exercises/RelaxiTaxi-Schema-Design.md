# RelaxiTaxi-Schema-Design

Design the SQL schema for a taxi service called RelaxiTaxi

### The schema design should satisfy the following constraints:

- A driver should have a `name`, `email`, `status`(available/busy)
- A customer should have a `name`, `email`
- A customer can have multiple trips
- A trip has a `distance`, `date of trip`, `time`, `cost` and `driver` associated to it.

### Questions I should be able to answer with the design:

- How many drivers are available for pickup
- How many trips did a customer complete in the last 6 months?
- What is the average number of trips that a driver makes in a month?
