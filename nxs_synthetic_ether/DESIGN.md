# Design System Specification: The Synthetic Ether

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Curator"**
This design system moves away from the aggressive, high-contrast "hacker" aesthetic common in AI. Instead, it embraces an editorial, high-end tech philosophy. We treat the interface not as a tool, but as a premium environment—a digital gallery where AI insights are curated with precision. 

The aesthetic is defined by **Tonal Depth** and **Atmospheric Persistence**. By utilizing intentional asymmetry, overlapping glass surfaces, and a "No-Line" architecture, we create an experience that feels fluid and organic rather than rigid and robotic. We prioritize the "breath" of the layout (negative space) to establish trust and sophisticated authority.

---

## 2. Colors & Surface Philosophy
The palette is rooted in deep obsidian tones, punctuated by high-energy neon accents that signify intelligence and "pulse."

### Tone & Intent
- **Primary (`#8FF5FF` to `#00F0FF`):** Use for "Intelligence Moments." It is the pulse of the AI.
- **Secondary (`#AC89FF`):** Use for "Human Intuition." This deep purple provides a sophisticated counterweight to the neon primary.
- **Surface Strategy:** We use the `surface-container` tiers to build physical depth.

### The "No-Line" Rule
**Explicit Instruction:** Prohibit the use of 1px solid borders for sectioning or containment. 
- Boundaries must be defined solely through **Background Color Shifts**. For example, a `surface-container-high` card should sit on a `surface-container-low` section.
- If a visual break is needed, use a transition in tonal depth, never a line. This keeps the UI feeling like a continuous, immersive space.

### The "Glass & Gradient" Rule
Floating elements (Modals, Hover Cards, Popovers) must use **Glassmorphism**:
- **Background:** `surface-container` at 60-80% opacity.
- **Backdrop Blur:** 20px to 40px.
- **Gradients:** Use a subtle linear gradient from `primary` to `primary-container` at 15% opacity on large CTAs to provide "visual soul."

---

## 3. Typography: Editorial Precision
The system uses a pairing of **Manrope** for authoritative headers and **Inter** for high-utility body text.

| Role | Token | Font | Size | Intent |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Manrope | 3.5rem | High-impact, low-word-count hero statements. |
| **Headline** | `headline-md` | Manrope | 1.75rem | Section titles; bold and confident. |
| **Title** | `title-lg` | Inter | 1.375rem | Content grouping and card headers. |
| **Body** | `body-md` | Inter | 0.875rem | Standard reading; prioritized for legibility. |
| **Label** | `label-sm` | Inter | 0.6875rem | Metadata, tags, and micro-copy. |

**Editorial Note:** Use `display-lg` with tighter letter-spacing (-0.02em) and wide margins to create an "expensive" feel. Typography is our primary decorative element.

---

## 4. Elevation & Depth: Tonal Layering
We reject the standard drop-shadow. Depth is achieved through the **Layering Principle**.

### Stacking Tiers
- **Level 0 (Base):** `surface` (#0d0e13)
- **Level 1 (Sections):** `surface-container-low` (#121319)
- **Level 2 (Cards):** `surface-container` (#181920)
- **Level 3 (Interactive):** `surface-container-highest` (#24252d)

### Ambient Shadows & "Ghost Borders"
- **Shadows:** When an element must "float" (e.g., a dropdown), use a shadow with a 40px–60px blur, 6% opacity, using the `on-surface` color. It should feel like an ambient occlusion, not a dark smudge.
- **The Ghost Border:** If accessibility requires a container edge, use the `outline-variant` token at **15% opacity**. It should be barely perceptible—a "whisper" of an edge.

---

## 5. Components

### Buttons: The Kinetic Core
- **Primary:** Background `primary-container` (#00eefc) with `on-primary-fixed` (#003f43) text. Apply a subtle `0 0 15px` outer glow using the primary color at 30% opacity.
- **Secondary:** Glass-style. `surface-container-high` at 40% opacity with a `primary` ghost border (15% opacity).
- **Shape:** Use `roundedness-md` (0.75rem) for a modern, approachable feel.

### Input Fields: Depth-First
- **Static State:** `surface-container-lowest` background. No border.
- **Focus State:** Background shifts to `surface-container-low`. A 1px "Ghost Border" appears using the `primary` token at 40% opacity.
- **Helper Text:** Use `label-md` with `on-surface-variant`.

### Cards & Lists: Flow over Structure
- **Constraint:** **Strictly forbid divider lines.** 
- **Execution:** Use the Spacing Scale (Token `8` or `10`) to separate list items. For cards, use the tonal shift from `surface` to `surface-container`.
- **Interaction:** On hover, a card should transition from `surface-container` to `surface-bright` with a subtle scale-up (1.02x).

### Chips & Tags
- **Selection Chips:** Use `secondary-container` with `on-secondary-container` text.
- **Aesthetic:** High pill-roundness (`roundedness-full`).

---

## 6. Do’s and Don’ts

### Do
- **Use Asymmetry:** Allow images or text blocks to bleed off the grid or overlap surface containers to create a custom, high-end feel.
- **Trust the Blur:** Use heavy backdrop blurs (30px+) on any floating glass element to ensure readability.
- **Embrace the Dark:** Keep the majority of the UI in the `surface` and `surface-container-low` range to allow the neon `primary` accents to feel like light-sources.

### Don’t
- **Don't Use Pure Black:** Avoid `#000000` except for the `surface-container-lowest` in specific high-contrast nested scenarios.
- **Don't Over-Glow:** Glow effects should be reserved for active AI states or primary CTAs. If everything glows, nothing is important.
- **Don't Use 1px Dividers:** Use vertical rhythm and background tones. If you feel the need for a line, your spacing is likely too tight. Increase padding using the `spacing-6` or `spacing-8` tokens.

### Accessibility Note
While we prioritize a "Ghost Border" aesthetic, ensure that active form elements and critical CTAs maintain a contrast ratio of at least 4.5:1 against their immediate background. Use the `primary-dim` and `secondary-dim` tokens to adjust for legibility where necessary.