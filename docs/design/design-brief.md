# AfterBuy — Design Brief

**Version:** 1.0  
**Role:** Senior Product Designer & UX Strategist (Impeccable Method)  
**Status:** Final Definition  

---

## 1. Product Design Context
Post-purchase is a fragmented, high-friction experience. Information is scattered across email inboxes, physical drawers, store accounts, and memory. This fragmentation leads to a concrete economic loss: missed return windows, forgotten warranty claims, and untracked refunds.

AfterBuy is not a "shopping tracker"; it is a **value protection utility**. It transforms the messy post-purchase lifecycle into a structured, action-oriented stream. The design must bridge the gap between "I bought this" and "I have fully realized the value and rights of this purchase."

## 2. Target Users
- **The Power Shopper:** High-frequency buyers who juggle multiple open orders and return windows. They need speed and efficiency.
- **The Value Protector:** Buyers of high-ticket items (electronics, furniture) who prioritize warranty longevity and support rights. They need reliability and archives.
- **The Family Manager:** Handles purchases for multiple people. They need clear categorization and a "single source of truth."
- **The Organized Freelancer:** Tracks work-related purchases for tax/expense purposes. They need clean receipt references and order numbers.

## 3. Main UX Goal
**Eliminate post-purchase anxiety.**

The primary objective is to answer one question within 3 seconds of opening the app:  
> *"What do I need to do today or this week to ensure I don't lose money?"*

The UX success metric is the **Time to Action**: the speed at which a user can identify an urgent deadline and initiate the resolution.

## 4. Product Feel
- **Practical:** Utility-first. Every pixel must serve a purpose.
- **Calm:** The app should be the antidote to the chaos of 50+ confirmation emails.
- **Action-Oriented:** It doesn't just "list" items; it "prompts" actions.
- **Trustworthy:** Dealing with money, refunds, and legal warranties requires a feeling of stability and precision.

## 5. Visual Personality
**"Utilitarian Premium"**

AfterBuy should avoid the "Generic SaaS" look (excessive rounded corners, pastel gradients, bento-box layouts for the sake of trends). Instead, it should feel like a high-quality tool.

- **Typography:** High-legibility sans-serif. Strong hierarchy where dates and prices are treated as primary data points.
- **Color Palette:** A neutral base with high-contrast "Signal Colors" used exclusively for urgency (e.g., a specific "Warning Red" for overdue, "Action Yellow" for due soon).
- **Density:** Balanced. Not cramped like a spreadsheet, but not wasteful like a landing page. Information should be dense enough to be useful but spaced enough to be breathable.
- **Iconography:** Functional and literal. No abstract metaphors.

## 6. What the product must communicate
- **Control:** "I am in charge of my purchases."
- **Safety:** "My money and rights are protected."
- **Clarity:** "I know exactly what is pending and what is closed."
- **Resolution:** "When an action is taken, the stress disappears."

## 7. What it must avoid
- **Dashboard Fatigue:** Avoid "widget-itis." Do not present data that doesn't lead to an action or a necessary piece of information.
- **Alarmism:** Urgency should be clear, but not panic-inducing. Avoid "screaming" UI.
- **Over-Engineering:** No complex onboarding or "discovery" phases. The user should be able to add a purchase and see the deadline immediately.
- **Friction in Data Entry:** Avoid asking for information that isn't strictly necessary for the value proposition.

## 8. Consumer Utility vs. Generic SaaS Dashboard
| Feature | Generic SaaS Dashboard | AfterBuy (Consumer Utility) |
| :--- | :--- | :--- |
| **Mindset** | "I am working in this tool." | "I am consulting this tool." |
| **Primary Action** | Data Management $\rightarrow$ Analysis | Status Check $\rightarrow$ Resolution |
| **Goal** | Long-term monitoring / Reporting | Immediate action / Peace of mind |
| **User Flow** | Log in $\rightarrow$ Explore $\rightarrow$ Manage | Open $\rightarrow$ Act $\rightarrow$ Close |
| **Feeling** | Corporate, Productive, Heavy | Personal, Helpful, Lightweight |

## 9. Guiding Principles for Screens
1. **Priority of Action:** The most urgent financial risk (e.g., a return window closing in 48h) always occupies the highest visual hierarchy.
2. **Contextual Disclosure:** Follow the "What $\rightarrow$ How" pattern. Show the *what* (Product + Urgency) on the dashboard; show the *how* (Manuals, Support links, Order #) only in the detail view.
3. **Status as Progress:** Statuses are not just labels; they are milestones. The transition from `Return Planned` $\rightarrow$ `Returned` $\rightarrow$ `Refunded` should feel like a "win."
4. **Mobile-First Resolution:** Design for the user who is holding the physical product in one hand and the phone in the other.
5. **Rewarding Emptiness:** When no urgent actions exist, the empty state should not feel "empty," but "resolved." (e.g., *"Everything is under control. Enjoy your purchases."*)
