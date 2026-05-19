# Notion CMS Integration Setup Guide

This guide explains how to connect the Neware website to Notion as a content management system.

## Overview

The website uses a **dual-source data layer**: it first attempts to fetch content from Notion, and falls back to static TypeScript data if Notion is unavailable or not configured. This ensures the site always works even if Notion is down.

```
[Browser Request]
       ↓
[getProducts()] in src/lib/get-products.ts
       ↓
  ┌─→ Notion API (if NOTION_TOKEN is set)
  │       ↓
  │   Products fetched from Notion Database
  │       ↓
  │   Mapped to Product[] type
  └─→ Static data fallback (src/data/neware.ts)
          ↓
      Products returned from TypeScript
```

## Required Environment Variables

Add these to your `.env.local` file:

```env
# Notion Integration
NOTION_TOKEN=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_PRODUCTS_DB=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_SOLUTIONS_DB=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_FAQ_DB=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_RESOURCES_DB=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Step 1: Create a Notion Integration

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **"New integration"**
3. Name it `Neware Website`
4. Select your workspace
5. Under **Capabilities**, enable: Read content
6. Copy the **Internal Integration Token** (starts with `secret_`)
7. Paste it as `NOTION_TOKEN` in `.env.local`

## Step 2: Create Databases in Notion

Create a new Notion page (or workspace) called **"Neware Website Content"**, then add the following databases as children:

---

### Database 1: Products

Create a new **database** named `Products` with these properties:

| Property Name | Type | Notes |
|---|---|---|
| `Name` | Title | Product name (Chinese) |
| `NameEn` | Text | Product name (English) |
| `Description` | Text | Product description (Chinese) |
| `DescriptionEn` | Text | Product description (English) |
| `Keywords` | Text | SEO keywords (Chinese), comma-separated |
| `KeywordsEn` | Text | SEO keywords (English), comma-separated |
| `RouteId` | Text | Route ID: `ct4000`, `ct9000`, `ce6000`, `ct8000`, `ct3000`, `chamber`, `formation`, `lims` |
| `Voltage` | Text | e.g. `5V` |
| `Current` | Text | e.g. `100A` |
| `Accuracy` | Text | e.g. `0.02% FS` |
| `SamplingRate` | Text | e.g. `1000Hz` |
| `Channels` | Text | e.g. `8CH` |
| `Application` | Text | Application scenario (Chinese) |
| `ApplicationEn` | Text | Application scenario (English) |
| `MinPulseWidth` | Text | Optional, e.g. `400μs` |
| `Ranges` | Text | Optional, current ranges |
| `Resolution` | Text | Optional, e.g. `AD: 16-bit` |
| `Software` | Text | Optional, e.g. `BTS9` |
| `EnergySaving` | Text | Optional, energy saving feature |
| `Status` | Select | Options: `Draft`, `Published` — only Published products are shown |
| `Order` | Number | Sort order (ascending) |

**Sharing**: Click **"..."** menu on the database → **"Add connections"** → select your integration `Neware Website`.

Copy the database ID from the URL:
```
https://notion.so/workspace/{DATABASE_ID}?v=...
                                                        ^^^^^^^^^^^^
                                                        32-char ID
```

Add to `.env.local` as `NOTION_PRODUCTS_DB`.

---

### Database 2: Solutions

Create a database named `Solutions`:

| Property Name | Type | Notes |
|---|---|---|
| `Name` | Title | Solution name (Chinese) |
| `NameEn` | Text | Solution name (English) |
| `Description` | Text | Description (Chinese) |
| `DescriptionEn` | Text | Description (English) |
| `Slug` | Text | URL slug, e.g. `research-development` |
| `Icon` | Text | Lucide icon name, e.g. `FlaskConical` |
| `Color` | Text | Hex color, e.g. `#2563eb` |
| `Status` | Select | `Draft` / `Published` |

---

### Database 3: FAQs

Create a database named `FAQs`:

| Property Name | Type | Notes |
|---|---|---|
| `Question` | Title | Question text (Chinese) |
| `QuestionEn` | Text | Question text (English) |
| `Answer` | Text | Answer text (Chinese) |
| `AnswerEn` | Text | Answer text (English) |
| `Status` | Select | `Draft` / `Published` |

---

### Database 4: Resources (Whitepapers)

Create a database named `Resources`:

| Property Name | Type | Notes |
|---|---|---|
| `Title` | Title | Resource title (Chinese) |
| `TitleEn` | Text | Resource title (English) |
| `Description` | Text | Short description (Chinese) |
| `DescriptionEn` | Text | Short description (English) |
| `Category` | Select | Options: `Whitepaper`, `Guide`, `Case Study`, `Webinar` |
| `CoverImage` | URL | Cover image URL |
| `DownloadUrl` | URL | PDF download link |
| `Status` | Select | `Draft` / `Published` |

---

## Step 3: Verify the Connection

After adding the environment variables, restart the dev server and check the console logs:

```
[Data] Using Notion products: 14
```

Or fallback mode:
```
[Data] Using static products (fallback): 14
```

## How to Update Content

### Adding a New Product

1. Open the **Products** database in Notion
2. Add a new row
3. Fill in all required fields
4. Set `Status` to **Published**
5. The website will automatically include it on the next request (ISR revalidation)

### Updating Existing Content

1. Edit the row in Notion
2. Save changes
3. The website fetches fresh data on the next page visit

### Removing/Hiding a Product

1. Change `Status` to **Draft**, or delete the row
2. The product will no longer appear on the website

## ISR (Incremental Static Regeneration)

Product pages use ISR with `revalidate = 3600` (1 hour). You can force a refresh by redeploying the site, or by calling the revalidation API:

```
POST /api/revalidate
Content-Type: application/json

{ "path": "/zh/products/bts9000-5v5a-4ch" }
```

## Troubleshooting

**Q: The site still shows static data even after adding NOTION_TOKEN**
A: Check that:
1. The integration has access to the database (Share → Add connection)
2. The database has rows with `Status = Published`
3. The database ID is correct (32 characters, no dashes)

**Q: "Cannot read properties of undefined" errors**
A: The Notion API response structure may have changed. Check the error log in the server console.

**Q: How do I test without affecting the live site?**
A: Use a separate Notion workspace for development and switch the `NOTION_TOKEN` in `.env.local`.
