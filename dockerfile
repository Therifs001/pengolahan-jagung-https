# Gunakan image Node.js sebagai base
FROM node:18

# Set direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Set environment variable NODE_ENV ke production
ENV NODE_ENV=production

# Install dependencies
RUN npm install --only=production

# Salin semua file aplikasi
COPY . .

# Set environment variable PORT ke 3000
ENV PORT 3000

# Jalankan aplikasi menggunakan npm run start
CMD ["npm", "run", "start"]

# Expose port 3000
EXPOSE 3000
