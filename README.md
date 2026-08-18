# Charmony Admin Hub

Build Charmony / WETWALLPANEL2GO Admin Panel

Create the initial frontend structure and UI for a modern, professional Admin Panel for the Charmony / WETWALLPANEL2GO bathroom and kitchen visualisation application.

1. Important Project Context

The customer-facing mobile application is already being developed separately using Flutter.

The backend/API is also already being developed separately.

Therefore:

* DO NOT build the Flutter application.
* DO NOT build AR/ARKit/ARCore functionality.
* DO NOT build camera scanning or measurement algorithms.
* DO NOT create a new backend.
* DO NOT create a database.
* DO NOT implement real API integration yet.
* Use realistic mock data and clearly separated service/API files so the real backend can be connected later.
* Focus ONLY on creating the Admin Panel frontend structure, navigation, reusable components, responsive UI and mock-data based screens.

The Admin Panel will eventually consume the existing backend APIs.

⸻

2. Required Technology Stack

Use exactly:

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Lucide React icons

Use clean, reusable React components.

Do not use JavaScript. Use TypeScript throughout the project.

Keep the code modular and production-ready.

⸻

3. Visual Design Reference

Use the uploaded dashboard image as the primary visual inspiration.

The reference has:

* Dark navy left sidebar
* White/light main content area
* Clean dashboard cards
* Rounded cards
* Spacious layout
* Minimal borders
* Blue/purple accent colours
* Subtle shadows
* Clean modern typography
* Compact top navigation
* Data tables
* Analytics/dashboard cards
* Professional SaaS/admin-dashboard appearance

DO NOT copy the exact content from the reference image.

Instead, reproduce the same overall visual language for WETWALLPANEL2GO.

The design should feel:

* Premium
* Modern
* Professional
* Clean
* Minimal
* Easy for an admin team to use
* Suitable for a bathroom/kitchen design company

⸻

4. Suggested Colour System

Use a dark navy sidebar similar to the reference.

Primary:

* Dark Navy: #111827
* Sidebar Navy: #172033
* Primary Blue: #2563EB
* Secondary Purple: #6366F1
* Background: #F7F8FC
* Card: #FFFFFF
* Text: #111827
* Secondary Text: #6B7280
* Border: #E5E7EB

Use colour sparingly.

The main interface should remain mostly white/light with dark navy navigation and blue/purple accents.

Do not make the entire application dark mode.

⸻

5. Application Layout

Create a persistent admin dashboard layout:

---------------------------------------------------------
| Sidebar | Top Header                                  |
|         |----------------------------------------------|
|         |                                              |
|         | Main Content                                 |
|         |                                              |
|         |                                              |
---------------------------------------------------------

Sidebar

Create a dark navy vertical sidebar.

At the top:

WETWALLPANEL2GO

with a small professional logo/brand placeholder.

Navigation:

MAIN MENU

* Dashboard
* Enquiries
* Customers
* Scans
* Designs
* Wet Wall Panels
* Tiles & Accessories

MANAGEMENT

* Quotations
* Lead Tracking

SYSTEM

* Settings

At the bottom:

* Admin profile
* Logout

Use Lucide icons.

The active menu item should have a subtle highlighted background and blue/purple accent.

The sidebar should support collapse/expand on desktop.

On mobile/tablet, make it a responsive drawer.

⸻

6. Top Header

Create a clean white top header.

Left side:

* Page title
* Optional breadcrumb

Centre/right:

* Search field with search icon
* Notification icon
* Admin avatar
* Admin name
* Dropdown arrow

Example:

Dashboard                         Search anything...   🔔   Admin

Keep the header minimal and similar to the provided reference image.

⸻

7. Routes

Create these frontend routes:

/login
/dashboard
/enquiries
/enquiries/:id
/customers
/customers/:id
/scans
/scans/:id
/designs
/wet-wall-panels
/tiles-accessories
/quotations
/lead-tracking
/settings

Create protected-route structure for authenticated pages, but use mock authentication for now.

⸻

8. Login Page

Create a professional login screen.

Design:

* Light background
* Centered login card
* WETWALLPANEL2GO branding
* Email field
* Password field
* Remember me
* Login button
* Forgot password link as UI only

Use mock login functionality.

For now:

Email: admin@example.com
Password: password

Do not connect to a real backend.

After login:

/login → /dashboard

⸻

9. Dashboard

This is the main screen.

Follow the structure of the provided dashboard reference.

Create 4 summary cards:

Total Customers

Example:

1,246
+8.2% this month

Total Enquiries

Example:

324
+12.4% this month

Pending Enquiries

Example:

48
-4.2% this month

Active Designs

Example:

86
+6.5% this month

Do NOT use Revenue, Profit, Invoices or other unrelated business metrics from the reference image.

Use metrics relevant to this application.

⸻

10. Dashboard Charts

Create two dashboard sections.

Enquiry Statistics

Use a donut/pie chart showing:

* New
* Contacted
* Quoted
* Closed

Enquiry Analytics

Create a clean line chart showing enquiries over the last 12 months.

Use mock data.

The charts should visually match the reference image:

* Clean
* Minimal
* Light grid
* Blue/purple accent
* White card
* Rounded corners

Use a suitable React chart library if needed.

⸻

11. Recent Enquiries

Below the charts, create a large Recent Enquiries table.

Columns:

Enquiry ID
Customer
Room Type
Selected Design
Status
Date
Action

Example:

ENQ-001
John Smith
Bathroom
Marble Grey
New
18 Aug 2026
View

Use status badges:

* New
* Contacted
* Quoted
* Closed

Use different subtle badge colours.

Add:

* Search
* Filter
* View button

Clicking View should navigate to:

/enquiries/:id

⸻

12. Enquiries Page

Create a complete enquiry management page.

Header:

Enquiries
Manage customer enquiries and submissions
[Search] [Filter] [+ optional action]

Table:

Enquiry ID
Customer
Mobile
Room Type
Selected Design
Status
Created Date
Actions

Features should include UI for:

* Search
* Status filter
* Room type filter
* Date filter
* Pagination
* View details

Use mock data.

⸻

13. Enquiry Details Page

This is one of the MOST IMPORTANT pages.

Create a detailed, professional layout.

Top:

← Back to Enquiries
Enquiry #ENQ-001
Status: New

Then create cards/sections.

Customer Information

Show:

* Name
* Mobile number
* Email
* Address/location

Room Information

Show:

* Room type
* Bathroom/Kitchen
* Scan date

Measurements

Display:

* Wall measurements
* Floor dimensions
* Height
* Floor area
* Other measurement data returned from backend

Use a clean measurement card/grid.

Example:

Wall 1       2400 mm
Wall 2       1800 mm
Height       2400 mm
Floor Area   4.32 m²

Uploaded Images

Create an image gallery.

Show:

[ Image ] [ Image ] [ Image ]
[ Image ] [ Image ]

Clicking an image should open a preview/lightbox.

3D Layout / Blueprint

Create a large placeholder area:

3D Layout / Blueprint Preview
        [Preview Area]

For now use a realistic placeholder.

Do NOT implement 3D scanning.

The backend will eventually provide the layout/blueprint data.

Selected Design

Show:

* Design image
* Design name
* Panel name
* Category

Selected Accessories

Display selected accessories as cards or a list.

Customer Notes

Display additional notes.

Enquiry Status

Create a status selector.

Example:

New
Contacted
Quoted
Closed

Use mock update functionality.

Quotation / Feedback

Create a section containing:

Quotation Amount
[ £____________ ]
Feedback / Notes
[________________________]
[________________________]
[Save]

This should currently be frontend/mock functionality only.

⸻

14. Customers Page

Create:

Customers
Manage registered customers

Table:

Customer
Mobile
Email
Room Type
Enquiries
Last Activity
Action

Add:

* Search
* Filters
* Pagination
* View customer

⸻

15. Customer Details

Create:

Customer Details
Customer Information
--------------------
Name
Mobile
Email
Address
Enquiry History
----------------
ENQ-001
ENQ-005
Scan History
------------
SCAN-001
SCAN-002

Use cards and tables.

Keep the design consistent with the dashboard.

⸻

16. Scans Page

Create a page to view scan records coming from the mobile application.

Table:

Scan ID
Customer
Room Type
Scan Date
Measurements
Status
Action

Clicking a scan opens:

/scans/:id

⸻

17. Scan Details

Display:

Scan Information

* Scan ID
* Customer
* Room type
* Date

Measurements

Display measurement values in cards.

Uploaded Scan Images

Display image gallery.

3D / Blueprint

Create a large preview container.

Use a professional placeholder until the real backend data is connected.

IMPORTANT:

The Admin Panel only displays scan results.

It does NOT perform scanning.

⸻

18. Designs Page

Create a design management page.

Header:

Designs
Manage bathroom and kitchen designs
[+ Add Design]

Use a grid/table combination.

Design cards should show:

* Design image
* Design name
* Category
* Room type
* Status
* Edit
* Delete/Deactivate

Example:

┌─────────────────┐
│                 │
│ Design Image    │
│                 │
├─────────────────┤
│ Marble Grey     │
│ Bathroom        │
│ Active          │
│                 │
│ Edit   Disable  │
└─────────────────┘

Create an Add/Edit Design modal.

Fields:

* Design Name
* Description
* Room Type
* Category
* Image
* Status

Use mock CRUD behaviour.

⸻

19. Wet Wall Panels

Create a similar management page.

Fields:

* Panel Name
* Description
* Finish
* Dimensions
* Image
* Status

Features:

* Add
* Edit
* View
* Deactivate

Use mock data.

⸻

20. Tiles & Accessories

Create one page with tabs:

Tiles | Accessories

Each tab should have:

* Search
* Category filter
* Add product
* Edit
* Delete/deactivate
* Image
* Status

Use a clean product-management UI.

⸻

21. Quotations

Create a quotation management page.

Table:

Quotation ID
Enquiry ID
Customer
Amount
Status
Created Date
Action

Possible statuses:

* Draft
* Sent
* Accepted
* Rejected

IMPORTANT:

These status values are only frontend mock values for the initial UI. The real allowed values must eventually come from the backend/client requirements.

⸻

22. Lead Tracking

Create a simple lead-tracking page.

Use either a table or Kanban-style layout.

Recommended Kanban:

NEW
----------------
ENQ-001
ENQ-002
CONTACTED
----------------
ENQ-003
QUOTED
----------------
ENQ-004
CLOSED
----------------
ENQ-005

Cards should contain:

* Customer
* Room type
* Design
* Date
* Status

Use mock drag/drop UI only if easy to implement cleanly.

⸻

23. Settings

Create a basic settings page.

Sections:

Admin Profile

* Name
* Email
* Profile image

Appearance

* UI preferences

Account

* Change password UI
* Logout

Do not create unnecessary settings.

⸻

24. Reusable Components

Create reusable components instead of repeating UI code.

At minimum:

Sidebar
Header
PageHeader
StatCard
Card
DataTable
StatusBadge
SearchInput
FilterDropdown
Modal
Button
Input
Select
ImageGallery
EmptyState
LoadingState
ConfirmDialog
Pagination

Use TypeScript interfaces/types for all data models.

⸻

25. Mock Data

Create a dedicated mock-data layer.

For example:

src/data/mockCustomers.ts
src/data/mockEnquiries.ts
src/data/mockScans.ts
src/data/mockDesigns.ts
src/data/mockProducts.ts

Do not hardcode large datasets directly inside components.

⸻

26. API Preparation

Create an API service structure even though real APIs are not connected yet.

Example:

src/services/api.ts
src/services/authService.ts
src/services/enquiryService.ts
src/services/customerService.ts
src/services/scanService.ts
src/services/designService.ts
src/services/productService.ts

For now these can use mock data.

Make it easy to replace mock functions later with Axios API calls.

Do NOT create Express.js or any backend code.

⸻

27. TypeScript Models

Create interfaces such as:

Admin
Customer
Enquiry
Scan
Measurement
Design
WetWallPanel
Tile
Accessory
Quotation

Keep them in:

src/types/

Make the structure easy to modify when the actual backend API response is provided.

⸻

28. UX Requirements

The Admin Panel should have:

* Responsive design
* Desktop-first layout
* Tablet support
* Mobile-friendly sidebar
* Loading states
* Empty states
* Error states
* Confirmation dialogs
* Hover states
* Smooth transitions
* Accessible buttons/forms
* Consistent spacing
* Consistent typography
* Consistent border radius
* Consistent status badges

Do not overuse animations.

Keep animations subtle and professional.

⸻

29. Design Rules

Follow these rules strictly:

1. Do not make the UI look like a generic Bootstrap admin panel.
2. Do not use excessive gradients.
3. Do not use excessive colours.
4. Do not make cards excessively rounded.
5. Do not use huge text.
6. Do not use unnecessary decorative elements.
7. Do not copy the reference dashboard’s content.
8. Use the reference only for the visual style and layout inspiration.
9. Maintain a premium SaaS dashboard appearance.
10. Prioritize readability and usability.

The final result should look like a professionally designed production Admin Panel.

⸻

30. Responsive Behaviour

Desktop:

Sidebar + Header + Main Content

Tablet:

Collapsible Sidebar + Main Content

Mobile:

Hamburger → Sidebar Drawer
Main Content → Full Width
Tables → Horizontal Scroll / Responsive Cards

Do not allow tables to break the entire page layout.

⸻

31. Initial Development Priority

Build the application in this order:

Phase 1

Login
↓
Dashboard Layout
↓
Sidebar
↓
Header
↓
Routing

Phase 2

Dashboard
↓
Enquiries
↓
Enquiry Details

Phase 3

Customers
↓
Customer Details
↓
Scans
↓
Scan Details

Phase 4

Designs
↓
Wet Wall Panels
↓
Tiles & Accessories

Phase 5

Quotations
↓
Lead Tracking
↓
Settings

⸻

32. Important Scope Boundary

The following are OUT OF SCOPE for this frontend:

* Flutter mobile app
* Customer mobile UI
* ARKit
* RoomPlan
* ARCore
* Camera scanning
* Depth sensing
* Measurement algorithms
* 3D reconstruction algorithms
* Backend server
* Database
* OTP service
* Real authentication service
* Real file storage
* Real quotation calculation

Only create the frontend structure and mock interactions for these areas where necessary.

⸻

33. Final Expected Result

The generated project should open to:

/login

After login:

/dashboard

with this navigation:

Dashboard
Enquiries
Customers
Scans
Designs
Wet Wall Panels
Tiles & Accessories
Quotations
Lead Tracking
Settings
Logout

The UI should closely follow the uploaded dashboard reference in terms of:

* Dark navy sidebar
* White/light dashboard
* Blue/purple accents
* Clean cards
* Tables
* Analytics sections
* Professional typography
* Spacious layout
* Modern SaaS/admin feel

Use realistic Charmony / WETWALLPANEL2GO mock data throughout.

The code should be clean, reusable and structured so that the existing backend APIs can be connected later without redesigning the frontend architecture.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cb32f486-d40b-4be4-8ab2-84961b0095c7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
