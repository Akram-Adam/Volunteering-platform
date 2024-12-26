#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Function to print messages
log() {
  echo -e "\n\033[1;32m$1\033[0m\n"
}

log "Starting Docker installation..."

# Step 1: Update apt-get
log "Updating package lists..."
sudo apt-get update

# Step 2: Install required packages
log "Installing prerequisites: ca-certificates and curl..."
sudo apt-get install -y ca-certificates curl

# Step 3: Create the directory for APT keyrings
log "Creating the keyrings directory..."
sudo install -m 0755 -d /etc/apt/keyrings

# Step 4: Download Docker's GPG key
log "Adding Docker's official GPG key..."
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc

# Step 5: Adjust permissions for the keyring
log "Setting permissions for the Docker GPG key..."
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Step 6: Add Docker's APT repository to the sources list
log "Adding Docker's APT repository..."
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
$(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Step 7: Update apt-get again to include Docker's repository
log "Updating package lists with Docker's repository..."
sudo apt-get update

# Step 8: Install Docker packages
log "Installing Docker components: docker-ce, docker-ce-cli, containerd.io, docker-buildx-plugin, docker-compose-plugin..."
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

log "Docker installation completed successfully!"

# Display Docker version to confirm installation
log "Docker version installed:"
docker --version
