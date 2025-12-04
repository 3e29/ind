Act as a Senior Frontend Developer expert in Next.js 15, TypeScript, and Tailwind CSS.

I am building a business website for a machinery company (similar to simco.com.sa). I need you to generate code for the Home Page and its components based on the requirements below.

Project Context

Stack: Next.js 15 (App Router), TypeScript, Tailwind CSS v3.

Colors:

Primary (Deep Blue): #0d47a1 (Use bg-[--color-primary] or custom class)

Accent (Yellow): #ffeb3b

CTA (Orange): #ff9800

Icons: Use react-icons (e.g., FaSearch, FaPhone, FaGlobe, FaBars etc.).

Images: Assume product images are stored in src/assets/images.

I18n: The project uses i18next with English and Arabic already functioning perfectly.

Language JSON files are located in src/assets/languages.

Ensure the Language Toggle Button integrates with this existing logic.

All text in the new components should be structured to support these two languages.

Requirements

1. Enhanced Floating Navbar

Create a responsive Navbar component that follows these specific layout rules:

Desktop Layout:

Left: Logo.

Center/Right: Navigation Links in ALL CAPS: HOME, PRODUCT CATEGORY, ABOUT US, CONTACT US.

Right End (Utilities): A vertical pipe separator | followed by:

Search Icon

Language Toggle Button (triggers existing i18next English/Arabic switch).

Mobile Layout (Small Screens):

The top bar should display elements in this exact order from Left to Right (assuming English LTR view):

Logo

White Space (Spacer/Flex-grow)

Search Icon

Language Toggle Button

Vertical Pipe Separator (|)

Navbar Toggle (Hamburger Menu)

Functionality:

Product Category: Implement this as a Dropdown Menu (on hover or click) under the "PRODUCT CATEGORY" link to save space.

Scroll Effect: The navbar should be fixed (floating).

Initial State: Fully transparent background (sitting on top of the hero image).

On Scroll: Transform into a "Glassmorphism" style (semi-transparent blurry background, e.g., bg-white/90 backdrop-blur-md or bg-[--color-primary]/90).

2. Hero Section (Banner Layers)

Create a Hero component that:

Displays 3 background images (either as a slideshow or a tastefully arranged grid/collage).

Applies a color overlay (Blue #0d47a1 or Orange #ff9800) with opacity to ensure text readability.

Center Text: Large, bold typography stating: "Over 20 Years of Experience in the Field".

Include a CTA button: "Explore Products".

3. Machinery Section (Product Categories)

Create a MachinerySection component that:

Organizes product categories in a clean Grid Layout.

Card Design:

Each card represents a category.

The card should use a Background Photo relevant to that category.

Overlay the Category Name clearly on top of the image (e.g., bottom left or center with a dark gradient overlay).

Hover effect: Zoom image slightly or increase overlay opacity.

4. Contact Us Section (Bottom)

Create a ContactSection to be placed at the bottom of the Home Page:

Brief text: "Have a project in mind?" or "Need a quote?".

Action: A button that opens the existing ContactModal component (do not duplicate the form logic, just trigger the modal).

Alternatively, if not using the modal here, display a simplified inline contact form.

5. Suggested Additional Sections

Please also generate code for these two sections to improve the landing page flow:

"Why Choose Us": A section with 3-4 columns using icons to highlight: "20+ Years Experience", "High Quality Machinery", and "24/7 Support".

"Trusted Partners": A simple grayscale logo strip/carousel showing brands we work with (common in this industry).

Output

Please provide the code for:

src/components/Navbar.tsx (Ensure the mobile/desktop layout matches the specific ordering above).

src/components/Hero.tsx

src/components/MachinerySection.tsx

src/components/ContactSection.tsx

src/app/page.tsx (assembling all sections).