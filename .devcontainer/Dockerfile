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
RUN npm install -g pnpm

# ---- local conatiner for running microservices manually ----
FROM base AS local

# Command line tooling: Bash, Wget, Git, Sudo, File, Curl, SSH, Tmux, Pip
RUN apk add --no-cache wget git sudo file curl openssh-client tmux py3-pip

# Azure CLI will fail without its dependencies
RUN apk add --no-cache gcc musl-dev python3-dev libffi-dev openssl-dev cargo make icu-libs

# Installing Azure CLI
RUN pip install --upgrade pip --break-system-packages
RUN pip install azure-cli --break-system-packages

# Cleanup
RUN rm -rf /var/cache/apk/*


# collectorbrreg
FROM base AS astro
COPY .. /app/
RUN pnpm install \
    && pnpm packages build \
    && pnpm astro build
CMD ["pnpm", "astro", "start"]