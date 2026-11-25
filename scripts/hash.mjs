import bcrypt from 'bcryptjs';
const pw = process.argv[2];
if (!pw) { console.error('Usage: npm run hash -- "your-password"'); process.exit(1); }
// "$" must be escaped in .env files (Next expands variables), so print it escaped.
console.log(bcrypt.hashSync(pw, 12).replace(/\$/g, '\\$'));
