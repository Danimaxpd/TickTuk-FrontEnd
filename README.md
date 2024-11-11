# User Management SPA

A modern Single Page Application for user management built with Next.js and Chakra UI.

## Features

- 👥 User Management (Create, List, Delete)
- 📱 Responsive Design
- 🎨 Clean and Modern UI with Chakra UI
- 📝 User Description with Tooltip
- 📊 Pagination (3 users per page)
- 🔄 Automatic List Updates
- 🔒 API Authentication

## Tech Stack

- Next.js 14
- TypeScript
- Chakra UI
- Axios
- React Icons

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/Danimaxpd/TickTuk-FrontEnd.git
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser

## Project Structure

```
user-management-spa/
├── src/
│ ├── components/ # React components
│ ├── pages/ # Next.js pages
│ ├── services/ # API services
│ ├── theme/ # Chakra UI theme
│ └── types/ # TypeScript types
├── public/ # Static files
└── ...config files
```

## API Integration

The application integrates with a RESTful API that provides:
- User Authentication (JWT-based)
- User Management Operations (CRUD)
- Secure Token Management

API Features:
- Automatic token refresh
- Error handling with toast notifications
- Secure password handling
- Request/Response interceptors

## Theme Customization

The application includes a custom Chakra UI theme with:
- Light/Dark mode support
- Custom button variants
- Responsive card layouts
- Custom color schemes

## Development Requirements

- Node.js 20.0.0 or later (updated from 18.17)
- TypeScript 5.3.3 or later
- Modern browser with ES6 support
- Git for version control

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

David Jimenez

- Email: danimax.com@gmail.com
- GitHub: [@danimaxpd](https://github.com/danimaxpd)
