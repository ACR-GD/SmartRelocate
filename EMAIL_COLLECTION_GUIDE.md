# Email Collection Guide for SmartRelocate

## Current Email Collection System

Your SmartRelocate application already collects email addresses automatically through:

### 1. Database Storage (PostgreSQL)
- **Location**: All emails are stored in the `email_captures` table
- **Data Captured**: Email address, timestamp, associated conversation ID
- **Access**: Via API endpoint `/api/email-captures`

### 2. Current Collection Points
- Email capture form in the hero section
- Newsletter signup in footer
- Assessment completion follow-up

## Practical Options for Email Management

### Option 1: Direct Database Access (Current)
**Status**: ✅ Already Implemented

```sql
-- View all collected emails
SELECT email, created_at, conversation_id 
FROM email_captures 
ORDER BY created_at DESC;

-- Export to CSV
COPY (SELECT email, created_at FROM email_captures) 
TO '/path/to/emails.csv' 
WITH CSV HEADER;
```

### Option 2: CSV Export Feature (Current)
**Status**: ✅ Already Implemented
- Click "Export CSV" button in admin panel
- Downloads file with all email addresses and capture dates
- Includes engagement data (conversation status)

### Option 3: Email Service Provider Integration
**Status**: Ready for Implementation

#### Mailchimp Integration
```javascript
// Add to server/routes.ts
app.post("/api/email-capture", async (req, res) => {
  try {
    const emailData = insertEmailCaptureSchema.parse(req.body);
    
    // Store in database
    const emailCapture = await storage.createEmailCapture(emailData);
    
    // Sync to Mailchimp
    if (process.env.MAILCHIMP_API_KEY) {
      await syncToMailchimp(emailData.email);
    }
    
    res.json(emailCapture);
  } catch (error) {
    console.error("Error capturing email:", error);
    res.status(500).json({ error: "Failed to capture email" });
  }
});
```

#### ConvertKit Integration
```javascript
const convertkit = require('convertkit-api');
const ck = new convertkit(process.env.CONVERTKIT_API_SECRET);

async function syncToConvertKit(email) {
  await ck.addSubscriberToForm(FORM_ID, { email });
}
```

### Option 4: Webhook Integration
**Status**: Ready for Implementation

```javascript
// Webhook endpoint for external services
app.post("/api/email-webhook", async (req, res) => {
  const { email, source } = req.body;
  
  // Verify webhook signature
  if (!verifyWebhookSignature(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  // Store email
  await storage.createEmailCapture({ email });
  res.json({ success: true });
});
```

## Email Collection Best Practices

### 1. GDPR Compliance
- Add consent checkbox: "I agree to receive updates about Malaysia relocation"
- Provide unsubscribe option
- Store consent timestamp

### 2. Email Validation
- Real-time validation during input
- Bounce detection for sent emails
- Duplicate prevention

### 3. Segmentation Options
- Visa type interest (DE Rantau, MM2H, etc.)
- Profession category
- Timeline for relocation
- Current location

## Immediate Next Steps

### Quick Wins (No External Services Required)
1. **Export Current Emails**: Use the CSV export feature
2. **Manual Import**: Upload to your preferred email service
3. **Database Queries**: Direct PostgreSQL access for analysis

### Enhanced Integration (Requires API Keys)
1. **Mailchimp Setup**: Add MAILCHIMP_API_KEY environment variable
2. **ConvertKit Setup**: Add CONVERTKIT_API_SECRET environment variable
3. **Custom Webhooks**: Configure for specific email tools

## Email Service Provider Setup

### For Mailchimp:
1. Get API key from Mailchimp account
2. Set environment variable: `MAILCHIMP_API_KEY=your_key_here`
3. Configure audience/list ID

### For ConvertKit:
1. Get API secret from ConvertKit account
2. Set environment variable: `CONVERTKIT_API_SECRET=your_secret_here`
3. Configure form ID for subscribers

### For Custom Solutions:
1. Use webhook endpoint: `/api/email-webhook`
2. Configure external service to POST to your endpoint
3. Add authentication/signature verification

## Current Email Collection Stats
- **Storage**: PostgreSQL database
- **Format**: Email, timestamp, conversation link
- **Export**: CSV download available
- **API**: RESTful endpoints for integration
- **Validation**: Built-in email format validation

Your email collection system is fully functional and ready for production use.