# Gunakan image Node.js sebagai base
FROM node:18

# Set direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file aplikasi
COPY . .

# Set environment variable PORT ke 3000
ENV PORT 3000

# Jalankan aplikasi menggunakan npm run start
CMD ["npm", "run", "start"]

# Expose port 3000
EXPOSE 3000
