# Utility User Information
A responsive Svelte + Tailwind CSS web application that extracts and displays all possible user environment information in real time.

## Features
- Extracts browser details: user agent, platform, language, online status, cookie support, hardware concurrency, device memory (if supported).
- Displays screen and viewport dimensions.
- Monitors network status: connection type, downlink speed (with live updates).
- Shows battery information: level and charging status (with live updates).
- Tracks geolocation: latitude, longitude, altitude, and accuracy (live updates).
- Captures device orientation angles (alpha, beta, gamma) and screen orientation.
- Updates changing data in real time and indicates the refresh event type.
- Responsive layout for desktop and mobile devices.

## Technologies
- [Svelte](https://svelte.dev/) + [TypeScript]
- [Vite](https://vitejs.dev/) for development and bundling
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vitest](https://vitest.dev/) + [@testing-library/svelte] for testing

## Installation
```bash
# Clone the repository
git clone https://github.com/harshityadav95/Utility_User_Information.git
cd Utility_User_Information

# Install dependencies
npm install
```

## Development
```bash
# Start the development server
npm run dev
```
Open http://localhost:5173 in your browser.

## Build
```bash
npm run build
npm run preview
```

## Testing
```bash
npm run test
```
This runs tests with Vitest and reports coverage.

## Usage
The app displays a table of environment information. Columns include:
- **Name**: The data item
- **Value**: Current value
- **Last Updated**: Timestamp of the last update
- **Refresh Interval**: Event or listener type that triggered the update

## License
This project is licensed under the MIT License.
