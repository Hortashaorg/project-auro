FROM node:20.11.0-alpine3.19 AS base

# Set /app as the working directory for any subsequent RUN, CMD, ENTRYPOINT, COPY, and ADD instructions
WORKDIR /app

RUN apk add --no-cache bash

# Set bash as the default shell
ENV SHELL=/bin/bash
SHELL ["/bin/bash", "-c"]

# Run update
RUN apk update && apk upgrade

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# ---- local conatiner for running microservices manually ----
FROM base AS local

# Command line tooling: Bash, Wget, Git, Sudo, File, Curl, SSH, Tmux, Pip
RUN apk add --no-cache wget git sudo file curl openssh-client tmux py3-pip

# Azure CLI will fail without its dependencies
RUN apk add --no-cache gcc musl-dev python3-dev libffi-dev openssl-dev cargo make icu-libs

# Installing Azure CLI
RUN pip install --upgrade pip --break-system-packages
RUN pip install azure-cli --break-system-packages

RUN curl -L https://fly.io/install.sh | sh
RUN export FLYCTL_INSTALL="/root/.fly"
RUN export PATH="$FLYCTL_INSTALL/bin:$PATH"

# Cleanup
RUN rm -rf /var/cache/apk/*

# collectorbrreg
FROM base AS astro
COPY .. /app/
RUN pnpm install \
    && pnpm packages build \
    && pnpm astro build

# Set environment variable for the host
ENV HOST=0.0.0.0

# Expose the port the app runs on
EXPOSE 4321

CMD ["pnpm", "astro", "start"]