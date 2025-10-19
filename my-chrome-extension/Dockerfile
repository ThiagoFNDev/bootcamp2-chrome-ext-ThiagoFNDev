FROM mcr.microsoft.com/playwright:v1.56.1-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci --silent
RUN npx playwright install --with-deps chromium

COPY . .
RUN npm run build

CMD ["npm", "test"]
