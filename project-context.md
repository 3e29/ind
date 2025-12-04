### 🚀 Project Overview

You are working on a **Next.js 15** project using **TypeScript** and **Tailwind CSS v3**.
The goal is to build a **modern, responsive portfolio/contact website** that includes:

* A **Home page**
* A **Products/Services section**
* A **Contact Us modal/page**
  → Supports sending messages through **EmailJS** and **WhatsApp**

The design will use **Tailwind’s utility classes** with a **clean, professional theme**.

---

### 📁 **Project Structure**

Using Next.js App Router (default structure for v13.5):

```
my-app/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx        # Root layout (includes global CSS, metadata)
│  │  ├─ page.tsx          # Home page
│  │  ├─ contact/
│  │  │  └─ page.tsx       # Contact Us page
│  ├─ components/
│  │  ├─ Navbar.tsx
│  │  ├─ Footer.tsx
│  │  ├─ ProductCard.tsx
│  │  └─ ContactModal.tsx
│  ├─ lib/
│  │  └─ i18n/
│  │     ├─ index.ts       # i18next setup
│  │     ├─ en/translation.json
│  │     └─ ar/translation.json
│  ├─ styles/
│  │  └─ globals.css       # Tailwind global import + custom theme
├─ package.json
├─ next.config.ts
├─ tsconfig.json
```

---

### 🧩 **Installed Packages**

| Purpose                  | Package(s)                                                                             |
| ------------------------ | -------------------------------------------------------------------------------------- |
| **Framework**            | `next@13.5.11`, `react`, `react-dom`, `typescript`                                          |
| **Styling**              | `tailwindcss@3`, `@tailwindcss/postcss`, `postcss`, `autoprefixer`                     |
| **Internationalization** | `i18next`, `react-i18next`, `i18next-http-backend`, `i18next-browser-languagedetector` |
| **Form Handling**        | `react-hook-form`                                                                      |
| **Email Sending**        | `@emailjs/browser`                                                                     |
| **Icons**                | `react-icons`                                                                          |

---

### 🎨 **Styling & Theming**


**Global style import (`globals.css`):**

```css
@import "tailwindcss";

@theme {
  --color-primary: #0d47a1;  /* Deep Blue */
  --color-accent: #ffeb3b;   /* Vibrant Yellow */
  --color-cta: #ff9800;      /* Orange CTA highlight */
}
```

You can use these colors in components via:

```tsx
<div className="bg-[--color-primary] text-white">Button</div>
```

---

### 💬 **Functional Goals**

#### 🏠 Home Page

* Clean hero section with intro and CTA button.
* Button navigates to contact section or modal.

#### 🛍️ Products/Services Section

* Display a grid of **Product Cards**.
* Each card includes image, title, and optional CTA.

#### 📩 Contact Us Page / Modal

* Uses **React Hook Form** for validation.
* Two actions:

  1. **Send Email** via **EmailJS**
  2. **Open WhatsApp** with a pre-filled message using:

     ```
     https://wa.me/<phone_number>?text=<encoded_message>
     ```
* Styled using Tailwind + the primary theme colors.

---

### 💡 **UX Guidelines**

* Mobile-first responsive design.
* Reuse Tailwind classes for spacing and typography.
* Use **react-icons** for visual polish (e.g., WhatsApp, Email, LinkedIn icons).
* Keep code modular — separate UI into reusable components.

---

### 🧠 **Instructions**

When generating or editing files, You should:

1. Use **TypeScript** and **Next.js App Router conventions** (`src/app/` structure).
2. Style all components using **Tailwind CSS v3**.
3. Keep the color palette consistent with:

   * Primary Blue: `#0d47a1`
   * Accent Yellow: `#ffeb3b`
   * CTA Orange: `#ff9800`
4. Integrate **EmailJS** and **WhatsApp** into the Contact flow.
5. Initialize **i18next** for multilingual support (English + Arabic).
6. Ensure clean, modern, and responsive layouts.
