# Gunakan image Node.js sebagai dasar
FROM node:18

# Set direktori kerja di dalam container
WORKDIR /usr/src/app

# Copy file package.json dan package-lock.json
COPY package*.json ./

# Install dependensi aplikasi
RUN npm install

# Copy sisa file aplikasi
COPY . .

# Set environment variable untuk port
ENV PORT=3000

# Jalankan aplikasi
CMD ["npm", "start"]
