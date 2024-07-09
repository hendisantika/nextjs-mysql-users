# Use an official Node.js, and it should be version 16 and above
FROM node:20-alpine  AS base
LABEL authors="hendisantika"
# Gunakan image dasar yang sesuai

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Salin file pnpm-lock.yaml dan package.json untuk menginstal dependensi terlebih dahulu
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install semua dependensi proyek
RUN pnpm install

# Salin seluruh kode proyek ke dalam container
COPY . .

# Build proyek Next.js
RUN pnpm run build

# Gunakan image dasar yang lebih ringan untuk produksi
FROM node:20-alpine AS production

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Salin node_modules dan build output dari tahap sebelumnya
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./package.json

# Ekspos port yang akan digunakan oleh aplikasi
EXPOSE 3000

# Jalankan perintah untuk memulai aplikasi
CMD ["pnpm", "start"]
