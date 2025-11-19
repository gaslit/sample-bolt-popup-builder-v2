# Vanilla Sky - API Contract Specification
## JSON REST API v1.0

**Last Updated:** 2025-01-16
**Status:** FROZEN (no changes without user approval)
**Base URL:** `https://api.vanillasky.com/v1`

---

## Table of Contents

1. [Slug Exposure Policy](#slug-exposure-policy)
2. [Response Structure](#response-structure)
3. [Authentication Endpoints](#authentication-endpoints)
4. [Account Endpoints](#account-endpoints)
5. [Web Property Endpoints](#web-property-endpoints)
6. [Placement Endpoints](#placement-endpoints)
7. [Campaign Endpoints](#campaign-endpoints)
8. [Analytics Endpoints](#analytics-endpoints)
9. [Webhook Endpoints](#webhook-endpoints)
10. [Rate Limiting](#rate-limiting)
11. [Error Responses](#error-responses)

---

## Slug Exposure Policy

### Exposed Slugs (Non-enumerable, Safe)
- **Organizations:** `/organizations/{org_slug}`
- **Accounts:** `/accounts/{account_slug}`
- **Web Properties:** `/web_properties/{property_slug}`
- **Placements:** `/placements/{placement_slug}`
- **Campaigns:** `/campaigns/{campaign_slug}`
- **Placement Themes:** `/themes/{theme_slug}`

### Hidden Slugs (Privacy/PII)
- **Users:** NEVER expose user slugs in API responses or URLs
- Use `/users/me` for current user
- Use `/users/{user_id}` only in admin contexts with `_debug`

### Rationale
- Nanoids (10 chars) are cryptographically non-enumerable (no sequential scanning)
- Resource slugs are business identifiers (safe for URLs, webhooks, logs)
- User slugs contain no business value externally, hide for privacy

---

## Response Structure

### Production (Regular Users)
```json
{
  "slug": "a7b9c3d2e1",
  "name": "Summer Sale Popup",
  "status": "active",
  "layout_type": "modal",
  "web_property": {
    "slug": "f4g5h6i7j8",
    "name": "Main Site",
    "domain": "example.com"
  },
  "campaign": {
    "slug": "k9l0m1n2o3",
    "name": "Q2 Promotions"
  },
  "theme": {
    "slug": "gradient-hero-v2",
    "display_name": "Gradient Hero"
  },
  "content": {
    "title": "Get 20% Off",
    "description": "Summer sale ends soon!",
    "cta_text": "Shop Now",
    "cta_url": "https://example.com/sale"
  },
  "style": {
    "primary_color": "#FF6B6B",
    "background_color": "#FFFFFF",
    "font_size": 16
  },
  "display": {
    "position": "center",
    "animation": "fade_in",
    "dimensions": {"width": 600, "height": 400}
  }
}
```

### Development / Admin Users (with `_debug`)
```json
{
  "slug": "a7b9c3d2e1",
  "name": "Summer Sale Popup",
  "status": "active",
  "layout_type": "modal",
  "_debug": {
    "id": 42,
    "account_id": 7,
    "web_property_id": 12,
    "placement_theme_id": 3,
    "content_hash": "7f3a9b2c8d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
    "analytics_version": 1,
    "version": 3,
    "inserted_at": "2025-01-15T14:32:01.123456Z",
    "updated_at": "2025-01-16T09:14:22.987654Z",
    "created_by": {
      "id": 101,
      "email": "admin@example.com",
      "display_name": "Alice Admin"
    }
  },
  "web_property": {
    "slug": "f4g5h6i7j8",
    "name": "Main Site",
    "_debug": {
      "id": 12,
      "domain": "example.com",
      "verified_at": "2025-01-10T10:00:00.000000Z"
    }
  }
}
```

### Minimal List Responses (Production)
```json
{
  "placements": [
    {
      "slug": "a7b9c3d2e1",
      "name": "Summer Sale Popup",
      "status": "active",
      "thumbnail_url": "https://cdn.example.com/thumb_a7b9.jpg"
    },
    {
      "slug": "b8c9d0e1f2",
      "name": "Newsletter Signup",
      "status": "paused",
      "thumbnail_url": "https://cdn.example.com/thumb_b8c9.jpg"
    }
  ],
  "meta": {
    "total_count": 47,
    "page": 1,
    "per_page": 20
  }
}
```

---

## Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecureP@ss123",
  "display_name": "John Doe"
}
```

**Response (201 Created):**
```json
// Production
{
  "user": {
    "email": "user@example.com",
    "display_name": "John Doe"
  },
  "message": "Confirmation email sent"
}

// Dev/Admin (_debug includes timestamps)
{
  "user": {
    "email": "user@example.com",
    "display_name": "John Doe",
    "_debug": {
      "id": 42,
      "confirmed_at": null,
      "inserted_at": "2025-01-16T10:30:00.000000Z",
      "updated_at": "2025-01-16T10:30:00.000000Z"
    }
  }
}
```

**Notes:**
- NO slug exposed for users (privacy)
- NO token returned (must confirm email first)

---

### POST /auth/login
Authenticate and receive API token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecureP@ss123"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "email": "user@example.com",
    "display_name": "John Doe",
    "confirmed_at": "2025-01-15T10:30:00.000000Z"
  },
  "token": "SFMyNTY.g3QAAAACZAAEZGF0YW0AAAA...",
  "expires_at": "2025-02-14T10:30:00.000000Z"
}
```

---

### GET /auth/me
Get current authenticated user.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "email": "user@example.com",
  "display_name": "John Doe",
  "confirmed_at": "2025-01-15T10:30:00.000000Z",
  "accounts": [
    {
      "slug": "k9l0m1n2o3",
      "name": "My Business Account",
      "role": "owner",
      "plan": "robot"
    }
  ],
  "organizations": [
    {
      "slug": "p4q5r6s7t8",
      "name": "Acme Corp",
      "role": "admin",
      "plan": "enterprise"
    }
  ]
}
```

---

### POST /auth/logout
Revoke current session token.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (204 No Content)**

**Notes:**
- Token immediately revoked (session deleted)
- Cannot be reused after logout

---

## Account Endpoints

### POST /accounts
Create a new account.

**Request:**
```json
{
  "name": "My New Account",
  "plan": "foundation"
}
```

**Response (201 Created):**
```json
{
  "slug": "a1b2c3d4e5",
  "name": "My New Account",
  "plan": "foundation",
  "plan_status": "trial",
  "trial_ends_at": "2025-02-14T00:00:00.000000Z",
  "is_paying": false
}
```

**Notes:**
- Slug exposed (safe, non-enumerable)
- User automatically added to `account_users` with `role: owner`

---

### GET /accounts/{account_slug}
Retrieve account details.

**Response (200 OK):**
```json
{
  "slug": "a1b2c3d4e5",
  "name": "My Business Account",
  "plan": "robot",
  "plan_status": "active",
  "trial_ends_at": null,
  "is_paying": true,
  "organization": {
    "slug": "p4q5r6s7t8",
    "name": "Acme Corp"
  },
  "web_properties_count": 3,
  "placements_count": 47
}
```

---

### PATCH /accounts/{account_slug}
Update account details.

**Request:**
```json
{
  "name": "Updated Account Name",
  "plan": "empire"
}
```

**Response (200 OK):**
```json
{
  "slug": "a1b2c3d4e5",
  "name": "Updated Account Name",
  "plan": "empire",
  "plan_status": "active"
}
```

**Notes:**
- Plan changes (upgrades/downgrades) NOT supported (user must create new account)
- Attempting plan change returns 422 Unprocessable Entity:
  ```json
  {
    "error_code": "plan_change_not_supported",
    "message": "Account plan changes not supported. Create new account at desired tier."
  }
  ```

---

### DELETE /accounts/{account_slug}
Soft delete account (30-day retention).

**Response (202 Accepted):**
```json
{
  "message": "Account scheduled for deletion in 30 days",
  "deleted_at": "2025-01-16T10:00:00.000000Z",
  "permanent_deletion_at": "2025-02-15T10:00:00.000000Z"
}
```

**Notes:**
- Soft delete, 30-day retention
- Oban cron handles hard delete after 30 days

---

## Web Property Endpoints

### POST /accounts/{account_slug}/web_properties
Add a new web property (domain).

**Request:**
```json
{
  "name": "Main Website",
  "domain": "example.com"
}
```

**Response (201 Created):**
```json
{
  "slug": "f4g5h6i7j8",
  "name": "Main Website",
  "domain": "example.com",
  "verified_at": null,
  "embed_code": "<script src=\"https://cdn.vanillasky.com/sdk.js\" data-property=\"f4g5h6i7j8\"></script>"
}
```

**Notes:**
- Verification via SDK origin check (NO DNS TXT record required)
- First SDK load from matching domain auto-sets `verified_at` timestamp
- Unverified properties can serve placements (verification optional for testing)
- SDK validates `Origin` header matches `domain` field

---

### GET /web_properties/{property_slug}
Retrieve web property details.

**Response (200 OK):**
```json
{
  "slug": "f4g5h6i7j8",
  "name": "Main Website",
  "domain": "example.com",
  "verified_at": "2025-01-15T12:00:00.000000Z",
  "account": {
    "slug": "a1b2c3d4e5",
    "name": "My Business Account"
  },
  "placements_count": 12
}
```

---

## Placement Endpoints

### POST /accounts/{account_slug}/placements
Create a new placement.

**Request:**
```json
{
  "name": "Summer Sale Popup",
  "web_property_slug": "f4g5h6i7j8",
  "placement_theme_slug": "gradient-hero-v2",
  "campaign_slug": "k9l0m1n2o3",
  "layout_type": "modal",
  "content": {
    "title": "Get 20% Off",
    "description": "Summer sale ends soon!",
    "cta_text": "Shop Now",
    "cta_url": "https://example.com/sale",
    "img_base_url": "https://cdn.example.com/hero.jpg"
  },
  "style": {
    "primary_color": "#FF6B6B",
    "background_color": "#FFFFFF",
    "font_size": 16,
    "border_radius": 8
  },
  "display": {
    "position": "center",
    "animation": "fade_in",
    "dimensions": {"width": 600, "height": 400}
  },
  "targeting": {
    "url_patterns": ["/sale/*", "/products/*"],
    "device_types": ["desktop", "tablet"],
    "geo": ["US", "CA", "GB"]
  }
}
```

**Response (201 Created):**
```json
{
  "slug": "a7b9c3d2e1",
  "name": "Summer Sale Popup",
  "status": "draft",
  "layout_type": "modal",
  "content_hash": "7f3a9b2c...",
  "version": 1,
  "web_property": {
    "slug": "f4g5h6i7j8",
    "name": "Main Website"
  },
  "campaign": {
    "slug": "k9l0m1n2o3",
    "name": "Q2 Promotions"
  },
  "theme": {
    "slug": "gradient-hero-v2",
    "display_name": "Gradient Hero"
  }
}
```

**Notes:**
- `campaign_slug` optional, null for foundation plan
- `content_hash` automatically computed on creation

---

### GET /placements/{placement_slug}
Retrieve placement details (full object).

**Response (200 OK):**
See [Response Structure](#response-structure) section above.

---

### PATCH /placements/{placement_slug}
Update placement (partial update supported).

**Request:**
```json
{
  "status": "active",
  "content": {
    "title": "NEW! Get 30% Off"
  }
}
```

**Response (200 OK):**
```json
{
  "slug": "a7b9c3d2e1",
  "name": "Summer Sale Popup",
  "status": "active",
  "content_hash": "9e1f2a3b...",
  "analytics_version": 1,
  "version": 2
}
```

**Notes:**
- `content_hash` recalculated on content/style/display changes
- `version` incremented on every update

---

### POST /placements/{placement_slug}/clone
Clone placement to new or existing web property.

**Request:**
```json
{
  "name": "Summer Sale Popup (Clone)",
  "web_property_slug": "f4g5h6i7j8"
}
```

**Response (201 Created):**
```json
{
  "slug": "b8c9d0e1f2",
  "name": "Summer Sale Popup (Clone)",
  "status": "draft",
  "progenitor": {
    "slug": "a7b9c3d2e1",
    "name": "Summer Sale Popup"
  },
  "version": 1
}
```

**Notes:**
- `progenitor_id` set to original placement.id
- New analytics stream (different placement_id)
- Can clone to different web property

---

### DELETE /placements/{placement_slug}
Soft delete placement (30-day retention).

**Response (202 Accepted):**
```json
{
  "message": "Placement scheduled for deletion in 30 days",
  "status": "pending_deletion",
  "deleted_at": "2025-01-16T10:00:00.000000Z"
}
```

**Notes:**
- Status changed to `"pending_deletion"` (stops serving)
- Oban cron handles hard delete after 30 days

---

## Campaign Endpoints

### POST /accounts/{account_slug}/campaigns
Create a new campaign (robot+ plans only).

**Request:**
```json
{
  "name": "Q2 Promotions",
  "description": "Spring/Summer promotional campaign",
  "start_at": "2025-04-01T00:00:00Z",
  "end_at": "2025-06-30T23:59:59Z"
}
```

**Response (201 Created):**
```json
{
  "slug": "k9l0m1n2o3",
  "name": "Q2 Promotions",
  "description": "Spring/Summer promotional campaign",
  "status": "draft",
  "start_at": "2025-04-01T00:00:00.000000Z",
  "end_at": "2025-06-30T23:59:59.000000Z",
  "placements_count": 0
}
```

**Notes:**
- Only available for robot+ plans
- Foundation plan returns `403 Forbidden`

---

### PATCH /campaigns/{campaign_slug}
Update campaign (including activation).

**Request:**
```json
{
  "status": "active"
}
```

**Response (200 OK):**
```json
{
  "slug": "k9l0m1n2o3",
  "status": "active",
  "placements_activated": 12
}
```

**Notes:**
- Activating campaign activates all child placements
- Idempotent (safe to call multiple times)

---

## Analytics Endpoints

### GET /placements/{placement_slug}/analytics
Retrieve placement analytics for date range.

**Query Params:**
```
?start_date=2025-01-01&end_date=2025-01-31
```

**Response (200 OK):**
```json
{
  "placement": {
    "slug": "a7b9c3d2e1",
    "name": "Summer Sale Popup"
  },
  "date_range": {
    "start": "2025-01-01",
    "end": "2025-01-31"
  },
  "total": {
    "impressions": 45230,
    "clicks": 3418,
    "conversions": 127,
    "ctr": 7.56,
    "conversion_rate": 3.72
  },
  "by_content_version": [
    {
      "content_hash": "7f3a9b2c...",
      "impressions": 30120,
      "clicks": 2280,
      "conversions": 85,
      "ctr": 7.57
    },
    {
      "content_hash": "9e1f2a3b...",
      "impressions": 15110,
      "clicks": 1138,
      "conversions": 42,
      "ctr": 7.53
    }
  ],
  "daily": [
    {
      "date": "2025-01-01",
      "impressions": 1520,
      "clicks": 115,
      "conversions": 4
    }
  ]
}
```

---

### GET /campaigns/{campaign_slug}/analytics
Retrieve aggregated campaign analytics.

**Response (200 OK):**
```json
{
  "campaign": {
    "slug": "k9l0m1n2o3",
    "name": "Q2 Promotions"
  },
  "total": {
    "impressions": 234560,
    "clicks": 18765,
    "conversions": 892
  },
  "by_placement": [
    {
      "slug": "a7b9c3d2e1",
      "name": "Summer Sale Popup",
      "impressions": 45230,
      "clicks": 3418,
      "conversions": 127
    }
  ]
}
```

---

## Webhook Endpoints

### POST /accounts/{account_slug}/webhooks
Register a webhook endpoint.

**Request:**
```json
{
  "event_type": "budget.depleted",
  "url": "https://example.com/webhooks/vanilla-sky",
  "secret": "whsec_a7b9c3d2e1f4g5h6"
}
```

**Response (201 Created):**
```json
{
  "id": 42,
  "event_type": "budget.depleted",
  "url": "https://example.com/webhooks/vanilla-sky",
  "is_active": true,
  "failure_count": 0
}
```

**Notes:**
- Webhook IDs exposed (needed for management)
- `secret` stored hashed, never returned in GET responses

---

### Webhook Payload Example

**POST** to customer's webhook URL:

**Headers:**
```
X-VanillaSky-Signature: sha256=7f3a9b2c8d1e4f5a...
X-VanillaSky-Event: budget.depleted
X-VanillaSky-Delivery: 7a8b9c0d1e2f3a4b
```

**Payload:**
```json
{
  "event": "budget.depleted",
  "timestamp": "2025-01-16T14:32:01.123456Z",
  "data": {
    "placement": {
      "slug": "a7b9c3d2e1",
      "name": "Summer Sale Popup"
    },
    "budget": {
      "budget_type": "impressions",
      "budget_limit": 10000,
      "budget_spent": 10000
    },
    "account": {
      "slug": "a1b2c3d4e5",
      "name": "My Business Account"
    }
  }
}
```

---

## Rate Limiting

### Headers (All Responses)
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 847
X-RateLimit-Reset: 1642348800
```

### Rate Limit Tiers (per hour)
- **Foundation:** 1,000 requests
- **Robot:** 5,000 requests
- **Empire:** 25,000 requests
- **Enterprise:** 100,000 requests

### 429 Too Many Requests Response
```json
{
  "error_code": "rate_limit_exceeded",
  "message": "Rate limit exceeded. Limit resets at 2025-01-16T15:00:00Z",
  "retry_after": 3600
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error_code": "validation_error",
  "message": "Validation failed",
  "errors": {
    "email": ["is invalid"],
    "password": ["must be at least 12 characters"]
  }
}
```

---

### 401 Unauthorized
```json
{
  "error_code": "unauthorized",
  "message": "Invalid or expired token"
}
```

---

### 403 Forbidden
```json
{
  "error_code": "forbidden",
  "message": "You do not have permission to perform this action",
  "required_role": "admin"
}
```

---

### 404 Not Found
```json
{
  "error_code": "not_found",
  "message": "Placement not found",
  "resource_type": "placement",
  "slug": "invalid_slug"
}
```

---

### 422 Unprocessable Entity
```json
{
  "error_code": "business_logic_error",
  "message": "Cannot downgrade to foundation plan while using pro themes",
  "conflicting_resources": [
    {"type": "placement_theme", "slug": "gradient-hero-pro-v3"}
  ]
}
```

---

### 500 Internal Server Error
```json
{
  "error_code": "internal_server_error",
  "message": "An unexpected error occurred",
  "request_id": "req_a7b9c3d2e1f4g5h6"
}
```

**Notes:**
- Error details logged to Sentry with `request_id` correlation
- Never expose stack traces in production

---

## Verification Strategy

### Development/Test Environments
- All responses include `_debug` fields
- Tests check database state directly (not just API responses)

**Example Test:**
```elixir
test "creates placement with correct slug" do
  response = post(conn, "/placements", params)
  assert %{"slug" => slug} = json_response(response, 201)

  # Verify in database
  placement = Repo.get_by!(Placement, slug: slug)
  assert placement.account_id == account.id
  assert placement.content_hash == compute_hash(params["content"])
end
```

### Production
- Admin users (`role: :owner` or `role: :admin`) get `_debug` fields
- Regular users get minimal responses
- Check via `is_admin?(current_user)` in views

---

**END OF API CONTRACT**
