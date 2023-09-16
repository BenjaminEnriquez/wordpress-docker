# Dockerized WordPress Setup with Multiple Custom Themes

This repository provides a Docker Compose setup for running multiple instances of WordPress with custom themes. You can use this setup to develop and test different WordPress themes in isolated environments.

## Prerequisites

Before you begin, ensure you have the following:

- Docker installed on your system: [Docker Installation Guide](https://docs.docker.com/get-docker/)
- Docker Compose installed on your system: [Docker Compose Installation Guide](https://docs.docker.com/compose/install/)

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/wordpress-multitheme-docker.git
   cd wordpress-multitheme-docker
   ```

- docker build -t <theme-name>-image .

- docker-compose up -d
