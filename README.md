# WEB103 Project 4 - Click & Clack Keyboard Customizer

Submitted by: **Izayah Rahming**

About this web app: **Click & Clack is a full-stack custom keyboard builder. Users can select various mechanical keyboard components (cases, switches, and keycaps) to create their dream setup. The app features dynamic pricing and a community gallery where users can view, edit, and delete submitted builds.**

Time spent: **10** hours

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses React to display data from the API.**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `custom_keyboards` table.**
  - [ ] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [ ] **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM custom_keyboards;' to display your table contents.**
- [x] **Users can view multiple features of the keyboard they can customize (Case, Switches, Keycaps).**
- [x] **Each customizable feature has multiple options to choose from (e.g., Obsidian Black, Glacier White, etc.).**
- [x] **The price of the keyboard changes dynamically as different options are selected.**
- [x] **The visual interface changes in response to at least one customizable feature (Dynamic price display and selection state).**
- [x] **The user can submit their choices to save the item to the list of created keyboards.**
- [x] **Users can view a list of all submitted keyboards.**
- [x] **Users can edit a submitted keyboard from the list view or detail page.**
- [x] **Users can delete a submitted keyboard from the list view or detail page.**
- [x] **Users can update or delete keyboards that have been created from the detail page.**

The following **optional** features are implemented:

- [ ] Selecting particular options prevents incompatible options from being selected even before form submission (e.g., certain switches only fitting certain cases).

## Video Walkthrough

Here's a walkthrough of implemented required features:

![ezgif-497669b37e233162](https://github.com/user-attachments/assets/5135e9e8-0093-4b63-8604-0ee0f47af969)


GIF created with **ScreenToGif** ## Notes

### Challenges Encountered:
* **Database Connection (409 Conflict):** One of the biggest hurdles was resolving a `409 Conflict` error during the fetch process. This was traced back to an incorrect pathing issue for the `.env` file when running the server via `concurrently`. 
* **PostgreSQL Networking:** Encountered a `3D000` error (database does not exist) which required deep-diving into the Render dashboard to ensure the `PGDATABASE` environment variable perfectly matched the generated internal name.
* **State Management:** Ensuring the `useEffect` hook correctly recalculated the total price every time a user toggled a radio button without causing infinite re-renders.

## License

Copyright [2026] [Izayah Rahming]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
