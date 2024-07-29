FROM node:lts-slim AS build

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN apt-get update && apt-get install gnupg wget -y && \
 wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
 sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
 apt-get update && \
 apt-get install google-chrome-stable -y --no-install-recommends && \
 rm -rf /var/lib/apt/lists/*

WORKDIR /app/build

COPY . .

RUN npm i

RUN npm run build

EXPOSE 3000

FROM build AS production

WORKDIR /app

COPY --from=build /app/build .

CMD ["node", "dist/main"]
