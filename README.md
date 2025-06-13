# SmartRelocate.ai

AI-powered relocation assistant that simplifies the process of moving to Malaysia for tech professionals and digital nomads.

## Features

- **AI Chat Assistant** - OpenAI-powered guidance for relocation questions
- **Visa Assessment Wizard** - Comprehensive eligibility scoring for Malaysian visas
- **Multi-Language Support** - Available in 10 languages (EN, FR, DE, IT, ES, PT, ZH, TH, ID, JA)
- **Pricing Tiers** - Free to Premium plans with feature gating
- **Email Collection** - Lead capture with CSV export functionality
- **Database Integration** - PostgreSQL for persistent data storage

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS + Vite
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: OpenAI GPT-4o integration
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS with custom design system

## Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/smartrelocate-ai.git
cd smartrelocate-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy example environment file
cp .env.example .env

# Add your secrets:
DATABASE_URL=your_postgresql_connection_string
OPENAI_API_KEY=your_openai_api_key
```

4. Set up the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:5000` to see the application.

## Project Structure

```
├── client/src/          # React frontend
│   ├── components/      # UI components
│   ├── pages/          # Page components
│   └── hooks/          # Custom React hooks
├── server/             # Express backend
│   ├── routes.ts       # API routes
│   ├── storage.ts      # Database operations
│   └── db.ts          # Database connection
├── shared/             # Shared types and utilities
│   ├── schema.ts       # Database schema
│   ├── translations.ts # Multi-language support
│   └── relocationData.ts # Country and visa data
└── components.json     # shadcn/ui configuration
```

## Environment Variables

Required environment variables:

```env
DATABASE_URL=postgresql://user:password@host:port/database
OPENAI_API_KEY=sk-your-openai-api-key
PGHOST=your-db-host
PGPORT=5432
PGUSER=your-db-user
PGPASSWORD=your-db-password
PGDATABASE=your-db-name
```

## Deployment

### Replit Deployment (Recommended)
1. Import this repository into Replit
2. Add environment variables in Replit Secrets
3. Run `npm run dev`
4. Use Replit Deployments for production hosting

### Manual Deployment
1. Build the project: `npm run build`
2. Set up PostgreSQL database
3. Configure environment variables
4. Deploy to your preferred hosting platform

## API Endpoints

- `GET /api/countries/:continent` - Get countries by continent
- `GET /api/relocate-info/:country` - Get country relocation data
- `POST /api/chat` - AI chat assistant
- `POST /api/assess-eligibility` - Visa eligibility assessment
- `POST /api/email-captures` - Email collection
- `GET /api/email-captures/export` - Export emails (admin)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support and questions, please open an issue on GitHub.