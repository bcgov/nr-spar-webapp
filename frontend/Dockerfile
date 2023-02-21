FROM node:16-bullseye

# Copy and build
WORKDIR /app
COPY . .
RUN yarn global add serve@14.1.2 react-inject-env@2.1.0 && \
    yarn install --cwd frontend --frozen-lockfile --prefer-offline && \
    yarn --cwd frontend build:production

# Run
EXPOSE 3000
RUN chmod -R g+w .
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost/:3000
USER 1001
CMD react-inject-env set -d . && serve -s .
