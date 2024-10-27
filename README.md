# Ryan Shelby Portfolio

![GitHub last commit](https://img.shields.io/github/last-commit/MdSagorMunshi/ryan-shelby-portfolio)
![GitHub license](https://img.shields.io/github/license/MdSagorMunshi/ryan-shelby-portfolio)
![GitHub stars](https://img.shields.io/github/stars/MdSagorMunshi/ryan-shelby-portfolio?style=social)

A modern, responsive portfolio website for Ryan Shelby, showcasing his skills, projects, and contact information.

## 🌟 Features

- Responsive design
- Dark/Light mode toggle
- Skills section with progress bars
- Projects showcase
- Contact form with Turnstile CAPTCHA integration
- Social media links
- Visit counter

## 🛠️ Technologies Used

- React
- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons
- shadcn/ui components

## 📥 Installation

1. Clone the repository:
   ```
   git clone https://github.com/MdSagorMunshi/ryan-shelby-portfolio.git
   ```

2. Navigate to the project directory:
   ```
   cd ryan-shelby-portfolio
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables:
   ```
   # Cloudflare Turnstile
   NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=your_key_here
   CLOUDFLARE_TURNSTILE_SECRET_KEY=your_secret_key_here

   # Email Configuration
   EMAIL_HOST=smtp.example.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your_email_here
   EMAIL_PASS=your_password_here
   EMAIL_FROM=your_email_here
   EMAIL_TO=recipient_email_here

   # Database
   DATABASE_URL="your_database_url_here"
   ```

   Replace the placeholder values with your actual keys and information.

5. Add `.env` to your `.gitignore` file to prevent sensitive information from being committed:
   ```
   echo ".env" >> .gitignore
   ```

## 🔐 Environment Variables

This project uses the following environment variables:

- `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY`: Your Cloudflare Turnstile site key for CAPTCHA functionality.
- `CLOUDFLARE_TURNSTILE_SECRET_KEY`: Your Cloudflare Turnstile secret key.
- `EMAIL_HOST`: SMTP server host for sending emails.
- `EMAIL_PORT`: SMTP server port.
- `EMAIL_SECURE`: Whether to use a secure connection (true/false).
- `EMAIL_USER`: Username for SMTP authentication.
- `EMAIL_PASS`: Password for SMTP authentication.
- `EMAIL_FROM`: Email address to send from.
- `EMAIL_TO`: Email address to send to.
- `DATABASE_URL`: URL for your database connection.

Make sure to set these variables in your `.env` file before running the application.

## 🚀 Usage

1. Run the development server:
   ```
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/MdSagorMunshi/ryan-shelby-portfolio/issues).

## 📝 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.

## 📞 Contact

Ryan Shelby - [rynexx@tuta.io](mailto:rynexx@tuta.io)

Project Link: [ryan-shelby-portfolio](https://github.com/MdSagorMunshi/ryan-shelby-portfolio)

---

Made with ❤️ by [Ryan Shelby](https://github.com/MdSagorMunshi)