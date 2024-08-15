FROM node:18-alpine3.17 as builder

ENV NODE_ENV build

COPY package*.json ./

RUN npm ci

WORKDIR /home/node

COPY . /home/node

RUN npm run build \
    && npm prune --production

# ---

FROM node:18-alpine3.17

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder /home/node/dist/ /home/node/dist/

CMD ["node", "dist/main.js"]
