# Use the official WordPress image as the base image
FROM wordpress:latest

# Copy your custom theme into the WordPress themes directory
COPY wp/wp-content/themes/$THEME_NAME /var/www/html/wp-content/themes/$THEME_NAME

# You can copy other custom files or directories here if needed
# COPY ./custom-directory /var/www/html/custom-directory