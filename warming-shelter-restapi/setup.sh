#!/bin/bash

# Function to prompt for input with a default value
prompt_for_input() {
  local prompt_message=$1
  local default_value=$2
  read -p "$prompt_message (default: $default_value): " input
  echo ${input:-$default_value}
}

# Function to append environment variables to .env file
append_to_env() {
  echo "$1=\"$2\"" >> .env
}

# Check for npm and node existence
if ! command -v npm &> /dev/null; then
  echo "npm could not be found, please install Node.js and npm first."
  exit 1
fi

# Prompts
NODE_ENV=$(prompt_for_input "Enter NODE_ENV" development)
PORT=$(prompt_for_input "Enter PORT" "3000")
MONGO_URI=$(prompt_for_input "Enter MONGO_URI" mongodb://localhost:27017/warming_center_db)
JWT_SECRET=$(prompt_for_input "Enter JWT_SECRET" mysecret)
JWT_EXPIRES_IN=$(prompt_for_input "Enter JWT_EXPIRES_IN" 1d)
SESSION_SECRET=$(prompt_for_input "Enter SESSION_SECRET" sessionsecret)

# Write to .env file
echo "Creating .env file..."
> .env # Clear existing .env content

append_to_env "NODE_ENV" $NODE_ENV
append_to_env "PORT" $PORT
append_to_env "MONGO_URI" $MONGO_URI
append_to_env "JWT_SECRET" $JWT_SECRET
append_to_env "JWT_EXPIRES_IN" $JWT_EXPIRES_IN
append_to_env "SESSION_SECRET" $SESSION_SECRET

echo ".env file has been created."

# Install npm modules
if [ -f "package.json" ]; then
  echo "Installing npm modules..."
  if npm install; then
    echo "Npm modules installed successfully."
  else
    echo "Failed to install npm modules."
    exit 1
  fi
else
  echo "package.json not found. Skipping npm install."
fi

# Generate the /doc folder
if npm run docs; then
  echo "Updated /doc folder generated successfully. Located at /doc/index.html"
else
  echo "Failed to generate /doc folder."
fi

# Build the latest version of the app
if ! npm run build; then
  echo "Build failed."
  exit 1
fi

# Run the server
read -p "Do you want to run the server in development mode? (y/n): " runServer
if [ "$runServer" = "y" ]; then
  npm run dev
else
  echo "Skipping server start."
fi
