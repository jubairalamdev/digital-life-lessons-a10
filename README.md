# 🎬 Digital Life Lessons

**Digital Life Lessons** is a comprehensive, full-stack, responsive platform designed for individuals to preserve, capture, and reflect upon personal wisdom, growth insights, and critical lifecycle milestones over time. It incorporates community sharing features alongside a structured dashboard for users and administrative supervisors to securely manage content distribution, curation workflows, and automated subscription monetization.

---

## 🚀 Live Site & Source Repositories

* **Live Deployment URL:** `https://digital-life-lessons-alpha.vercel.app/` *(Replace with your deployed live link)*
* **Client Repository (GitHub):** `https://github.com/jubairalamdev/digital-life-lessons-a10` *(Replace with your repository link)*
* **Server Repository (GitHub):** `https://github.com/jubairalamdev/digital-life-lessons-server` *(Replace with your repository link)*

---

## 👤 Credentials & Supervisory Profiles

### Administrative Control Suite
To evaluate platform functionality, user moderations, metric reporting, and content curation features, utilize the authorized credential pairing below:
* **Administrator Email ID:** `kom@pani.com`
* **Secure Access Password:** `A12345678a`

---

## ✨ System Features & Operational Scope

### 🔒 Core Authentication & Identity Resolution
* **Better Auth Engine:** Complete integration enabling frictionless user registration and login pathways utilizing Email/Password or direct single sign-on (SSO) Google OAuth handlers.
* **Password Integrity Validation:** Front-end checking enforcing strict complexity conditions (minimum 6 characters length containing explicitly at least 1 uppercase character and 1 lowercase character).
* **Frictionless Assessment Architecture:** Disabled complex email loops and recovery links during early-stage auditing workflows to support direct, interruption-free examiner access.

### 💳 Lifetime Tiered Monetization (Stripe Sandbox)
* **Dichotomous Tier Allocations:** Automated tracking separating accounts into a standard baseline **Free Plan** or a premium unrestricted **Premium Plan**.
* **Secure Checkout Pipeline:** Immediate transition into native Stripe billing views handling a static, one-time lifetime billing requirement of **৳1500**.
* **Server State Consistency via Webhooks:** Complete backend processing engine intercepting production Stripe events to automatically flip target database user records `isPremium` properties from `false` to `true`.

### 📝 Dynamic Content Curation & Visibility Overlays
* **Granular Distribution Scopes:** Users define operational privacy rules (**Public** vs. **Private**) alongside explicit audience pricing constraints (**Free** vs. **Premium** content tiers).
* **Visual Privacy Overlays:** Automatic blurring and responsive, stylized content locking elements prompting Free tier accounts to initiate premium plan checkouts when attempting to parse premium wisdom entries.
* **Structured Information Forms:** Rich creation templates allowing entries to bundle titles, detailed story texts, categories (e.g., Personal Growth, Career, Relationships), explicit emotional weights (Motivational, Sad, Realization, Gratitude), and optional image links.

### 📊 Engagement Mechanics & Feedback Pipes
* **Stat Tracker Modules:** Readily available data tracking real-time toggling likes, custom bookmarks (Favorites list), reading times, and calculated viewership metrics.
* **Isolated Public Search Infrastructure:** Powerful filter pipelines empowering site visitors to discover shared public entries by matching categories, explicit emotional scales, or parsing localized text string keywords.
* **Nested Discussion Threads:** Multi-user comment sections allowing logged-in participants to insert feedback directly below target posts without refreshing layout roots.

### 🖥️ Dual-Faceted Operational Control Panels
* **End-User Working Profile:** Single view to generate new wisdom entries (with disabled paid access modes for non-premium accounts), audit historical lists inside functional management tables, adjust display configurations, and observe contribution charts.
* **Administrative Management Suite:** Holistic tracking panel aggregating metric overviews (total user distributions, active report pipelines, growth tracking), comprehensive role modifier sheets, and content promotion tables to highlight specific community posts to the landing hero view.
* **Content Defense Reporting Pipeline:** Fully interactive community-led reporting dialog allowing end-users to register flags pointing to violations. Administrators can parse specific complaint cards inside localized modals to immediately drop offensive contents or ignore false reports.

---

## 📦 Installed Dependencies & Packages

### Client Architecture (Next.js App Router Framework)
* `@heroui/react` (v3) - Core atomic UI interface patterns, complex layouts, and declarative compound modal states.
* `framer-motion` / `motion` - Fluid animation models, layout transitions, and entrance state interpolation.
* `lucide-react` - Unified iconography framework.
* `react-share` - Inline social bookmarking distribution widgets.
* `canvas-confetti` - Programmatic graphical event displays upon checkout completions.
* `sonner` / `react-hot-toast` - Global application feedback message stacks.

### Server Engine (Express Core & Driver Frameworks)
* `express` - Main routing application layer.
* `mongodb` - Native connection client handling aggregation frameworks and asynchronous storage pools.
* `cors` - Security middleware setting cross-origin context control policies.
* `dotenv` - Runtime environment key parsing handler.

---

## 🛠️ Security & Environment Variables

### Client Core (`.env.local`)
```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...