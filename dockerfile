# Gunakan base image Node.js yang stabil
FROM node:18-slim

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Tentukan working directory di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Instal dependencies
RUN npm install --production

# Salin seluruh source code ke dalam container
COPY . .

# Ekspos port yang digunakan aplikasi (Cloud Run membutuhkan port 3000)
EXPOSE 3000

# Jalankan aplikasi menggunakan npm
CMD ["npm", "run", "start"]
